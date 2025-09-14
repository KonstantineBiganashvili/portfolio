import type { Metadata } from 'next';
import { Montserrat } from 'next/font/google';
import './globals.css';
import '@/styles/theme.css';
import AppShell from '@/components/AppShell';
import { ThemeProvider } from '@/contexts/ThemeContext';
import { SkyboxProvider } from '@/contexts/SkyboxContext';

const montserrat = Montserrat({
	subsets: ['latin'],
	weight: ['400', '500', '600', '700'],
});

export const metadata: Metadata = {
	title: 'Konstantine Biganashvili - Full Stack Developer',
	description:
		'Software Engineer with 6+ years of experience building modern web applications. Specializing in Next.js, NestJS, TypeScript, and cloud technologies (AWS, GCP). Explore my portfolio featuring innovative projects and technical expertise.',
	keywords: [
		'Konstantine Biganashvili',
		'Full Stack Developer',
		'Software Engineer',
		'Next.js',
		'NestJS',
		'TypeScript',
		'React',
		'AWS',
		'GCP',
		'Web Developer',
		'Portfolio',
		'Three.js',
		'GSAP',
		'Cloud Engineer',
		'DevOps',
	],
	authors: [{ name: 'Konstantine Biganashvili' }],
	creator: 'Konstantine Biganashvili',
	publisher: 'Konstantine Biganashvili',
	robots: {
		index: true,
		follow: true,
		googleBot: {
			index: true,
			follow: true,
			'max-video-preview': -1,
			'max-image-preview': 'large',
			'max-snippet': -1,
		},
	},
	openGraph: {
		type: 'website',
		locale: 'en_US',
		url: 'https://biganashvili.dev',
		siteName: 'Konstantine Biganashvili Portfolio',
		title:
			'Konstantine Biganashvili - Full Stack Developer & Software Engineer',
		description:
			'Experienced Software Engineer with 6+ years in modern web development. Expert in Next.js, NestJS, TypeScript, and cloud technologies. View my portfolio of innovative projects and technical solutions.',
		images: [
			{
				url: '/static/images/preview.png',
				width: 1200,
				height: 630,
				alt: 'Konstantine Biganashvili - Full Stack Developer Portfolio',
				type: 'image/png',
			},
		],
	},
	twitter: {
		card: 'summary_large_image',
		title: 'Konstantine Biganashvili - Full Stack Developer',
		description:
			'Software Engineer with 6+ years of experience. Specializing in Next.js, NestJS, TypeScript, and cloud technologies. Explore my portfolio of innovative projects.',
		images: ['/static/images/preview.png'],
	},
	alternates: {
		canonical: 'https://biganashvili.dev',
	},
	icons: {
		icon: [
			{ url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
			{ url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
			{ url: '/favicon.ico', sizes: 'any' },
		],
		shortcut: '/favicon.ico',
		apple: [
			{ url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
		],
		other: [
			{
				url: '/android-chrome-192x192.png',
				sizes: '192x192',
				type: 'image/png',
			},
			{
				url: '/android-chrome-512x512.png',
				sizes: '512x512',
				type: 'image/png',
			},
		],
	},
	manifest: '/site.webmanifest',
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang='en'>
			<body className={montserrat.className}>
				<ThemeProvider>
					<SkyboxProvider>
						<AppShell>{children}</AppShell>
					</SkyboxProvider>
				</ThemeProvider>
			</body>
		</html>
	);
}
