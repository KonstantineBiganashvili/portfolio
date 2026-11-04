import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
	output: 'standalone',
	poweredByHeader: false,
	// The only remote image (the portrait) is rendered `unoptimized`, so no remotePatterns are needed:
	// the browser loads it from the CMS directly instead of the server fetching it through the CDN.
	images: { formats: ['image/avif', 'image/webp'] },
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
