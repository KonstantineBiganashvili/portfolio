import type { Metadata } from 'next';
import { Montserrat } from 'next/font/google';
import './globals.css';

const montserrat = Montserrat();

export const metadata: Metadata = {
	title: 'Konstantine Biganashvili',
	description: 'Portfolio website of Konstantine Biganashvili',
};

export default function RootLayout({ children }: RootLayoutProps) {
	return (
		<html lang='en'>
			<body className={`${montserrat.className}`}>{children}</body>
		</html>
	);
}

interface RootLayoutProps {
	children: React.ReactNode;
}
