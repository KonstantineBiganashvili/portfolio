import type { Topology, TopologyEdge, TopologyNode } from '@/lib/content/types';

export interface Point {
	x: number;
	y: number;
}

export interface PlacedNode extends TopologyNode {
	row: number;
	x: number;
	y: number;
	lines: string[];
}

export interface PlacedEdge extends TopologyEdge {
	path: string;
	/** Start, any routing waypoints, end. */
	points: Point[];
	labelX: number;
	labelY: number;
	/** Degrees to rotate the label around its anchor (feedback loops label their vertical run). */
	labelRotate: number;
	/** True when the edge closes a cycle and points back up the diagram (a response or feedback loop). */
	back: boolean;
}

export interface TopologyLayout {
	width: number;
	height: number;
	nodeWidth: number;
	nodeHeight: number;
	nodes: PlacedNode[];
	edges: PlacedEdge[];
}

interface LayoutOptions {
	maxPerRow?: number;
	nodeWidth?: number;
	nodeHeight?: number;
	gapX?: number;
	gapY?: number;
	padding?: number;
	charsPerLine?: number;
}

interface Geometry {
	nodeWidth: number;
	nodeHeight: number;
	gapX: number;
	gapY: number;
	padding: number;
}

const LABEL_T = 0.7;
const edgeKey = (from: string, to: string) => `${from}\u0000${to}`;
const r1 = (v: number) => Math.round(v * 10) / 10;

/** Split a label into at most two lines on word boundaries, ellipsising the overflow. */
export function wrapLabel(label: string, max: number): string[] {
	const words = label.split(/\s+/).filter(Boolean);
	const lines: string[] = [];
	let current = '';
	for (const word of words) {
		const next = current ? `${current} ${word}` : word;
		if (next.length <= max || !current) {
			current = next;
			continue;
		}
		lines.push(current);
		current = word;
	}
	if (current) lines.push(current);
	if (lines.length <= 2) return lines;
	const second = lines.slice(1).join(' ');
	return [lines[0]!, `${second.slice(0, Math.max(1, max - 1)).trimEnd()}…`];
}

/**
 * Longest-path layering. Sources are nodes with no incoming edges plus every `client` node.
 * A DFS from the sources marks cycle-closing edges as "back"; the rest form a DAG whose longest
 * path gives each node its row. Components unreachable from the sources go underneath.
 */
function rankNodes(topology: Topology): { rank: Map<string, number>; back: Set<string> } {
	const out = new Map<string, string[]>(topology.nodes.map((n) => [n.id, []]));
	const indegree = new Map(topology.nodes.map((n) => [n.id, 0]));
	for (const e of topology.edges) {
		if (e.from === e.to) continue;
		out.get(e.from)?.push(e.to);
		indegree.set(e.to, (indegree.get(e.to) ?? 0) + 1);
	}
	let sources = topology.nodes.filter((n) => indegree.get(n.id) === 0 || n.kind === 'client').map((n) => n.id);
	if (sources.length === 0) sources = topology.nodes.slice(0, 1).map((n) => n.id);

	const back = new Set<string>();
	const visited = new Set<string>();
	const onStack = new Set<string>();
	const postorder: string[] = [];
	const dfs = (id: string) => {
		visited.add(id);
		onStack.add(id);
		for (const next of out.get(id) ?? []) {
			if (onStack.has(next)) back.add(edgeKey(id, next));
			else if (!visited.has(next)) dfs(next);
		}
		onStack.delete(id);
		postorder.push(id);
	};
	for (const s of sources) if (!visited.has(s)) dfs(s);
	const reached = new Set(visited);
	for (const n of topology.nodes) if (!visited.has(n.id)) dfs(n.id);

	const rank = new Map(topology.nodes.map((n) => [n.id, 0]));
	for (const id of [...postorder].reverse()) {
		for (const next of out.get(id) ?? []) {
			if (back.has(edgeKey(id, next))) continue;
			rank.set(next, Math.max(rank.get(next)!, rank.get(id)! + 1));
		}
	}
	const below = Math.max(0, ...[...reached].map((id) => rank.get(id)!)) + 1;
	for (const n of topology.nodes) if (!reached.has(n.id)) rank.set(n.id, rank.get(n.id)! + below);
	return { rank, back };
}

