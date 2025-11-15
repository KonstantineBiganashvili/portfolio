import { createDirectus, rest, staticToken } from '@directus/sdk';

export const directus = createDirectus(process.env.NEXT_PUBLIC_CMS_URL!)
	.with(staticToken(process.env.CMS_API_KEY!))
	.with(rest());
