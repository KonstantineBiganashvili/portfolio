import type { NextConfig } from 'next';

// Read at BUILD time: the Docker build has no CMS_URL, so this defaults to the production CMS host.
// If the CMS ever moves, set CMS_URL as a build arg too, or the portrait (next/image) will be rejected.
const cmsHost = (() => {
	try {
		return new URL(process.env.CMS_URL ?? 'https://cms.biganashvili.dev').hostname;
	} catch {
		return 'cms.biganashvili.dev';
	}
})();

const nextConfig: NextConfig = {
	output: 'standalone',
	poweredByHeader: false,
	images: {
		formats: ['image/avif', 'image/webp'],
		remotePatterns: [{ protocol: 'https', hostname: cmsHost, pathname: '/assets/**' }],
	},
	compiler: {
		removeConsole: process.env.NODE_ENV === 'production' ? { exclude: ['error', 'warn'] } : false,
	},
	async headers() {
		return [
			{
				source: '/(.*)',
				headers: [
					{ key: 'X-Frame-Options', value: 'DENY' },
					{ key: 'X-Content-Type-Options', value: 'nosniff' },
					{ key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
					{ key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
				],
			},
			{
				source: '/static/(.*)',
				// Not content-hashed, so no `immutable`: a replaced image must reach returning visitors.
				headers: [{ key: 'Cache-Control', value: 'public, max-age=86400' }],
			},
		];
	},
};

export default nextConfig;
