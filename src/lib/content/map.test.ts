import { describe, expect, it } from 'vitest';
import type { RawContent } from './raw';
import { parseTopology, toSiteContent } from './map';

const assetUrl = (id: string) => `https://cms.test/assets/${id}`;
const CV = '11111111-2222-4333-8444-555555555555';
const PHOTO = '66666666-7777-4888-9999-000000000000';

function raw(overrides: Partial<RawContent> = {}): RawContent {
	return {
		profile: {
			full_name: '  Konstantine Biganashvili ',
			headline: 'Full-Stack & DevOps Engineer',
			tagline: 'I build apps.',
			summary: 'Summary',
			location: 'Tbilisi, Georgia',
			timezone: 'Asia/Tbilisi',
			email: 'contact@example.com',
			available: true,
			status_text: 'Open to work',
			availability: [{ label: 'Freelance', available: true }, { label: 42 }],
			socials: [
				{ label: 'GitHub', kind: 'github', url: 'https://github.com/x' },
				{ label: 'Weird', kind: 'myspace', url: 'https://example.com' },
				{ label: 'Broken' },
			],
			stats: [{ value: '400+', label: 'resources', detail: '' }],
			resume: CV,
			photo: PHOTO,
		},
		experience: [
			{ id: 2, sort: 2, company: 'Old Co', role: 'Dev', start_date: '2020-01-01', end_date: '2021-01-01', highlights: [{ text: 'Did a thing' }, { text: '' }], stack: ['React', 3] },
			{ id: 1, sort: 1, company: 'New Co', role: 'DevOps', start_date: '2026-01-01', end_date: null, highlights: ['Plain string'], stack: null },
			{ id: 3, sort: 3, company: 'Hidden', role: 'X', start_date: '2018-01-01', visible: false },
			{ id: 4, sort: 4, company: 'No start', role: 'X' },
		],
		education: [{ id: 1, sort: 1, institution: 'Uni', degree: 'MSc', start_date: '2020-09-01', end_date: '2023-07-31' }],
		projects: [
			{ id: 1, sort: 2, slug: 'b', name: 'B', status: 'running', stack: [{ group: 'Data', items: ['Postgres'] }, { group: '', items: [] }], featured: false },
			{ id: 2, sort: 1, slug: 'a', name: 'A', status: 'nonsense', highlights: [{ title: 'T', body: 'B' }, { title: '' }] },
			{ id: 3, slug: null, name: 'No slug' },
		],
		skills: [{ id: 1, sort: 1, name: 'Frontend', items: ['React', '', 'Next.js'] }],
		...overrides,
	};
}

