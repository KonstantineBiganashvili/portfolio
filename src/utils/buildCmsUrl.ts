const buildCmsUrl = (path: string) => {
	return `${process.env.NEXT_PUBLIC_CMS_URL}/assets/${path}`;
};

export default buildCmsUrl;
