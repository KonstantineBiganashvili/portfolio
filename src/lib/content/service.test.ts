import { describe, expect, it, vi } from 'vitest';
import { fixtureContent } from './fixtures';
import { createContentService } from './service';

describe('createContentService', () => {
	it('maps the source content and caches it', async () => {
		const load = vi.fn().mockResolvedValue(fixtureContent);
		const service = createContentService({ source: { load }, assetUrl: (id) => `/a/${id}`, ttlMs: 60_000 });
		const first = await service.getContent();
		const second = await service.getContent();
		expect(first.profile.fullName).toBe('Konstantine Biganashvili');
		expect(first.projects.length).toBeGreaterThan(0);
		expect(second).toBe(first);
		expect(load).toHaveBeenCalledTimes(1);
	});

	it('looks up a single project by slug', async () => {
		const service = createContentService({ source: { load: async () => fixtureContent }, assetUrl: (id) => id });
		const slug = fixtureContent.projects[0]!.slug!;
		expect((await service.getProject(slug))?.slug).toBe(slug);
		expect(await service.getProject('does-not-exist')).toBeNull();
	});
});