describe('toSiteContent', () => {
	it('maps and trims the profile, resolving file ids to asset URLs', () => {
		const { profile } = toSiteContent(raw(), { assetUrl });
		expect(profile.fullName).toBe('Konstantine Biganashvili');
		expect(profile.photoUrl).toBe(`https://cms.test/assets/${PHOTO}`);
		expect(profile.resumeFileId).toBe(CV);
		expect(profile.seoTitle).toBe('Konstantine Biganashvili | Full-Stack & DevOps Engineer');
	});

	it('drops malformed list entries and normalises unknown social kinds', () => {
		const { profile } = toSiteContent(raw(), { assetUrl });
		expect(profile.availability).toEqual([{ label: 'Freelance', available: true }]);
		expect(profile.socials).toEqual([
			{ label: 'GitHub', kind: 'github', url: 'https://github.com/x' },
			{ label: 'Weird', kind: 'other', url: 'https://example.com' },
		]);
		expect(profile.stats).toEqual([{ value: '400+', label: 'resources', detail: null }]);
	});

	it('sorts experience, hides invisible or incomplete entries, and flags current roles', () => {
		const { experience } = toSiteContent(raw(), { assetUrl });
		expect(experience.map((e) => e.company)).toEqual(['New Co', 'Old Co']);
		expect(experience[0]).toMatchObject({ current: true, end: null, highlights: ['Plain string'], stack: [] });
		expect(experience[1]).toMatchObject({ current: false, highlights: ['Did a thing'], stack: ['React'] });
	});

	it('sorts projects, drops entries without a slug, and defaults unknown statuses', () => {
		const { projects } = toSiteContent(raw(), { assetUrl });
		expect(projects.map((p) => p.slug)).toEqual(['a', 'b']);
		expect(projects[0]).toMatchObject({ status: 'shipped', featured: true, highlights: [{ title: 'T', body: 'B' }] });
		expect(projects[1]!.stack).toEqual([{ group: 'Data', items: ['Postgres'] }]);
	});

	it('removes empty skill items', () => {
		const { skills } = toSiteContent(raw(), { assetUrl });
		expect(skills).toEqual([{ id: 1, name: 'Frontend', items: ['React', 'Next.js'] }]);
	});

	it('ignores file references that are not Directus file ids', () => {
		const r = raw();
		r.profile!.resume = '../items/directus_users';
		r.profile!.photo = 'not-a-uuid';
		const { profile } = toSiteContent(r, { assetUrl });
		expect(profile.resumeFileId).toBeNull();
		expect(profile.photoUrl).toBeNull();
	});

	it('only keeps links with safe schemes', () => {
		const r = raw();
		r.profile!.socials = [
			{ label: 'Site', kind: 'other', url: 'https://example.com' },
			{ label: 'Mail', kind: 'email', url: 'mailto:a@example.com' },
			{ label: 'Bad', kind: 'other', url: 'javascript:alert(1)' },
			{ label: 'Data', kind: 'other', url: 'data:text/html,hi' },
			{ label: 'Relative', kind: 'other', url: '//evil.test' },
		];
		r.profile!.calendly_url = 'vbscript:msgbox(1)';
		const { profile } = toSiteContent(r, { assetUrl });
		expect(profile.socials.map((s) => s.label)).toEqual(['Site', 'Mail']);
		expect(profile.calendlyUrl).toBeNull();
	});

	it('throws a clear error when the profile singleton is missing', () => {
		expect(() => toSiteContent(raw({ profile: null }), { assetUrl })).toThrow(/profile/i);
	});

	it('keeps explicit SEO fields over the generated fallback', () => {
		const r = raw();
		r.profile!.seo_title = 'Custom title';
		r.profile!.seo_description = 'Custom description';
		const { profile } = toSiteContent(r, { assetUrl });
		expect(profile.seoTitle).toBe('Custom title');
		expect(profile.seoDescription).toBe('Custom description');
	});
});

describe('parseTopology', () => {
	it('keeps valid nodes and edges', () => {
		const t = parseTopology({ nodes: [{ id: 'a', label: 'A', kind: 'client' }, { id: 'b', label: 'B', kind: 'data' }], edges: [{ from: 'a', to: 'b', label: 'SQL' }] });
		expect(t).toEqual({ nodes: [{ id: 'a', label: 'A', kind: 'client' }, { id: 'b', label: 'B', kind: 'data' }], edges: [{ from: 'a', to: 'b', label: 'SQL' }] });
	});

	it('defaults unknown kinds, drops duplicate ids and dangling edges', () => {
		const t = parseTopology({
			nodes: [{ id: 'a', label: 'A', kind: 'robot' }, { id: 'a', label: 'dup' }, { label: 'no id' }],
			edges: [{ from: 'a', to: 'ghost' }, { from: 'a', to: 'a', label: '' }],
		});
		expect(t).toEqual({ nodes: [{ id: 'a', label: 'A', kind: 'service' }], edges: [{ from: 'a', to: 'a', label: null }] });
	});

	it('returns null for anything without nodes', () => {
		expect(parseTopology(null)).toBeNull();
		expect(parseTopology('{"nodes": []}')).toBeNull();
		expect(parseTopology({ nodes: 'x' })).toBeNull();
	});

	it('accepts a JSON string', () => {
		expect(parseTopology('{"nodes":[{"id":"a","label":"A","kind":"infra"}],"edges":[]}')?.nodes).toHaveLength(1);
	});

	it('returns null for invalid JSON strings', () => {
		expect(parseTopology('{not json')).toBeNull();
	});
});
