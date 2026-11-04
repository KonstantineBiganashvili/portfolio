import { describe, expect, it, vi } from 'vitest';
import { ContentSourceError, createDirectusSource } from './source';

function okJson(data: unknown) {
	return new Response(JSON.stringify({ data }), { status: 200, headers: { 'content-type': 'application/json' } });
}

describe('createDirectusSource', () => {
	it('fetches every collection with the bearer token and returns raw content', async () => {
		const fetchImpl = vi.fn(async (input: string | URL | Request) => {
			const url = String(input);
			if (url.includes('/items/profile')) return okJson({ full_name: 'K' });
			return okJson([{ id: 1 }]);
		});
		const source = createDirectusSource({ url: 'https://cms.test/', token: 'secret-token', fetchImpl });
		const content = await source.load();

		expect(content.profile).toEqual({ full_name: 'K' });
		expect(content.experience).toEqual([{ id: 1 }]);
		expect(fetchImpl).toHaveBeenCalledTimes(5);
		const [firstUrl, init] = fetchImpl.mock.calls[0] as unknown as [string, RequestInit];
		expect(firstUrl.startsWith('https://cms.test/items/')).toBe(true);
		expect((init.headers as Record<string, string>).Authorization).toBe('Bearer secret-token');
		const urls = fetchImpl.mock.calls.map((c) => String(c[0]));
		expect(urls.some((u) => u.includes('/items/experience') && u.includes('limit=-1'))).toBe(true);
	});

	it('keeps the site up when a single list collection fails, logging which one', async () => {
		const warn = vi.spyOn(console, 'warn').mockImplementation(() => {});
		const fetchImpl = vi.fn(async (input: string | URL | Request) => {
			const url = String(input);
			if (url.includes('/items/education')) return new Response('forbidden', { status: 403 });
			if (url.includes('/items/profile')) return okJson({ full_name: 'K' });
			return okJson([{ id: 1 }]);
		});
		const content = await createDirectusSource({ url: 'https://cms.test', token: 't', fetchImpl }).load();
		expect(content.education).toEqual([]);
		expect(content.projects).toEqual([{ id: 1 }]);
		expect(warn).toHaveBeenCalledWith(expect.stringMatching(/education.*403/));
		warn.mockRestore();
	});

	it('raises a ContentSourceError with the status but never the token', async () => {
		const fetchImpl = vi.fn(async () => new Response('nope', { status: 403 }));
		const source = createDirectusSource({ url: 'https://cms.test', token: 'secret-token', fetchImpl });
		const err = await source.load().catch((e: unknown) => e);
		expect(err).toBeInstanceOf(ContentSourceError);
		expect(String((err as Error).message)).toMatch(/403/);
		expect(String((err as Error).message)).not.toMatch(/secret-token/);
	});

	it('reports network failures without leaking the token', async () => {
		const fetchImpl = vi.fn(async () => {
			throw new TypeError('fetch failed');
		});
		const source = createDirectusSource({ url: 'https://cms.test', token: 'secret-token', fetchImpl });
		await expect(source.load()).rejects.toThrow(/CMS request failed for \/items\/\w+: fetch failed/);
	});

	it('serves a deep copy of the fixtures', async () => {
		const { createFixtureSource } = await import('./source');
		const a = await createFixtureSource().load();
		const b = await createFixtureSource().load();
		expect(a).toEqual(b);
		expect(a).not.toBe(b);
	});

	it('requires a URL and token up front', () => {
		expect(() => createDirectusSource({ url: '', token: 't' })).toThrow(/CMS_URL/);
		expect(() => createDirectusSource({ url: 'https://cms.test', token: '' })).toThrow(/CMS_API_KEY/);
	});
});
