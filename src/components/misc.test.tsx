import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { SocialIcon } from './console/Icon';
import { Tags } from './console/Tags';
import { Markdown } from './Markdown';
import { TopologyDiagram } from './projects/Topology';
import { About } from './sections/About';
import { Education } from './sections/Education';
import { ExperienceSection } from './sections/Experience';
import { Projects } from './sections/Projects';
import { Skills } from './sections/Skills';
import { toSiteContent } from '@/lib/content/map';
import { fixtureContent } from '@/lib/content/fixtures';

const content = toSiteContent(fixtureContent, { assetUrl: (id) => `https://cms.test/assets/${id}` });

describe('Markdown', () => {
	it('renders paragraphs and lists, demotes h1 and drops images and raw HTML', () => {
		const { container } = render(<Markdown>{'# Title\n\nText with **bold**.\n\n- one\n- two\n\n![x](https://img.test/x.png)\n\n<script>alert(1)</script>'}</Markdown>);
		expect(screen.getByRole('heading', { level: 2, name: 'Title' })).toBeInTheDocument();
		expect(screen.getAllByRole('listitem')).toHaveLength(2);
		expect(container.querySelector('img')).toBeNull();
		expect(container.querySelector('script')).toBeNull();
	});

	it('opens external links in a new tab and keeps internal ones in place', () => {
		render(<Markdown>{'[out](https://example.com) and [in](/projects/x)'}</Markdown>);
		expect(screen.getByRole('link', { name: 'out' })).toHaveAttribute('rel', 'noopener noreferrer');
		expect(screen.getByRole('link', { name: 'in' })).not.toHaveAttribute('target');
	});
});

describe('console primitives', () => {
	it('renders a decorative icon for every social kind', () => {
		for (const kind of ['github', 'linkedin', 'email', 'other'] as const) {
			const { container, unmount } = render(<SocialIcon kind={kind} />);
			expect(container.querySelector('svg')).toHaveAttribute('aria-hidden', 'true');
			unmount();
		}
	});

	it('renders nothing for an empty tag list', () => {
		const { container } = render(<Tags items={[]} label='none' />);
		expect(container).toBeEmptyDOMElement();
	});
});

describe('empty states', () => {
	it('sections with no content render nothing', () => {
		const { container } = render(
			<>
				<ExperienceSection experience={[]} />
				<Education education={[]} />
				<Skills skills={[]} />
				<Projects projects={content.projects.map((p) => ({ ...p, featured: false }))} />
			</>,
		);
		expect(container).toBeEmptyDOMElement();
	});

	it('About shows the portrait when present and skips the table with nothing to report', () => {
		const { rerender } = render(<About profile={content.profile} experience={[]} />);
		expect(screen.queryByRole('table')).toBeInTheDocument();
		rerender(<About profile={{ ...content.profile, stats: [], photoUrl: 'https://cms.test/assets/p' }} experience={[]} />);
		expect(screen.queryByRole('table')).not.toBeInTheDocument();
		expect(screen.getByRole('img', { name: /Portrait of/ })).toBeInTheDocument();
	});

	it('Experience shows roles without summary, highlights or stack', () => {
		render(<ExperienceSection experience={[{ ...content.experience[0]!, summary: '', highlights: [], stack: [] }]} />);
		expect(screen.getByText('Flex Soft')).toBeInTheDocument();
	});

	it('Education shows open-ended entries', () => {
		render(<Education education={[{ id: 9, institution: 'Uni', degree: 'PhD', start: '2026-09-01', end: null }]} />);
		expect(screen.getByText('2026-09')).toBeInTheDocument();
	});

	it('Projects handle a missing context or period', () => {
		render(<Projects projects={[{ ...content.projects[0]!, context: '', period: '2024' }]} />);
		expect(screen.getByText('2024')).toBeInTheDocument();
	});
});

describe('TopologyDiagram', () => {
	it('styles feedback loops differently and handles unlabeled edges', () => {
		const { container } = render(
			<TopologyDiagram
				title='Loop'
				topology={{
					nodes: [
						{ id: 'a', label: 'A', kind: 'client' },
						{ id: 'b', label: 'B', kind: 'infra' },
					],
					edges: [
						{ from: 'a', to: 'b', label: null },
						{ from: 'b', to: 'a', label: 'stream' },
					],
				}}
			/>,
		);
		expect(container.querySelectorAll('path[data-edge]')).toHaveLength(2);
		expect(container.querySelectorAll('text[transform]')).toHaveLength(1);
		expect(screen.getByRole('list', { name: 'Connections' })).toHaveTextContent('A → B');
	});
});
