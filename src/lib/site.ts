export const SITE_URL = 'https://biganashvili.dev';

/** Used only when the CMS can't be reached, so the shell (and error pages) still render. */
export const FALLBACK = {
	name: 'Konstantine Biganashvili',
	title: 'Konstantine Biganashvili | Full-Stack & DevOps Engineer',
	description: 'Full-stack and DevOps engineer building web applications and the infrastructure they run on.',
} as const;

/** Home-page sections, in order. The nav and the section ids both read from here. */
export const SECTIONS = [
	{ id: 'about', label: 'about' },
	{ id: 'experience', label: 'experience' },
	{ id: 'projects', label: 'projects' },
	{ id: 'skills', label: 'skills' },
	{ id: 'contact', label: 'contact' },
] as const;

export type SectionId = (typeof SECTIONS)[number]['id'];
