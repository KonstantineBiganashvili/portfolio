import { describe, expect, it } from 'vitest';
import type { Topology } from '@/lib/content/types';
import { layoutTopology, wrapLabel } from './layout';

const chain: Topology = {
	nodes: [
		{ id: 'user', label: 'Browser', kind: 'client' },
		{ id: 'api', label: 'API', kind: 'service' },
		{ id: 'db', label: 'Database', kind: 'data' },
	],
	edges: [
		{ from: 'user', to: 'api', label: 'HTTPS' },
		{ from: 'api', to: 'db', label: 'SQL' },
	],
};

describe('layoutTopology', () => {
	it('places each hop of a chain on its own row, top to bottom', () => {
		const l = layoutTopology(chain);
		const y = Object.fromEntries(l.nodes.map((n) => [n.id, n.y]));
		expect(y.user).toBeLessThan(y.api!);
		expect(y.api).toBeLessThan(y.db!);
	});

	it('gives every edge a path between its two nodes', () => {
		const l = layoutTopology(chain);
		expect(l.edges).toHaveLength(2);
		for (const e of l.edges) expect(e.path).toMatch(/^M[\d.]+ [\d.]+ C/);
	});

	it('starts from client nodes even when every node has an incoming edge (cycles)', () => {
		const cyclic: Topology = {
			nodes: [
				{ id: 'user', label: 'Browser', kind: 'client' },
				{ id: 'gpu', label: 'GPU', kind: 'infra' },
			],
			edges: [
				{ from: 'user', to: 'gpu', label: 'start' },
				{ from: 'gpu', to: 'user', label: 'stream' },
			],
		};
		const l = layoutTopology(cyclic);
		const user = l.nodes.find((n) => n.id === 'user')!;
		const gpu = l.nodes.find((n) => n.id === 'gpu')!;
		expect(user.row).toBe(0);
		expect(gpu.row).toBe(1);
	});

	it('wraps wide layers so no row holds more than maxPerRow nodes', () => {
		const wide: Topology = {
			nodes: [{ id: 'hub', label: 'Hub', kind: 'service' }, ...Array.from({ length: 6 }, (_, i) => ({ id: `n${i}`, label: `N${i}`, kind: 'data' as const }))],
			edges: Array.from({ length: 6 }, (_, i) => ({ from: 'hub', to: `n${i}`, label: null })),
		};
		const l = layoutTopology(wide, { maxPerRow: 4 });
		const perRow = new Map<number, number>();
		for (const n of l.nodes) perRow.set(n.row, (perRow.get(n.row) ?? 0) + 1);
		expect(Math.max(...perRow.values())).toBeLessThanOrEqual(4);
		expect(l.nodes).toHaveLength(7);
	});

	it('does not overlap nodes that share a row', () => {
		const l = layoutTopology({
			nodes: [
				{ id: 'a', label: 'A', kind: 'client' },
				{ id: 'b', label: 'B', kind: 'service' },
				{ id: 'c', label: 'C', kind: 'service' },
			],
			edges: [
				{ from: 'a', to: 'b', label: null },
				{ from: 'a', to: 'c', label: null },
			],
		});
		const [b, c] = l.nodes.filter((n) => n.row === 1);
		expect(Math.abs(b!.x - c!.x)).toBeGreaterThanOrEqual(l.nodeWidth);
	});

	it('fits every node inside the reported canvas size', () => {
		const l = layoutTopology(chain);
		for (const n of l.nodes) {
			expect(n.x).toBeGreaterThanOrEqual(0);
			expect(n.x + l.nodeWidth).toBeLessThanOrEqual(l.width);
			expect(n.y + l.nodeHeight).toBeLessThanOrEqual(l.height);
		}
	});

	it('places nodes unreachable from any source on a trailing row', () => {
		const l = layoutTopology({
			nodes: [
				{ id: 'a', label: 'A', kind: 'client' },
				{ id: 'x', label: 'X', kind: 'service' },
				{ id: 'y', label: 'Y', kind: 'service' },
			],
			edges: [
				{ from: 'x', to: 'y', label: null },
				{ from: 'y', to: 'x', label: null },
			],
		});
		expect(l.nodes.find((n) => n.id === 'x')!.row).toBeGreaterThan(0);
	});
});

