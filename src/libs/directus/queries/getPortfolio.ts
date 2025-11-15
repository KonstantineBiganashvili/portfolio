import { readItems } from '@directus/sdk';
import { directus } from '..';
import type { CMSPortfolioData } from '@/types/cms';

export const getPortfolio = async (): Promise<CMSPortfolioData[]> => {
	const portfolio = await directus.request(
		readItems('portfolio', {
			filter: { slug: { _eq: 'biganashvili_dev' } },
			fields: ['*.*.*.*', 'hero.download_btn_file'],
			limit: 1,
		}),
	);
	return portfolio as CMSPortfolioData[];
};
