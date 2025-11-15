import { createDirectus, rest, staticToken } from '@directus/sdk';

export const directus = createDirectus(
	process.env.NEXT_PUBLIC_CMS_URL ?? 'http://localhost:8055',
)
	.with(staticToken(process.env.CMS_API_KEY ?? 'dummy-api-key'))
	.with(rest());
