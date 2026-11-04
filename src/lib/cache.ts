interface SwrCacheOptions<T> {
	ttlMs: number;
	load: () => Promise<T>;
	now?: () => number;
	/** Called when a background refresh fails and the stale value keeps being served. */
	onError?: (error: Error) => void;
}

/**
 * Stale-while-revalidate cache for a single value.
 * - Fresh: served from memory.
 * - Stale: served immediately while one refresh runs in the background.
 * - Refresh fails: the stale value stays, and the clock resets so the next retry waits a full TTL
 *   instead of every request hammering a struggling upstream.
 * - Nothing cached yet: the caller waits for the first load and sees its error.
 */
export function createSwrCache<T>({ ttlMs, load, now = Date.now, onError }: SwrCacheOptions<T>) {
	let entry: { value: T; at: number } | null = null;
	let inflight: Promise<T> | null = null;

	const refresh = (): Promise<T> => {
		inflight ??= load()
			.then((value) => {
				entry = { value, at: now() };
				return value;
			})
			.catch((error: unknown) => {
				const err = error instanceof Error ? error : new Error(String(error));
				if (!entry) throw err;
				entry = { value: entry.value, at: now() };
				onError?.(err);
				return entry.value;
			})
			.finally(() => {
				inflight = null;
			});
		return inflight;
	};

	return {
		get(): Promise<T> {
			if (!entry) return refresh();
			if (now() - entry.at >= ttlMs) void refresh();
			return Promise.resolve(entry.value);
		},
	};
}
