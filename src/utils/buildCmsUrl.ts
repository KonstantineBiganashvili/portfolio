const buildCmsUrl = (path: string, cmsUrl?: string) => {
	const baseUrl = cmsUrl ?? 'http://localhost:8055';
	return `${baseUrl}/assets/${path}`;
};

export default buildCmsUrl;
