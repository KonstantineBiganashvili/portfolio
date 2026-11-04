import { afterEach, describe, expect, it, vi } from 'vitest';

async function load(env: Record<string, string>) {
	vi.resetModules();
	for (const [k, v] of Object.entries(env)) vi.stubEnv(k, v);
	return import('./index');
}

describe('content module wiring', () => {
	afterEach(() => {
		vi.unstubAllEnvs();
		vi.unstubAllGlobals();
	});

	it('serves fixture content and a stub CV in fixture mode', async () => {
		const mod = await load({ CMS_FIXTURES: '1' });
		const content = await mod.getContent();
		expect(content.profile.fullName).toBe('Konstantine Biganashvili');
		expect(await mod.getProject('helmsman')).not.toBeNull();
		const cv = await mod.fetchCmsAsset('anything');
		expect(cv.headers.get('content-type')).toBe('application/pdf');
	});

	it('builds encoded asset URLs and fetches them with the read token', async () => {
		const fetchMock = vi.fn().mockResolvedValue(new Response('ok'));
		vi.stubGlobal('fetch', fetchMock);
		const mod = await load({ CMS_FIXTURES: '0', CMS_URL: 'https://cms.test/', CMS_API_KEY: 'read-token' });
		expect(mod.assetUrl('a b')).toBe('https://cms.test/assets/a%20b');
		await mod.fetchCmsAsset('file-1');
		const [url, init] = fetchMock.mock.calls[0] as [string, RequestInit];
		expect(url).toBe('https://cms.test/assets/file-1');
		expect((init.headers as Record<string, string>).Authorization).toBe('Bearer read-token');
	});

	it('talks to the CMS internally but builds browser-facing asset URLs from CMS_PUBLIC_URL', async () => {
		const fetchMock = vi.fn().mockResolvedValue(new Response('ok'));
		vi.stubGlobal('fetch', fetchMock);
		const mod = await load({
			CMS_FIXTURES: '0',
			CMS_URL: 'http://directus.directus.svc.cluster.local:8055',
			CMS_PUBLIC_URL: 'https://cms.example.com/',
			CMS_API_KEY: 'read-token',
		});
		expect(mod.assetUrl('photo')).toBe('https://cms.example.com/assets/photo');
		await mod.fetchCmsAsset('cv');
		expect(fetchMock.mock.calls[0]![0]).toBe('http://directus.directus.svc.cluster.local:8055/assets/cv');
	});

	it('fails with a clear message when the CMS is not configured', async () => {
		const mod = await load({ CMS_FIXTURES: '0', CMS_URL: '', CMS_API_KEY: '' });
		await expect(mod.getContent()).rejects.toThrow(/CMS_URL/);
	});
});
