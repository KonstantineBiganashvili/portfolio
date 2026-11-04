interface ServeCvOptions {
	resumeFileId: string | null;
	fullName: string;
	fetchAsset: (fileId: string) => Promise<Response>;
}

const plain = (body: string, status: number) =>
	new Response(body, { status, headers: { 'content-type': 'text/plain; charset=utf-8', 'cache-control': 'no-store' } });

/** Stream the CV from the CMS as a download with a clean filename. */
export async function serveCv({ resumeFileId, fullName, fetchAsset }: ServeCvOptions): Promise<Response> {
	if (!resumeFileId) return plain('No CV is published right now.', 404);

	let upstream: Response;
	try {
		upstream = await fetchAsset(resumeFileId);
	} catch (error) {
		console.error('[cv] CMS unreachable:', (error as Error).message);
		return plain('The CV is temporarily unavailable. Try again in a minute.', 502);
	}
	if (!upstream.ok || !upstream.body) {
		console.error(`[cv] CMS responded ${upstream.status} for the resume file`);
		return plain('The CV is temporarily unavailable. Try again in a minute.', 502);
	}

	const filename = `${fullName.replace(/[^A-Za-z0-9]+/g, '-').replace(/^-|-$/g, '') || 'CV'}-CV.pdf`;
	const headers = new Headers({
		'content-type': 'application/pdf',
		'content-disposition': `attachment; filename="${filename}"`,
		'cache-control': 'public, max-age=300',
	});
	const length = upstream.headers.get('content-length');
	if (length) headers.set('content-length', length);
	return new Response(upstream.body, { status: 200, headers });
}
