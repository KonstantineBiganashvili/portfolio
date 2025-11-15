import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
	try {
		const searchParams = request.nextUrl.searchParams;
		const path = searchParams.get('path');

		if (!path) {
			return NextResponse.json(
				{ error: 'Path parameter is required' },
				{ status: 400 },
			);
		}

		const assetUrl = `${process.env.NEXT_PUBLIC_CMS_URL}/assets/${path}`;

		const response = await fetch(assetUrl);

		if (!response.ok) {
			console.error(
				`Failed to fetch file: ${response.status} ${response.statusText}`,
			);
			return NextResponse.json(
				{
					error: 'Failed to fetch file',
					status: response.status,
					statusText: response.statusText,
				},
				{ status: response.status },
			);
		}

		const blob = await response.blob();
		const filename = path.split('/').pop() || 'download.pdf';

		const contentType =
			response.headers.get('content-type') || blob.type || 'application/pdf';

		return new NextResponse(blob, {
			headers: {
				'Content-Type': contentType,
				'Content-Disposition': `attachment; filename="${filename}"`,
				'Cache-Control': 'public, max-age=3600',
			},
		});
	} catch (error) {
		console.error('Error downloading file:', error);
		const errorMessage =
			error instanceof Error ? error.message : 'Unknown error';
		return NextResponse.json(
			{ error: 'Failed to download file', details: errorMessage },
			{ status: 500 },
		);
	}
}
