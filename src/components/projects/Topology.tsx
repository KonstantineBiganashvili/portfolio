import type { NodeKind, Topology } from '@/lib/content/types';
import { layoutTopology } from '@/lib/topology/layout';
import styles from './projects.module.css';

const KIND_LABEL: Record<NodeKind, string> = {
	client: 'client',
	service: 'service',
	data: 'data',
	external: 'external',
	infra: 'infrastructure',
};

const MARGIN = 56; // room for back-edges that loop around the side

export function TopologyDiagram({ topology, title }: { topology: Topology; title: string }) {
	const l = layoutTopology(topology);
	const byId = new Map(topology.nodes.map((n) => [n.id, n]));
	const kinds = [...new Set(topology.nodes.map((n) => n.kind))];
	const titleId = `topology-${title.replace(/\W+/g, '-').toLowerCase()}`;

	return (
		<figure className={styles.topology}>
			<div className={styles.topologyScroll}>
				<svg
					role='img'
					aria-labelledby={titleId}
					viewBox={`${-MARGIN} 0 ${l.width + MARGIN * 2} ${l.height}`}
					width={l.width + MARGIN * 2}
					className={styles.topologySvg}
				>
					<title id={titleId}>{title}</title>
					<defs>
						<marker id={`${titleId}-arrow`} viewBox='0 0 8 8' refX='7' refY='4' markerWidth='7' markerHeight='7' orient='auto-start-reverse'>
							<path d='M0 0 L8 4 L0 8 z' className={styles.arrow} />
						</marker>
					</defs>
					<g>
						{l.edges.map((e, i) => (
							<path
								key={`${i}-${e.from}-${e.to}`}
								data-edge
								d={e.path}
								className={e.back ? `${styles.edge} ${styles.edgeBack}` : styles.edge}
								markerEnd={`url(#${titleId}-arrow)`}
							/>
						))}
					</g>
					<g>
						{l.nodes.map((n) => (
							<g key={n.id} data-node data-kind={n.kind} transform={`translate(${n.x} ${n.y})`} className={styles.node}>
								<rect width={l.nodeWidth} height={l.nodeHeight} rx='3' />
								<text x='12' y='17' className={styles.nodeKind}>
									{KIND_LABEL[n.kind]}
								</text>
								{n.lines.map((line, i) => (
									<text key={line} x='12' y={n.lines.length === 1 ? 40 : 34 + i * 15} className={styles.nodeLabel}>
										{line}
									</text>
								))}
							</g>
						))}
					</g>
					{/* Labels last, so they stay readable where an edge passes behind a node. */}
					<g>
						{l.edges
							.map((e, i) => ({ e, i }))
							.filter(({ e }) => e.label)
							.map(({ e, i }) => (
								<text
									key={`${i}-${e.from}-${e.to}-label`}
									x={e.labelX}
									y={e.labelY}
									transform={e.labelRotate ? `rotate(${e.labelRotate} ${e.labelX} ${e.labelY})` : undefined}
									className={styles.edgeLabel}
									textAnchor='middle'
									dominantBaseline='middle'
								>
									{e.label}
								</text>
							))}
					</g>
				</svg>
			</div>
			<figcaption className={styles.legend}>
				{kinds.map((k) => (
					<span key={k} data-kind={k} className={styles.legendItem}>
						<span className={styles.swatch} aria-hidden='true' />
						{KIND_LABEL[k]}
					</span>
				))}
			</figcaption>
			<ul className='sr-only' aria-label='Connections'>
				{topology.edges.map((e, i) => (
					<li key={`${i}-${e.from}-${e.to}-sr`}>
						{byId.get(e.from)?.label} → {byId.get(e.to)?.label}
						{e.label ? `: ${e.label}` : ''}
					</li>
				))}
			</ul>
		</figure>
	);
}
