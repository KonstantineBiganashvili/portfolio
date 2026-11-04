import { render, screen, within } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { toSiteContent } from '@/lib/content/map';
import { fixtureContent } from '@/lib/content/fixtures';
import { About } from './About';
import { Education } from './Education';
import { ExperienceSection } from './Experience';
import { Projects } from './Projects';
import { Skills } from './Skills';

const content = toSiteContent(fixtureContent, { assetUrl: (id) => `/assets/${id}` });
const NOW = new Date('2026-11-04T12:00:00Z');

describe('ExperienceSection', () => {
	it('lists every visible role with its period, age and status', () => {
		render(<ExperienceSection experience={content.experience} now={NOW} />);
		const rows = screen.getAllByRole('group');
		expect(rows).toHaveLength(content.experience.length);
		const first = rows[0]!;
		expect(within(first).getByText('Flex Soft')).toBeInTheDocument();
		expect(within(first).getByText('DevOps Engineer')).toBeInTheDocument();
		expect(within(first).getByText('Jan 2026 – present')).toBeInTheDocument();
		expect(within(first).getByText('11mo')).toBeInTheDocument();
		expect(within(first).getByText('Running')).toBeInTheDocument();
		expect(within(rows.at(-1)!).getByText('Completed')).toBeInTheDocument();
	});

	it('opens the most recent role by default and shows its highlights', () => {
		const { container } = render(<ExperienceSection experience={content.experience} now={NOW} />);
		const details = container.querySelectorAll('details');
		expect(details[0]).toHaveAttribute('open');
		expect(details[1]).not.toHaveAttribute('open');
		expect(within(details[0] as HTMLElement).getByText(/ArgoCD, including an ephemeral preview environment/)).toBeInTheDocument();
	});
});

describe('Projects', () => {
	it('links each project to its case study and never to the live product', () => {
		render(<Projects projects={content.projects} />);
		const links = screen.getAllByRole('link');
		expect(links.length).toBeGreaterThan(0);
		for (const link of links) expect(link.getAttribute('href')).toMatch(/^\/projects\/[a-z0-9-]+$/);
		expect(screen.getByRole('heading', { name: 'Helmsman' })).toBeInTheDocument();
	});

	it('shows a status for every project', () => {
		render(<Projects projects={content.projects} />);
		expect(screen.getAllByText(/^(shipped|running|in development|archived)$/)).toHaveLength(content.projects.length);
	});
});

describe('Skills', () => {
	it('renders each group as a term with its items', () => {
		render(<Skills skills={content.skills} />);
		const frontend = screen.getByText('frontend:');
		expect(frontend.tagName).toBe('DT');
		expect(screen.getByText('React')).toBeInTheDocument();
	});
});

describe('Education', () => {
	it('lists degrees with their institutions and dates', () => {
		render(<Education education={content.education} />);
		expect(screen.getByText('Master of DevOps')).toBeInTheDocument();
		expect(screen.getByText('2023-09 → 2025-07')).toBeInTheDocument();
	});
});

describe('About', () => {
	it('computes years in tech from the earliest role and lists the CMS stats', () => {
		render(<About profile={content.profile} experience={content.experience} now={NOW} />);
		const table = screen.getByRole('table');
		expect(within(table).getByText('years in tech')).toBeInTheDocument();
		expect(within(table).getByText('7')).toBeInTheDocument();
		expect(within(table).getByText('400+')).toBeInTheDocument();
	});
});
