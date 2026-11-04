import { describe, expect, it, vi } from 'vitest';
import { serveCv } from './cv';

const pdf = () => new Response(new Uint8Array([37, 80, 68, 70]), { status: 200, headers: { 'content-type': 'application/pdf' } });

describe('serveCv', () => {
	it('streams the resume as a PDF attachment', async () => {
		const fetchAsset = vi.fn().mockResolvedValue(pdf());
		const res = await serveCv({ resumeFileId: 'file-1', fullName: 'Konstantine Biganashvili', fetchAsset });
		expect(fetchAsset).toHaveBeenCalledWith('file-1');
		expect(res.status).toBe(200);
		expect(res.headers.get('content-type')).toBe('application/pdf');
		expect(res.headers.get('content-disposition')).toBe('attachment; filename="Konstantine-Biganashvili-CV.pdf"');
	});

	it('passes the upstream content length through', async () => {
		const upstream = new Response(new Uint8Array([1, 2, 3, 4]), { status: 200, headers: { 'content-length': '4' } });
		const res = await serveCv({ resumeFileId: 'f', fullName: 'K', fetchAsset: vi.fn().mockResolvedValue(upstream) });
		expect(res.headers.get('content-length')).toBe('4');
	});

	it('returns 404 when no resume is configured', async () => {
		const res = await serveCv({ resumeFileId: null, fullName: 'K', fetchAsset: vi.fn() });
		expect(res.status).toBe(404);
	});

	it('returns 502 when the CMS cannot serve the file', async () => {
		const res = await serveCv({ resumeFileId: 'f', fullName: 'K', fetchAsset: vi.fn().mockResolvedValue(new Response('x', { status: 500 })) });
		expect(res.status).toBe(502);
	});

	it('returns 502 when the CMS is unreachable', async () => {
		const res = await serveCv({ resumeFileId: 'f', fullName: 'K', fetchAsset: vi.fn().mockRejectedValue(new Error('ECONNREFUSED')) });
		expect(res.status).toBe(502);
	});
});
