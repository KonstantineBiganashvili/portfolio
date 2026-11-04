import { fetchCmsAsset, getContent } from '@/lib/content';
import { serveCv } from '@/lib/cv';

export const dynamic = 'force-dynamic';

export async function GET() {
	try {
		const { profile } = await getContent();
		return serveCv({ resumeFileId: profile.resumeFileId, fullName: profile.fullName, fetchAsset: fetchCmsAsset });
	} catch (error) {
		console.error('[cv] content unavailable:', (error as Error).message);
		return new Response('The CV is temporarily unavailable. Try again in a minute.', { status: 503 });
	}
}
