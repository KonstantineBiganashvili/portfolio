import 'server-only';
import { createContentService } from './service';
import { createDirectusSource, createFixtureSource } from './source';

const useFixtures = process.env.CMS_FIXTURES === '1';
const cmsUrl = (process.env.CMS_URL ?? '').replace(/\/+$/, '');

export const assetUrl = (fileId: string) => `${cmsUrl}/assets/${encodeURIComponent(fileId)}`;

// Built lazily so `next build` (which has no CMS credentials) never touches the CMS.
let service: ReturnType<typeof createContentService> | null = null;
function contentService() {
	service ??= createContentService({
		source: useFixtures ? createFixtureSource() : createDirectusSource({ url: cmsUrl, token: process.env.CMS_API_KEY ?? '' }),
		assetUrl: useFixtures ? () => '/static/images/fixture-photo.svg' : assetUrl,
	});
	return service;
}

// async so configuration errors surface as rejected promises, like every other content failure.
export const getContent = async () => contentService().getContent();
export const getProject = async (slug: string) => contentService().getProject(slug);

/** Fetch a CMS file with the site's read token. */
export async function fetchCmsAsset(fileId: string): Promise<Response> {
	if (useFixtures) return new Response('%PDF-1.4 fixture', { headers: { 'content-type': 'application/pdf' } });
	return fetch(assetUrl(fileId), {
		headers: { Authorization: `Bearer ${process.env.CMS_API_KEY ?? ''}` },
		signal: AbortSignal.timeout(15_000),
		cache: 'no-store',
	});
}

export type * from './types';