/** Group ranked nodes into rows, ordering each row by its parents' positions, and wrapping wide rows. */
function buildRows(topology: Topology, rank: Map<string, number>, maxPerRow: number): TopologyNode[][] {
	const layers: TopologyNode[][] = [];
	for (const n of topology.nodes) (layers[rank.get(n.id)!] ??= []).push(n);

	const position = new Map<string, number>();
	const rows: TopologyNode[][] = [];
	for (const layer of layers.filter(Boolean)) {
		const weight = (n: TopologyNode) => {
			const parents = topology.edges.filter((e) => e.to === n.id && position.has(e.from)).map((e) => position.get(e.from)!);
			return parents.length ? parents.reduce((a, b) => a + b, 0) / parents.length : Number.POSITIVE_INFINITY;
		};
		const ordered = layer
			.map((n, i) => ({ n, i, w: weight(n) }))
			.sort((a, b) => a.w - b.w || a.i - b.i)
			.map((x) => x.n);
		for (let i = 0; i < ordered.length; i += maxPerRow) {
			const row = ordered.slice(i, i + maxPerRow);
			row.forEach((n, j) => position.set(n.id, j / Math.max(1, row.length - 1)));
			rows.push(row);
		}
	}
	return rows;
}

/** Smooth path through points with vertical tangents at each one; equal-x neighbours give straight drops. */
function verticalPath(points: Point[]): string {
	const [first, ...rest] = points;
	let d = `M${r1(first!.x)} ${r1(first!.y)}`;
	let prev = first!;
	for (const p of rest) {
		const bend = (p.y - prev.y) / 2;
		d += ` C${r1(prev.x)} ${r1(prev.y + bend)}, ${r1(p.x)} ${r1(p.y - bend)}, ${r1(p.x)} ${r1(p.y)}`;
		prev = p;
	}
	return d;
}

/** Point on the vertical-tangent cubic between a and b at parameter t. */
function onSegment(a: Point, b: Point, t: number): Point {
	const bend = (b.y - a.y) / 2;
	const u = 1 - t;
	const bez = (p0: number, p1: number, p2: number, p3: number) => u ** 3 * p0 + 3 * u ** 2 * t * p1 + 3 * u * t ** 2 * p2 + t ** 3 * p3;
	return { x: bez(a.x, a.x, b.x, b.x), y: bez(a.y, a.y + bend, b.y - bend, b.y) };
}

interface Ends {
	exitX: number;
	entryX: number;
	labelT: number;
}

/** Forward edge: leave the source's bottom, pass through the gaps of any rows in between, enter the target's top. */
function routeForward(e: TopologyEdge, a: PlacedNode, b: PlacedNode, rows: PlacedNode[][], g: Geometry, ends: Ends): PlacedEdge {
	const { nodeWidth: w, nodeHeight: h, gapX } = g;
	const points: Point[] = [{ x: ends.exitX, y: a.y + h }];
	for (let r = a.row + 1; r < b.row; r++) {
		const row = [...rows[r]!].sort((m, n) => m.x - n.x);
		const top = row[0]!.y;
		const along = ends.exitX + ((ends.entryX - ends.exitX) * (r - a.row)) / (b.row - a.row);
		const gaps = [row[0]!.x - gapX / 2, ...row.slice(0, -1).map((n, i) => (n.x + w + row[i + 1]!.x) / 2), row.at(-1)!.x + w + gapX / 2];
		const gx = gaps.reduce((best, x) => (Math.abs(x - along) < Math.abs(best - along) ? x : best));
		points.push({ x: gx, y: top - 6 }, { x: gx, y: top + h + 6 });
	}
	points.push({ x: ends.entryX, y: b.y });
	const last = points.length - 1;
	const label = onSegment(points[last - 1]!, points[last]!, ends.labelT);
	return { ...e, path: verticalPath(points), points, labelX: r1(label.x), labelY: r1(label.y), labelRotate: 0, back: false };
}

/**
 * Feedback edge (closes a cycle, so it points up): an orthogonal route around the outside of every node in the
 * rows it spans, labelled along its vertical run.
 */
