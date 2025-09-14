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
	title: 'Konstantine Biganashvili',
	description: 'Portfolio website of Konstantine Biganashvili',
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
