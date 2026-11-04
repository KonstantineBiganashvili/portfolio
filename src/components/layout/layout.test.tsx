import { render, screen, within } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { toSiteContent } from '@/lib/content/map';
import { fixtureContent } from '@/lib/content/fixtures';
import { SECTIONS } from '@/lib/site';
import { Footer } from './Footer';
import { Header } from './Header';

const { profile } = toSiteContent(fixtureContent, { assetUrl: (id) => id });

describe('Header', () => {
	it('links to every home-page section', () => {
		render(<Header hasCv />);
		const nav = screen.getByRole('navigation', { name: 'Sections' });
		const hrefs = within(nav)
			.getAllByRole('link')
			.map((a) => a.getAttribute('href'));
		expect(hrefs).toEqual(SECTIONS.map((s) => `/#${s.id}`));
	});

	it('offers the CV only when one is published', () => {
		const { rerender } = render(<Header hasCv />);
		expect(screen.getByRole('link', { name: 'Download CV' })).toHaveAttribute('href', '/cv');
		rerender(<Header hasCv={false} />);
		expect(screen.queryByRole('link', { name: 'Download CV' })).not.toBeInTheDocument();
	});
});

describe('Footer', () => {
	it('shows the short build SHA and the deploy path', () => {
		render(<Footer profile={profile} buildSha='0123456789abcdef0123' />);
		expect(screen.getByText(/0123456789ab/)).toBeInTheDocument();
		expect(screen.getByText(/synced by ArgoCD/)).toBeInTheDocument();
	});

	it('still renders when content could not be loaded', () => {
		render(<Footer profile={null} buildSha='dev' />);
		expect(screen.getByText(/© \d{4} Konstantine Biganashvili/)).toBeInTheDocument();
		expect(screen.queryByRole('list', { name: 'Elsewhere' })).not.toBeInTheDocument();
	});

	it('opens profiles in a new tab but keeps mailto links in place', () => {
		render(<Footer profile={profile} buildSha='dev' />);
		const list = screen.getByRole('list', { name: 'Elsewhere' });
		const github = within(list).getByRole('link', { name: 'GitHub' });
		const email = within(list).getByRole('link', { name: 'Email' });
		expect(github).toHaveAttribute('target', '_blank');
		expect(github).toHaveAttribute('rel', 'noopener noreferrer');
		expect(email).not.toHaveAttribute('target');
	});
});