function routeFeedback(e: TopologyEdge, a: PlacedNode, b: PlacedNode, nodes: PlacedNode[], g: Geometry, side: 'left' | 'right', lane: number): PlacedEdge {
	const { nodeWidth: w, nodeHeight: h } = g;
	const [lo, hi] = [Math.min(a.row, b.row), Math.max(a.row, b.row)];
	const spanned = nodes.filter((n) => n.row >= lo && n.row <= hi);
	const runX =
		side === 'right' ? Math.max(...spanned.map((n) => n.x + w)) + 22 + lane * 14 : Math.min(...spanned.map((n) => n.x)) - 22 - lane * 14;
	const y1 = a.y + h / 2;
	const y2 = b.y + h / 2;
	const x1 = side === 'right' ? a.x + w : a.x;
	const x2 = side === 'right' ? b.x + w : b.x;
	const points = [
		{ x: x1, y: y1 },
		{ x: runX, y: y1 },
		{ x: runX, y: y2 },
		{ x: x2, y: y2 },
	];
	const path = `M${r1(x1)} ${r1(y1)} H${r1(runX)} V${r1(y2)} H${r1(x2)}`;
	return {
		...e,
		path,
		points,
		labelX: r1(runX + (side === 'right' ? 12 : -12)),
		labelY: r1((y1 + y2) / 2),
		labelRotate: -90,
		back: true,
	};
}

export function layoutTopology(topology: Topology, options: LayoutOptions = {}): TopologyLayout {
	const { maxPerRow = 4, nodeWidth = 196, nodeHeight = 58, gapX = 28, gapY = 64, padding = 12, charsPerLine = 22 } = options;
	const geometry: Geometry = { nodeWidth, nodeHeight, gapX, gapY, padding };

	const { rank } = rankNodes(topology);
	const rows = buildRows(topology, rank, maxPerRow);
	const widest = Math.max(1, ...rows.map((r) => r.length));
	const width = padding * 2 + widest * nodeWidth + (widest - 1) * gapX;
	const height = padding * 2 + rows.length * nodeHeight + Math.max(0, rows.length - 1) * gapY;

	const placed = new Map<string, PlacedNode>();
	const placedRows: PlacedNode[][] = rows.map((row, r) => {
		const rowWidth = row.length * nodeWidth + (row.length - 1) * gapX;
		const offset = (width - rowWidth) / 2;
		return row.map((n, i) => {
			const node: PlacedNode = {
				...n,
				row: r,
				x: offset + i * (nodeWidth + gapX),
				y: padding + r * (nodeHeight + gapY),
				lines: wrapLabel(n.label, charsPerLine),
			};
			placed.set(n.id, node);
			return node;
		});
	});

	const resolved = topology.edges.flatMap((e) => {
		const a = placed.get(e.from);
		const b = placed.get(e.to);
		return a && b && a.id !== b.id ? [{ e, a, b }] : [];
	});
	// Longest-path layering puts every forward edge's target on a lower row; anything else closes a cycle.
	const forward = resolved.filter(({ a, b }) => b.row > a.row);
	const cx = (n: PlacedNode) => n.x + nodeWidth / 2;

	// Spread edges along a node's edge when several meet there, and stagger their labels.
	const ends = new Map<TopologyEdge, Ends>(forward.map(({ e, a, b }) => [e, { exitX: cx(a), entryX: cx(b), labelT: LABEL_T }]));
	const slot = (i: number, k: number) => (nodeWidth * (i + 1)) / (k + 1);
	for (const node of placed.values()) {
		const incoming = forward.filter((f) => f.b.id === node.id).sort((p, q) => cx(p.a) - cx(q.a));
		incoming.forEach((f, i) => {
			const end = ends.get(f.e)!;
			end.entryX = node.x + slot(i, incoming.length);
			if (incoming.length > 1) end.labelT = 0.35 + (0.4 * i) / (incoming.length - 1);
		});
		const outgoing = forward.filter((f) => f.a.id === node.id).sort((p, q) => cx(p.b) - cx(q.b));
		outgoing.forEach((f, i) => {
			ends.get(f.e)!.exitX = node.x + slot(i, outgoing.length);
		});
	}

	const lanes = { left: 0, right: 0 };
	const nodes = [...placed.values()];
	const edges = resolved.map(({ e, a, b }) => {
		if (b.row > a.row) return routeForward(e, a, b, placedRows, geometry, ends.get(e)!);
		const side = (cx(a) + cx(b)) / 2 >= width / 2 ? 'right' : 'left';
		return routeFeedback(e, a, b, nodes, geometry, side, lanes[side]++);
	});

	return { width, height, nodeWidth, nodeHeight, nodes, edges };
}
