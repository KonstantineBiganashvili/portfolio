import type { MetadataRoute } from 'next';
import { getContent } from '@/lib/content';
import { SITE_URL } from '@/lib/site';

export const dynamic = 'force-dynamic';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
	const { projects } = await getContent();
	return [
		{ url: SITE_URL, changeFrequency: 'monthly', priority: 1 },
		...projects.map((p) => ({ url: `${SITE_URL}/projects/${p.slug}`, changeFrequency: 'monthly' as const, priority: 0.7 })),
	];
}
