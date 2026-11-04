import type { Metadata, Viewport } from 'next';
import { IBM_Plex_Sans, Martian_Mono } from 'next/font/google';
import { Footer } from '@/components/layout/Footer';
import { Header } from '@/components/layout/Header';
import { getContent } from '@/lib/content';
import type { Profile } from '@/lib/content/types';
import { FALLBACK, SITE_URL } from '@/lib/site';
import './globals.css';

const martian = Martian_Mono({ subsets: ['latin'], variable: '--font-martian', display: 'swap' });
const plex = IBM_Plex_Sans({ subsets: ['latin'], weight: ['400', '500', '600'], variable: '--font-plex', display: 'swap' });

// Content comes from the CMS at request time (cached in memory), never at build time.
export const dynamic = 'force-dynamic';

export const viewport: Viewport = { themeColor: '#070b14', colorScheme: 'dark' };

/** The shell must render even when the CMS is down, so 404s stay 404s and error.tsx can show. */
async function loadProfile(): Promise<Profile | null> {
	try {
		return (await getContent()).profile;
	} catch (error) {
		console.error('[layout] content unavailable, rendering the shell without it:', (error as Error).message);
		return null;
	}
}

export async function generateMetadata(): Promise<Metadata> {
	const profile = await loadProfile();
	const name = profile?.fullName || FALLBACK.name;
	const title = profile?.seoTitle || FALLBACK.title;
	const description = profile?.seoDescription || FALLBACK.description;
	return {
		metadataBase: new URL(SITE_URL),
		title: { default: title, template: `%s | ${name}` },
		description,
		authors: [{ name, url: SITE_URL }],
		creator: name,
		alternates: { canonical: '/' },
		openGraph: {
			type: 'website',
			url: SITE_URL,
			siteName: name,
			title,
			description,
			images: [{ url: '/static/images/preview.png', width: 1200, height: 630, alt: title }],
		},
		twitter: { card: 'summary_large_image', title, description, images: ['/static/images/preview.png'] },
		icons: {
			icon: [
				{ url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
				{ url: '/favicon.ico', sizes: 'any' },
			],
			apple: [{ url: '/apple-touch-icon.png', sizes: '180x180' }],
		},
		manifest: '/site.webmanifest',
	};
}

function personJsonLd(profile: Profile) {
	return {
		'@context': 'https://schema.org',
		'@type': 'Person',
		name: profile.fullName,
		jobTitle: profile.headline,
		url: SITE_URL,
		email: profile.email ? `mailto:${profile.email}` : undefined,
		address: profile.location ? { '@type': 'PostalAddress', addressLocality: profile.location } : undefined,
		sameAs: profile.socials.filter((s) => s.kind !== 'email').map((s) => s.url),
	};
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
	const profile = await loadProfile();
	return (
		<html lang='en' className={`${martian.variable} ${plex.variable}`}>
			<body>
				<a className='skip-link' href='#main'>
					Skip to content
				</a>
				{profile ? (
					<script type='application/ld+json' dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd(profile)).replace(/</g, '\\u003c') }} />
				) : null}
				<Header hasCv={Boolean(profile?.resumeFileId)} />
				<main id='main'>{children}</main>
				<Footer profile={profile} buildSha={process.env.BUILD_SHA ?? 'dev'} />
			</body>
		</html>
	);
}
