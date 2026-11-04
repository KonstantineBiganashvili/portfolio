import 'server-only';
import { createContentService } from './service';
import { createDirectusSource, createFixtureSource } from './source';

const useFixtures = process.env.CMS_FIXTURES === '1';
const trim = (url: string) => url.replace(/\/+$/, '');
/**
 * Server-side API base. In the cluster this is the in-cluster Service: going out through the public
 * hostname puts server-to-server requests behind the CDN's bot challenge, which answers 403.
 */
const cmsUrl = trim(process.env.CMS_URL ?? '');
/** Browser-facing base for asset links (the portrait). Defaults to CMS_URL for local development. */
const publicCmsUrl = trim(process.env.CMS_PUBLIC_URL || process.env.CMS_URL || '');

export const assetUrl = (fileId: string) => `${publicCmsUrl}/assets/${encodeURIComponent(fileId)}`;

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
	return fetch(`${cmsUrl}/assets/${encodeURIComponent(fileId)}`, {
		headers: { Authorization: `Bearer ${process.env.CMS_API_KEY ?? ''}` },
		signal: AbortSignal.timeout(15_000),
		cache: 'no-store',
	});
}

export type * from './types';
