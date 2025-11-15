export interface NavigationItem {
	id: string;
	label: string;
	path: string;
	icon: string;
	order: number;
}

export interface FileReference {
	filename_disk: string;
}

export interface HeaderData {
	navigation: NavigationItem[];
	socials: NavigationItem[];
}

export interface HeroData {
	id: string;
	title: string;
	page_title: string;
	subtext: string;
	subtext_2: string;
	skills: string[];
	download_btn_title: string;
	download_btn_file: FileReference;
	contact_btn_title: string;
	contact_btn_path: string;
}

export interface Highlight {
	title: string;
	description: string;
	icon: 'Laptop' | 'Rocket' | 'Cloud' | 'GraduationCap';
}

export interface AboutData {
	id: string;
	title: string;
	page_title: string;
	subtext: string;
	profile_photo: FileReference;
	position: string;
	description_1: string;
	description_2: string;
	highlights: Highlight[];
	skills_title: string;
	skills: string[];
}

export interface ProjectTechnicalDetail {
	title: string;
	description: string;
}

export interface ProjectData {
	id: string;
	title: string;
	slug: string;
	short_description: string;
	long_description: string;
	thumbnail: string;
	technologies: string[];
	technologies_title: string;
	technical_details: ProjectTechnicalDetail[];
	status: 'live' | 'development';
	live_url: string;
}

export interface RecentWorksData {
	id: string;
	title: string;
	page_title: string;
	subtext: string;
	card_view_title: string;
	card_live_title: string;
	additional_info: string;
	projects: ProjectData[];
}

export interface JourneyItem {
	order: number;
	title: string;
	dates: string;
	description: string;
}

export interface MyJourneyData {
	id: string;
	title: string;
	page_title: string;
	subtext: string;
	journey_items: JourneyItem[];
}

export interface AvailabilityItem {
	title: string;
	is_available: boolean;
}

export interface ContactData {
	id: string;
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
	form_message_placeholder: string;
	form_btn_text: string;
	form_btn_loading_text: string;
	contact_box_title: string;
	contact_box_call_btn_title: string;
	contact_box_resume_btn_title: string;
	contact_box_resume_btn_file: string;
	get_in_touch_title: string;
	availability_title: string;
	availability_subtext: string;
	availability_items: AvailabilityItem[];
	location_title: string;
	location: string;
}

export interface FooterData {
	id: string;
	title: string;
	footer_subtext: string;
	btt_btn_title: string;
	availability_text: string;
	location: string;
	navigation: NavigationItem[];
	socials: NavigationItem[];
}

export interface PageData {
	header: HeaderData;
	hero: HeroData;
	about: AboutData;
	recentWorks: RecentWorksData;
	myJourney: MyJourneyData;
	contact: ContactData;
	footer: FooterData;
}
