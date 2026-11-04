import { render, screen, within } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { toSiteContent } from '@/lib/content/map';
import { fixtureContent } from '@/lib/content/fixtures';
import { Contact } from './Contact';

const { profile } = toSiteContent(fixtureContent, { assetUrl: (id) => id });
const props = { formEndpoint: 'https://forms.test', formAccessKey: 'key' };

describe('Contact', () => {
	it('offers every way to get in touch', () => {
		render(<Contact profile={profile} {...props} />);
		expect(screen.getByRole('link', { name: profile.email })).toHaveAttribute('href', `mailto:${profile.email}`);
		expect(screen.getByRole('link', { name: 'Book a 30-minute call' })).toHaveAttribute('target', '_blank');
		expect(screen.getByRole('link', { name: 'Download CV' })).toHaveAttribute('href', '/cv');
		const profiles = screen.getByRole('list', { name: 'Profiles' });
		expect(within(profiles).queryByRole('link', { name: /email/i })).not.toBeInTheDocument();
		expect(screen.getByRole('button', { name: 'Send message' })).toBeInTheDocument();
	});

	it('announces availability in words, not only with marks', () => {
		render(<Contact profile={{ ...profile, availability: [{ label: 'Freelance', available: true }, { label: 'Full-time', available: false }] }} {...props} />);
		const list = screen.getByRole('list', { name: 'Availability' });
		expect(list).toHaveTextContent('Freelance: available');
		expect(list).toHaveTextContent('Full-time: not available');
	});

	it('drops optional pieces that are not configured', () => {
		render(
			<Contact
				profile={{ ...profile, available: false, statusText: '', availability: [], email: '', calendlyUrl: null, resumeFileId: null, socials: [] }}
				{...props}
			/>,
		);
		expect(screen.getByText('not looking')).toBeInTheDocument();
		expect(screen.queryByRole('link', { name: /call/ })).not.toBeInTheDocument();
		expect(screen.queryByRole('list', { name: 'Profiles' })).not.toBeInTheDocument();
		expect(screen.queryByRole('list', { name: 'Availability' })).not.toBeInTheDocument();
	});
});
