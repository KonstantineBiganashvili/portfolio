import type { Metadata } from 'next';
import { Montserrat } from 'next/font/google';
import './globals.css';
import '@/styles/theme.css';
import Layout from '@/components/Layout';
import { ThemeProvider } from '@/contexts/ThemeContext';
import { SkyboxProvider } from '@/contexts/SkyboxContext';

const montserrat = Montserrat();

export const metadata: Metadata = {
	title: 'Konstantine Biganashvili',
	description: 'Portfolio website of Konstantine Biganashvili',
};

export default function RootLayout({ children }: RootLayoutProps) {
	return (
		<html lang='en'>
			<body className={`${montserrat.className}`}>
				<ThemeProvider>
					<SkyboxProvider>
						<Layout>{children}</Layout>
					</SkyboxProvider>
				</ThemeProvider>
			</body>
		</html>
	);
}

interface RootLayoutProps {
	children: React.ReactNode;
}