describe('layoutTopology routing', () => {
	const diamond: Topology = {
		nodes: [
			{ id: 'a', label: 'A', kind: 'client' },
			{ id: 'b', label: 'B', kind: 'service' },
			{ id: 'c', label: 'C', kind: 'service' },
			{ id: 'd', label: 'D', kind: 'data' },
		],
		edges: [
			{ from: 'a', to: 'b', label: null },
			{ from: 'b', to: 'c', label: null },
			{ from: 'a', to: 'c', label: 'skips a row' },
			{ from: 'a', to: 'd', label: null },
		],
	};

	it('ranks nodes by their longest path, so a shortcut edge does not pull its target up', () => {
		const l = layoutTopology(diamond);
		const row = Object.fromEntries(l.nodes.map((n) => [n.id, n.row]));
		expect(row).toEqual({ a: 0, b: 1, d: 1, c: 2 });
	});

	it('routes edges that span several rows through the gaps between boxes', () => {
		const l = layoutTopology(diamond);
		const skip = l.edges.find((e) => e.from === 'a' && e.to === 'c')!;
		const middle = l.nodes.filter((n) => n.row === 1);
		const waypoints = skip.points.slice(1, -1);
		expect(waypoints.length).toBeGreaterThan(0);
		for (const p of waypoints) {
			for (const n of middle) expect(p.x < n.x || p.x > n.x + l.nodeWidth).toBe(true);
		}
	});

	it('always puts the target of a forward edge on a lower row than its source', () => {
		const l = layoutTopology({
			nodes: [
				{ id: 'u', label: 'U', kind: 'client' },
				{ id: 'x', label: 'X', kind: 'service' },
				{ id: 'y', label: 'Y', kind: 'service' },
			],
			edges: [
				{ from: 'u', to: 'x', label: null },
				{ from: 'u', to: 'y', label: null },
				{ from: 'x', to: 'y', label: 'REST' },
			],
		});
		const row = Object.fromEntries(l.nodes.map((n) => [n.id, n.row]));
		for (const e of l.edges.filter((edge) => !edge.back)) expect(row[e.to]).toBeGreaterThan(row[e.from]!);
	});

	it('draws cycle-closing edges as feedback loops', () => {
		const l = layoutTopology({
			nodes: [
				{ id: 'user', label: 'Browser', kind: 'client' },
				{ id: 'gpu', label: 'GPU', kind: 'infra' },
			],
			edges: [
				{ from: 'user', to: 'gpu', label: 'start' },
				{ from: 'gpu', to: 'user', label: 'stream' },
			],
		});
		expect(l.edges.find((e) => e.from === 'gpu')!.back).toBe(true);
		expect(l.edges.find((e) => e.from === 'user')!.back).toBe(false);
	});

	it('spreads edges that converge on one node so their labels do not collide', () => {
		const l = layoutTopology({
			nodes: [
				{ id: 'a', label: 'A', kind: 'client' },
				{ id: 'b', label: 'B', kind: 'service' },
				{ id: 't', label: 'Target', kind: 'data' },
			],
			edges: [
				{ from: 'a', to: 't', label: 'autopilot approvals' },
				{ from: 'b', to: 't', label: 'REST + JWT' },
			],
		});
		const [e1, e2] = l.edges;
		expect(e1!.points.at(-1)!.x).not.toBe(e2!.points.at(-1)!.x);
		const apart = Math.abs(e1!.labelX - e2!.labelX) >= 80 || Math.abs(e1!.labelY - e2!.labelY) >= 12;
		expect(apart).toBe(true);
	});

	it('routes feedback loops outside every node in the rows they span', () => {
		const l = layoutTopology({
			nodes: [
				{ id: 'user', label: 'Browser', kind: 'client' },
				{ id: 'api', label: 'API', kind: 'service' },
				{ id: 'gpu', label: 'GPU', kind: 'infra' },
				{ id: 'mon', label: 'Monitoring', kind: 'external' },
				{ id: 'reaper', label: 'Reaper', kind: 'service' },
			],
			edges: [
				{ from: 'user', to: 'api', label: null },
				{ from: 'api', to: 'gpu', label: null },
				{ from: 'gpu', to: 'mon', label: null },
				{ from: 'mon', to: 'reaper', label: null },
				{ from: 'reaper', to: 'gpu', label: 'shutdown' },
			],
		});
		const loop = l.edges.find((e) => e.back)!;
		const runX = loop.points[1]!.x;
		const spanned = l.nodes.filter((n) => n.row >= 2 && n.row <= 4);
		const outside = spanned.every((n) => runX > n.x + l.nodeWidth) || spanned.every((n) => runX < n.x);
		expect(outside).toBe(true);
		expect(loop.labelRotate).toBe(-90);
	});

	it('skips self-loops', () => {
		const l = layoutTopology({ nodes: [{ id: 'a', label: 'A', kind: 'service' }], edges: [{ from: 'a', to: 'a', label: null }] });
		expect(l.edges).toHaveLength(0);
	});
});

describe('wrapLabel', () => {
	it('keeps short labels on one line', () => {
		expect(wrapLabel('API (NestJS)', 22)).toEqual(['API (NestJS)']);
	});
	it('splits long labels on word boundaries into at most two lines', () => {
		expect(wrapLabel('Schedulers: analysis, autopilot, reconciler', 22)).toEqual(['Schedulers: analysis,', 'autopilot, reconciler']);
	});
	it('truncates text that does not fit in two lines', () => {
		const lines = wrapLabel('one two three four five six seven eight nine ten eleven', 12);
		expect(lines).toHaveLength(2);
		expect(lines[1]!.endsWith('…')).toBe(true);
	});
});
