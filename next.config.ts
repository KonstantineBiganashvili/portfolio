import type { NextConfig } from 'next';

const getCmsHostname = (): string | undefined => {
	const cmsUrl = process.env.NEXT_PUBLIC_CMS_URL ?? 'http://localhost:8055';
	if (!cmsUrl) return undefined;
	try {
		const url = new URL(cmsUrl);
		return url.hostname;
	} catch {
		return undefined;
	}
};

const cmsHostname = getCmsHostname();

const nextConfig: NextConfig = {
	output: 'standalone',
	experimental: {
		optimizePackageImports: ['lucide-react'],
	},
	images: {
		formats: ['image/webp', 'image/avif'],
		deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
		imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
		dangerouslyAllowSVG: true,
		contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
		...(cmsHostname && {
			remotePatterns: [
				{
					protocol: 'https',
					hostname: cmsHostname,
					pathname: '/assets/**',
				},
				{
					protocol: 'http',
					hostname: cmsHostname,
					pathname: '/assets/**',
				},
			],
		}),
	},
	compiler: {
		removeConsole: process.env.NODE_ENV === 'production',
	},
	compress: true,
	poweredByHeader: false,
	trailingSlash: false,
	generateEtags: true,
	async headers() {
		return [
			{
				source: '/(.*)',
				headers: [
					{
						key: 'X-Frame-Options',
						value: 'DENY',
					},
					{
						key: 'X-Content-Type-Options',
						value: 'nosniff',
					},
					{
						key: 'Referrer-Policy',
						value: 'origin-when-cross-origin',
					},
					{
						key: 'Permissions-Policy',
						value: 'camera=(), microphone=(), geolocation=()',
					},
				],
			},
			{
				source: '/static/(.*)',
				headers: [
					{
						key: 'Cache-Control',
						value: 'public, max-age=31536000, immutable',
					},
				],
			},
		];
	},
};

export default nextConfig;
