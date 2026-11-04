import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import type { Topology } from '@/lib/content/types';
import { TopologyDiagram } from './Topology';

const topology: Topology = {
	nodes: [
		{ id: 'user', label: 'Browser', kind: 'client' },
		{ id: 'api', label: 'API (NestJS)', kind: 'service' },
		{ id: 'db', label: 'Postgres', kind: 'data' },
	],
	edges: [
		{ from: 'user', to: 'api', label: 'HTTPS' },
		{ from: 'api', to: 'db', label: 'SQL' },
	],
};

describe('TopologyDiagram', () => {
	it('draws a labelled SVG with a box per node and a path per edge', () => {
		const { container } = render(<TopologyDiagram topology={topology} title='Helmsman architecture' />);
		const svg = screen.getByRole('img', { name: 'Helmsman architecture' });
		expect(svg.tagName.toLowerCase()).toBe('svg');
		expect(container.querySelectorAll('[data-node]')).toHaveLength(3);
		expect(container.querySelectorAll('path[data-edge]')).toHaveLength(2);
	});

	it('describes every connection in text for screen readers', () => {
		render(<TopologyDiagram topology={topology} title='Architecture' />);
		const list = screen.getByRole('list', { name: 'Connections' });
		expect(list).toHaveTextContent('Browser → API (NestJS): HTTPS');
		expect(list).toHaveTextContent('API (NestJS) → Postgres: SQL');
	});
});
