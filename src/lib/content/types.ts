/** View models the UI renders. Produced from raw CMS data by `toSiteContent`. */

export type SocialKind = 'linkedin' | 'github' | 'email' | 'other';

export interface Social {
	label: string;
	kind: SocialKind;
	url: string;
}

export interface Stat {
	value: string;
	label: string;
	detail: string | null;
}

export interface Availability {
	label: string;
	available: boolean;
}

export interface Profile {
	fullName: string;
	headline: string;
	tagline: string;
	summary: string;
	location: string;
	timezone: string;
	email: string;
	calendlyUrl: string | null;
	available: boolean;
	statusText: string;
	availability: Availability[];
	socials: Social[];
	stats: Stat[];
	resumeFileId: string | null;
	photoUrl: string | null;
	seoTitle: string;
	seoDescription: string;
}

export interface Experience {
	id: number;
	company: string;
	role: string;
	start: string;
	end: string | null;
	current: boolean;
	location: string | null;
	employment: string | null;
	summary: string;
	highlights: string[];
	stack: string[];
}

export interface Education {
	id: number;
	institution: string;
	degree: string;
	start: string | null;
	end: string | null;
}

export type NodeKind = 'client' | 'service' | 'data' | 'external' | 'infra';

export interface TopologyNode {
	id: string;
	label: string;
	kind: NodeKind;
}

export interface TopologyEdge {
	from: string;
	to: string;
	label: string | null;
}

export interface Topology {
	nodes: TopologyNode[];
	edges: TopologyEdge[];
}

export interface StackGroup {
	group: string;
	items: string[];
}

export interface Highlight {
	title: string;
	body: string;
}

export type ProjectStatus = 'shipped' | 'running' | 'in development' | 'archived';

export interface Project {
	id: number;
	slug: string;
	name: string;
	tagline: string;
	context: string;
	period: string;
	role: string;
	status: ProjectStatus;
	summary: string;
	body: string;
	highlights: Highlight[];
	stack: StackGroup[];
	topology: Topology | null;
	featured: boolean;
}

export interface SkillGroup {
	id: number;
	name: string;
	items: string[];
}

export interface SiteContent {
	profile: Profile;
	experience: Experience[];
	education: Education[];
	projects: Project[];
	skills: SkillGroup[];
}
