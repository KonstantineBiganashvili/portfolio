import type { Metadata } from 'next';
import { Montserrat } from 'next/font/google';
import './globals.css';
import '@/styles/theme.css';
import AppShell from '@/components/AppShell';
import { ThemeProvider } from '@/contexts/ThemeContext';
import { SkyboxProvider } from '@/contexts/SkyboxContext';
import { PortfolioProvider } from '@/contexts/PortfolioContext';
import { getPortfolio } from '@/libs/directus/queries/getPortfolio';
import getPageData from '@/utils/getPageData';
import type { PageData } from '@/types/portfolio';

const montserrat = Montserrat({
	subsets: ['latin'],
	weight: ['400', '500', '600', '700'],
});

export const metadata: Metadata = {
	metadataBase: new URL('https://biganashvili.dev'),
	title: {
		default:
			'Konstantine Biganashvili - Full Stack Developer & Software Engineer',
		template: '%s | Konstantine Biganashvili',
	},
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
		'JavaScript',
		'Node.js',
		'React Developer',
		'Frontend Developer',
		'Backend Developer',
		'Serverless',
		'Docker',
		'Kubernetes',
		'Microservices',
		'API Development',
		'Database Design',
		'System Architecture',
		'Performance Optimization',
		'Web Performance',
		'UI/UX',
		'Responsive Design',
		'Progressive Web Apps',
		'GraphQL',
		'REST API',
		'CI/CD',
		'Infrastructure as Code',
		'Terraform',
		'CloudFormation',
	],
	authors: [
		{ name: 'Konstantine Biganashvili', url: 'https://biganashvili.dev' },
	],
	creator: 'Konstantine Biganashvili',
	publisher: 'Konstantine Biganashvili',
	category: 'Technology',
	classification: 'Portfolio Website',
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
	other: {
		'theme-color': '#2563eb',
		'color-scheme': 'light dark',
		'format-detection': 'telephone=no',
		'mobile-web-app-capable': 'yes',
		'apple-mobile-web-app-capable': 'yes',
		'apple-mobile-web-app-status-bar-style': 'default',
		'apple-mobile-web-app-title': 'K. Biganashvili',
		'application-name': 'Konstantine Biganashvili Portfolio',
		'msapplication-TileColor': '#2563eb',
		'msapplication-config': '/browserconfig.xml',
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

const jsonLd = {
	'@context': 'https://schema.org',
	'@type': 'Person',
	name: 'Konstantine Biganashvili',
	url: 'https://biganashvili.dev',
	image: 'https://biganashvili.dev/static/images/konstantine.webp',
	sameAs: [
		'https://linkedin.com/in/konstantine-biganashvili',
		'https://github.com/konstantine-biganashvili',
	],
	jobTitle: 'Full Stack Developer',
	worksFor: {
		'@type': 'Organization',
		name: 'Freelance',
	},
	alumniOf: {
		'@type': 'Organization',
		name: 'University',
	},
	knowsAbout: [
		'Next.js',
		'React',
		'TypeScript',
		'Node.js',
		'NestJS',
		'AWS',
		'GCP',
		'DevOps',
		'Three.js',
		'GSAP',
		'Full Stack Development',
		'Software Engineering',
		'Cloud Computing',
		'Web Development',
	],
	description:
		'Software Engineer with 6+ years of experience building modern web applications. Specializing in Next.js, NestJS, TypeScript, and cloud technologies.',
	email: 'mailto:konstantine@biganashvili.dev',
	address: {
		'@type': 'PostalAddress',
		addressCountry: 'Georgia',
	},
};

export const dynamic = 'force-dynamic';

let portfolioData = await getPortfolio();
let pageData: PageData;

if (!portfolioData || portfolioData.length === 0) {
	const cmsUrl = process.env.CMS_URL;
	if (!cmsUrl || cmsUrl === 'http://localhost:8055') {
		portfolioData = null;
		pageData = {
			header: { navigation: [], socials: [] },
			hero: {
				id: '',
				title: '',
				page_title: '',
				subtext: '',
				subtext_2: '',
				skills: [],
				download_btn_title: '',
				download_btn_file: { filename_disk: '' },
				contact_btn_title: '',
				contact_btn_path: '',
			},
			about: {
				id: '',
				title: '',
				page_title: '',
				subtext: '',
				profile_photo: { filename_disk: '' },
				position: '',
				description_1: '',
				description_2: '',
				highlights: [],
				skills_title: '',
				skills: [],
			},
			recentWorks: {
				id: '',
				title: '',
				page_title: '',
				subtext: '',
				card_view_title: '',
				card_live_title: '',
				additional_info: '',
				projects: [],
			},
			myJourney: {
				id: '',
				title: '',
				page_title: '',
				subtext: '',
				journey_items: [],
			},
			contact: {
				id: '',
				title: '',
				page_title: '',
				subtext: '',
				form_title: '',
				form_subtext: '',
				form_name_title: '',
				form_name_placeholder: '',
				form_email_title: '',
				form_email_placeholder: '',
				form_subject_title: '',
				form_subject_placeholder: '',
				form_message_title: '',
				form_message_placeholder: '',
				form_btn_text: '',
				form_btn_loading_text: '',
				contact_box_title: '',
				contact_box_call_btn_title: '',
				contact_box_resume_btn_title: '',
				contact_box_resume_btn_file: '',
				get_in_touch_title: '',
				availability_title: '',
				availability_subtext: '',
				availability_items: [],
				location_title: '',
				location: '',
			},
			footer: {
				id: '',
				title: '',
				footer_subtext: '',
				btt_btn_title: '',
				availability_text: '',
				location: '',
				navigation: [],
				socials: [],
			},
		} as PageData;
	} else {
		throw new Error('Failed to fetch portfolio data');
	}
} else {
	pageData = getPageData(portfolioData[0]);
}

const cmsUrl = process.env.CMS_URL ?? 'http://localhost:8055';

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang='en'>
			<head>
				<script
					type='application/ld+json'
					dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
				/>
			</head>
			<body className={montserrat.className}>
				<ThemeProvider>
					<SkyboxProvider>
						<PortfolioProvider pageData={pageData} cmsUrl={cmsUrl}>
							<AppShell>{children}</AppShell>
						</PortfolioProvider>
					</SkyboxProvider>
				</ThemeProvider>
			</body>
		</html>
	);
}
