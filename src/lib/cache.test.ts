import { describe, expect, it, vi } from 'vitest';
import { createSwrCache } from './cache';

function clock(start = 0) {
	let t = start;
	return { now: () => t, advance: (ms: number) => (t += ms) };
}

describe('createSwrCache', () => {
	it('loads once and serves the cached value while fresh', async () => {
		const c = clock();
		const load = vi.fn().mockResolvedValue('v1');
		const cache = createSwrCache({ ttlMs: 1000, load, now: c.now });
		expect(await cache.get()).toBe('v1');
		c.advance(999);
		expect(await cache.get()).toBe('v1');
		expect(load).toHaveBeenCalledTimes(1);
	});

	it('serves the stale value immediately after the TTL and refreshes in the background', async () => {
		const c = clock();
		let resolve!: (v: string) => void;
		const load = vi
			.fn()
			.mockResolvedValueOnce('v1')
			.mockImplementationOnce(() => new Promise<string>((r) => (resolve = r)));
		const cache = createSwrCache({ ttlMs: 1000, load, now: c.now });
		await cache.get();
		c.advance(1001);
		expect(await cache.get()).toBe('v1'); // does not wait for the slow refresh
		resolve('v2');
		await vi.waitFor(async () => expect(await cache.get()).toBe('v2'));
		expect(load).toHaveBeenCalledTimes(2);
	});

	it('keeps serving the stale value when a refresh fails, and backs off before retrying', async () => {
		const c = clock();
		const onError = vi.fn();
		const load = vi.fn().mockResolvedValueOnce('v1').mockRejectedValue(new Error('cms down'));
		const cache = createSwrCache({ ttlMs: 1000, load, now: c.now, onError });
		await cache.get();
		c.advance(5000);
		expect(await cache.get()).toBe('v1');
		await vi.waitFor(() => expect(onError).toHaveBeenCalledWith(expect.objectContaining({ message: 'cms down' })));
		c.advance(500);
		expect(await cache.get()).toBe('v1');
		expect(load).toHaveBeenCalledTimes(2); // no retry inside the back-off window
	});

	it('throws when the first load fails and nothing is cached', async () => {
		const cache = createSwrCache({ ttlMs: 1000, load: () => Promise.reject(new Error('cms down')) });
		await expect(cache.get()).rejects.toThrow('cms down');
	});

	it('shares one in-flight load between concurrent callers', async () => {
		let resolve!: (v: string) => void;
		const load = vi.fn(() => new Promise<string>((r) => (resolve = r)));
		const cache = createSwrCache({ ttlMs: 1000, load });
		const a = cache.get();
		const b = cache.get();
		resolve('v1');
		expect(await Promise.all([a, b])).toEqual(['v1', 'v1']);
		expect(load).toHaveBeenCalledTimes(1);
	});
});
