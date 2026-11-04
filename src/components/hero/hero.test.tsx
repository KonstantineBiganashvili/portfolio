import { act, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { toSiteContent } from '@/lib/content/map';
import { fixtureContent } from '@/lib/content/fixtures';
import { Hero } from './Hero';
import { LocalClock } from './LocalClock';

vi.mock('@/components/scene/SceneMount', () => ({ SceneMount: () => <div data-testid='scene' /> }));

const content = toSiteContent(fixtureContent, { assetUrl: (id) => id });
const current = content.experience.filter((e) => e.current);

describe('Hero', () => {
	it('introduces the person with their headline and current roles', () => {
		render(<Hero profile={content.profile} currentRoles={current} />);
		expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Konstantine Biganashvili');
		expect(screen.getByText(content.profile.headline)).toBeInTheDocument();
		expect(screen.getByRole('list', { name: 'Currently' })).toHaveTextContent('DevOps Engineer at Flex Soft');
		expect(screen.getByText('open to work')).toBeInTheDocument();
		expect(screen.getByRole('link', { name: 'Download CV' })).toHaveAttribute('href', '/cv');
		expect(screen.getByTestId('scene')).toBeInTheDocument();
	});

	it('adapts when not looking for work and nothing is current', () => {
		render(<Hero profile={{ ...content.profile, available: false, resumeFileId: null }} currentRoles={[]} />);
		expect(screen.getByText('not looking')).toBeInTheDocument();
		expect(screen.queryByRole('list', { name: 'Currently' })).not.toBeInTheDocument();
		expect(screen.queryByRole('link', { name: 'Download CV' })).not.toBeInTheDocument();
	});
});

describe('LocalClock', () => {
	afterEach(() => vi.useRealTimers());

	it('shows the location, then the local time once mounted, and keeps ticking', () => {
		vi.useFakeTimers({ toFake: ['Date', 'setInterval', 'clearInterval'] });
		vi.setSystemTime(new Date('2026-11-04T10:05:00Z'));
		const { unmount } = render(<LocalClock timezone='Asia/Tbilisi' location='Tbilisi, Georgia' />);
		expect(screen.getByText(/Tbilisi, Georgia/)).toBeInTheDocument();
		expect(screen.getByText('14:05')).toBeInTheDocument();
		expect(screen.getByText('UTC+4')).toBeInTheDocument();
		act(() => {
			vi.setSystemTime(new Date('2026-11-04T10:06:00Z'));
			vi.advanceTimersByTime(15_000);
		});
		expect(screen.getByText('14:06')).toBeInTheDocument();
		unmount();
	});

	it('falls back to the zone name when no location is set', () => {
		render(<LocalClock timezone='UTC' location='' />);
		expect(screen.getByText(/UTC/, { selector: 'p' })).toBeInTheDocument();
	});
});
