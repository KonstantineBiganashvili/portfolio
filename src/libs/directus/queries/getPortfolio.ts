import { readItems } from '@directus/sdk';
import { directus } from '..';
import type { CMSPortfolioData } from '@/types/cms';

export const getPortfolio = async (): Promise<CMSPortfolioData[] | null> => {
	try {
		const cmsUrl = process.env.NEXT_PUBLIC_CMS_URL;
		if (!cmsUrl || cmsUrl === 'http://localhost:8055') {
			return null;
		}

		const portfolio = await directus.request(
			readItems('portfolio', {
				filter: { slug: { _eq: 'biganashvili_dev' } },
				fields: ['*.*.*.*', 'hero.download_btn_file'],
				limit: 1,
			}),
		);
		return portfolio as CMSPortfolioData[];
	} catch (error) {
		console.warn('Failed to fetch portfolio data:', error);
		return null;
	}
};
