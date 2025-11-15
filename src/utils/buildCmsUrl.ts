const buildCmsUrl = (path: string) => {
	return `${
		process.env.NEXT_PUBLIC_CMS_URL ?? 'http://localhost:8055'
	}/assets/${path}`;
};

export default buildCmsUrl;
