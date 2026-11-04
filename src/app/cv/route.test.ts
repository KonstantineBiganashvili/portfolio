import { afterEach, describe, expect, it, vi } from 'vitest';

const getContent = vi.fn();
const fetchCmsAsset = vi.fn();
vi.mock('@/lib/content', () => ({ getContent, fetchCmsAsset }));

const { GET } = await import('./route');

describe('GET /cv', () => {
	afterEach(() => vi.clearAllMocks());

	it('streams the published CV', async () => {
		getContent.mockResolvedValue({ profile: { resumeFileId: 'f', fullName: 'K B' } });
		fetchCmsAsset.mockResolvedValue(new Response('%PDF', { status: 200 }));
		const res = await GET();
		expect(res.status).toBe(200);
		expect(fetchCmsAsset).toHaveBeenCalledWith('f');
	});

	it('answers 503 when content cannot be loaded at all', async () => {
		vi.spyOn(console, 'error').mockImplementation(() => {});
		getContent.mockRejectedValue(new Error('cms down'));
		const res = await GET();
		expect(res.status).toBe(503);
	});
});
