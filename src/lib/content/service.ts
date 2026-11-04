import { createSwrCache } from '@/lib/cache';
import { toSiteContent } from './map';
import type { ContentSource } from './source';
import type { Project, SiteContent } from './types';

interface ContentServiceOptions {
	source: ContentSource;
	assetUrl: (fileId: string) => string;
	ttlMs?: number;
}

export function createContentService({ source, assetUrl, ttlMs = 60_000 }: ContentServiceOptions) {
	const cache = createSwrCache<SiteContent>({
		ttlMs,
		load: async () => toSiteContent(await source.load(), { assetUrl }),
		onError: (error) => console.warn(`[content] refresh failed, serving cached content: ${error.message}`),
	});

	return {
		getContent: () => cache.get(),
		async getProject(slug: string): Promise<Project | null> {
			const { projects } = await cache.get();
			return projects.find((p) => p.slug === slug) ?? null;
		},
	};
}
