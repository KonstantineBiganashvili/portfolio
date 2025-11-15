export interface CMSBaseFields {
	id: string;
	date_created: string;
	date_updated: string | null;
}

export interface DirectusFile {
	id: string;
	filename_disk: string;
	filename_download?: string;
	title?: string | null;
	type?: string | null;
}

export interface CMSSkill {
	name: string;
}

export interface CMSNavigationItem {
	id: string;
	label: string;
	path: string;
	icon: string;
	order: number;
}

export interface CMSNavigation {
	id: string;
	items: CMSNavigationItem[];
}

export interface CMSPageNavigationJunction {
	id: number;
	portfolio_header_id: string;
	navigation_id: CMSNavigation;
}

export interface CMSSocialsNavigationJunction {
	id: number;
	portfolio_header_id: string;
	navigation_id: CMSNavigation;
}

export interface CMSHeader extends CMSBaseFields {
	title: string;
	portfolio: string;
	page_navigation: CMSPageNavigationJunction[];
	socials_navigation: CMSSocialsNavigationJunction[];
}

export interface CMSHero extends CMSBaseFields {
	title: string;
	page_title: string;
	subtext: string;
	subtext_2: string;
	skills: CMSSkill[];
	download_btn_title: string;
	download_btn_file: string | DirectusFile;
	contact_btn_title: string;
	contact_btn_path: string;
	portfolio: string;
}

export interface CMSHighlight {
	title: string;
	description: string;
	icon: 'Laptop' | 'Rocket' | 'Cloud' | 'GraduationCap';
}

export interface CMSAbout extends CMSBaseFields {
	title: string;
	page_title: string;
	subtext: string;
	profile_photo: string | DirectusFile;
	position: string;
	description_1: string;
	description_2: string;
	highlights: CMSHighlight[];
	skills_title: string;
	skills: CMSSkill[];
	portfolio: string;
}

export interface CMSProjectTechnicalDetail {
	title: string;
	description: string;
}

export interface CMSProject extends CMSBaseFields {
	title: string;
	slug: string;
	short_description: string;
	long_description: string;
	thumbnail: string | DirectusFile;
	technologies: CMSSkill[];
	technologies_title: string;
	technical_details: CMSProjectTechnicalDetail[];
	status: 'live' | 'development';
	live_url: string;
}

export interface CMSRecentWorksProjectJunction {
	id: number;
	recent_works_id: number;
	project_id: CMSProject;
}

export interface CMSRecentWorks extends CMSBaseFields {
	title: string;
	page_title: string;
	subtext: string;
	card_view_title: string;
	card_live_title: string;
	additional_info: string;
	portfolio: string;
	projects: number[] | CMSRecentWorksProjectJunction[];
}

export interface CMSJourneyItem {
	order: number;
	title: string;
	dates: string;
	description: string;
}

export interface CMSMyJourney extends CMSBaseFields {
	title: string;
	page_title: string;
	subtext: string;
	journey_items: CMSJourneyItem[];
	portfolio: string;
}

export interface CMSAvailabilityItem {
	title: string;
	is_available: boolean;
}

export interface CMSContact extends CMSBaseFields {
	title: string;
	page_title: string;
	subtext: string;
	form_title: string;
	form_subtext: string;
	form_name_title: string;
	form_name_placeholder: string;
	form_email_title: string;
	form_email_placeholder: string;
	form_subject_title: string;
	form_subject_placeholder: string;
	form_message_title: string;
	form_message_placholder: string;
	form_btn_text: string;
	form_btn_loading_text: string;
	contact_box_title: string;
	contact_box_call_btn_title: string;
	contact_box_resume_btn_title: string;
	contact_box_resume_btn_file: string | DirectusFile;
	get_in_touch_title: string;
	availability_title: string;
	availability_subtext: string;
	availability_items: CMSAvailabilityItem[];
	location_title: string;
	location: string;
	portfolio: string;
}

export interface CMSFooter extends CMSBaseFields {
	title: string;
	footer_subtext: string;
	btt_btn_title: string;
	availability_text: string;
	location: string;
	portfolio: string;
}

export interface CMSPortfolioData extends CMSBaseFields {
	title: string;
	slug: string;
	header: CMSHeader[];
	hero: CMSHero[];
	about: CMSAbout[];
	recent_works: CMSRecentWorks[];
	my_journey: CMSMyJourney[];
	contact: CMSContact[];
	footer: CMSFooter[];
}

export interface CMSPortfolioResponse {
	data: CMSPortfolioData[];
}
