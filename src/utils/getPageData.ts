import type {
	CMSPortfolioData,
	CMSSkill,
	CMSRecentWorksProjectJunction,
	DirectusFile,
} from '@/types/cms';
import type {
	PageData,
	ProjectData,
	NavigationItem,
	HeroData,
	AboutData,
	RecentWorksData,
	MyJourneyData,
	ContactData,
	FooterData,
	FileReference,
} from '@/types/portfolio';

const flatSkills = (skills: CMSSkill[]): string[] => {
	return skills.map((skill) => skill.name);
};

const sanitizeData = <T extends Record<string, any>>(
	data: T,
): Omit<T, 'portfolio' | 'date_created' | 'date_updated'> => {
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const { portfolio, date_created, date_updated, ...rest } = data;
	return rest;
};

const extractFileReference = (file: string | DirectusFile): FileReference => {
	if (typeof file === 'string') {
		return { filename_disk: file };
	}
	return { filename_disk: file.filename_disk };
};

const sanitizeRecentWorksData = (
	junction: CMSRecentWorksProjectJunction,
): ProjectData => {
	const projectData = junction.project_id;
	const sanitizedProjectData = sanitizeData(projectData);
	const flattenedProjectTechnologies = flatSkills(projectData.technologies);
	const thumbnail = extractFileReference(projectData.thumbnail);

	return {
		...sanitizedProjectData,
		technologies: flattenedProjectTechnologies,
		thumbnail: thumbnail.filename_disk,
	};
};

const getPageData = (cmsData: CMSPortfolioData): PageData => {
	const headerData = cmsData.header[0];
	const headerNavigation: NavigationItem[] =
		headerData.page_navigation[0].navigation_id.items;
	const headerSocials: NavigationItem[] =
		headerData.socials_navigation[0].navigation_id.items;

	const heroData = cmsData.hero[0];
	const sanitizedHeroData = sanitizeData(heroData);
	const heroSkills = flatSkills(heroData.skills);
	const heroFile = extractFileReference(heroData.download_btn_file);

	const aboutData = cmsData.about[0];
	const sanitizedAboutData = sanitizeData(aboutData);
	const aboutSkills = flatSkills(aboutData.skills);
	const profilePhoto = extractFileReference(aboutData.profile_photo);

	const recentWorksData = cmsData.recent_works[0];
	const sanitizedRecentWorksData = sanitizeData(recentWorksData);
	const sanitizedProjects = (
		recentWorksData.projects as CMSRecentWorksProjectJunction[]
	).map((project) => sanitizeRecentWorksData(project));

	const journeyData = cmsData.my_journey[0];
	const sanitizedJourneyData = sanitizeData(journeyData);

	const contactData = cmsData.contact[0];
	const sanitizedContactData = sanitizeData(contactData);
	const { form_message_placholder, ...restContactData } =
		sanitizedContactData as any;
	const fixedContactData = {
		...restContactData,
		form_message_placeholder: form_message_placholder,
	};

	const footerData = cmsData.footer[0];
	const sanitizedFooterData = sanitizeData(footerData);

	const finalData: PageData = {
		header: {
			navigation: headerNavigation,
			socials: headerSocials,
		},
		hero: {
			...sanitizedHeroData,
			skills: heroSkills,
			download_btn_file: heroFile,
		} as HeroData,
		about: {
			...sanitizedAboutData,
			skills: aboutSkills,
			profile_photo: profilePhoto,
		} as AboutData,
		recentWorks: {
			...sanitizedRecentWorksData,
			projects: sanitizedProjects,
		} as RecentWorksData,
		myJourney: {
			...sanitizedJourneyData,
		} as MyJourneyData,
		contact: {
			...fixedContactData,
		} as ContactData,
		footer: {
			...sanitizedFooterData,
			navigation: headerNavigation,
			socials: headerSocials,
		} as FooterData,
	};

	return finalData;
};

export default getPageData;
