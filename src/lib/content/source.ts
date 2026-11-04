import type { RawContent } from './raw';
import { fixtureContent } from './fixtures';

/** Repository boundary: anything that can produce raw CMS content. */
export interface ContentSource {
	load(): Promise<RawContent>;
}

export class ContentSourceError extends Error {
	constructor(
		message: string,
		readonly status?: number,
	) {
		super(message);
		this.name = 'ContentSourceError';
	}
}

interface DirectusSourceOptions {
	url: string;
	token: string;
	fetchImpl?: typeof fetch;
	timeoutMs?: number;
}

const QUERIES = {
	profile: '/items/profile?fields=*',
	experience: '/items/experience?limit=-1&sort=sort&fields=*',
	education: '/items/education?limit=-1&sort=sort&fields=*',
	projects: '/items/projects?limit=-1&sort=sort&fields=*',
	skills: '/items/skill_groups?limit=-1&sort=sort&fields=*',
} as const;

export function createDirectusSource({ url, token, fetchImpl = fetch, timeoutMs = 8000 }: DirectusSourceOptions): ContentSource {
	if (!url) throw new Error('CMS_URL is not set: point it at the Directus instance.');
	if (!token) throw new Error('CMS_API_KEY is not set: use the read-only "Portfolio" user token.');
	const base = url.replace(/\/+$/, '');

	async function get<T>(path: string): Promise<T> {
		let res: Response;
		try {
			res = await fetchImpl(`${base}${path}`, {
				headers: { Authorization: `Bearer ${token}`, Accept: 'application/json' },
				signal: AbortSignal.timeout(timeoutMs),
				cache: 'no-store',
			});
		} catch (error) {
			throw new ContentSourceError(`CMS request failed for ${path.split('?')[0]}: ${(error as Error).message}`);
		}
		if (!res.ok) throw new ContentSourceError(`CMS responded ${res.status} for ${path.split('?')[0]}`, res.status);
		const body = (await res.json()) as { data: T };
		return body.data;
	}

	/** A list collection that fails (e.g. a missing permission) hides one section instead of the whole site. */
	async function getList<T>(name: string, path: string): Promise<T[]> {
		try {
			return (await get<T[]>(path)) ?? [];
		} catch (error) {
			console.warn(`[content] ${name} unavailable, rendering without it: ${(error as Error).message}`);
			return [];
		}
	}

	return {
		async load() {
			// The profile is required; without it there is no page to render.
			const [profile, experience, education, projects, skills] = await Promise.all([
				get<RawContent['profile']>(QUERIES.profile),
				getList<RawContent['experience'][number]>('experience', QUERIES.experience),
				getList<RawContent['education'][number]>('education', QUERIES.education),
				getList<RawContent['projects'][number]>('projects', QUERIES.projects),
				getList<RawContent['skills'][number]>('skills', QUERIES.skills),
			]);
			return { profile, experience, education, projects, skills };
		},
	};
}

/** Static content for tests, e2e and offline development (CMS_FIXTURES=1). */
export function createFixtureSource(): ContentSource {
	return { load: async () => structuredClone(fixtureContent) };
}
