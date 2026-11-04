/** Shapes as returned by the Directus REST API. Everything is optional/nullable: never trust CMS data. */

type Maybe<T> = T | null | undefined;

export interface RawProfile {
	full_name?: Maybe<string>;
	headline?: Maybe<string>;
	tagline?: Maybe<string>;
	summary?: Maybe<string>;
	location?: Maybe<string>;
	timezone?: Maybe<string>;
	email?: Maybe<string>;
	calendly_url?: Maybe<string>;
	available?: Maybe<boolean>;
	status_text?: Maybe<string>;
	availability?: Maybe<unknown>;
	socials?: Maybe<unknown>;
	stats?: Maybe<unknown>;
	resume?: Maybe<string>;
	photo?: Maybe<string>;
	seo_title?: Maybe<string>;
	seo_description?: Maybe<string>;
}

interface RawOrdered {
	id: number;
	sort?: Maybe<number>;
	visible?: Maybe<boolean>;
}

export interface RawExperience extends RawOrdered {
	company?: Maybe<string>;
	role?: Maybe<string>;
	start_date?: Maybe<string>;
	end_date?: Maybe<string>;
	location?: Maybe<string>;
	employment?: Maybe<string>;
	summary?: Maybe<string>;
	highlights?: Maybe<unknown>;
	stack?: Maybe<unknown>;
}

export interface RawEducation extends RawOrdered {
	institution?: Maybe<string>;
	degree?: Maybe<string>;
	start_date?: Maybe<string>;
	end_date?: Maybe<string>;
	notes?: Maybe<string>;
}

export interface RawProject extends RawOrdered {
	slug?: Maybe<string>;
	name?: Maybe<string>;
	tagline?: Maybe<string>;
	context?: Maybe<string>;
	period?: Maybe<string>;
	role?: Maybe<string>;
	status?: Maybe<string>;
	summary?: Maybe<string>;
	body?: Maybe<string>;
	highlights?: Maybe<unknown>;
	stack?: Maybe<unknown>;
	topology?: Maybe<unknown>;
	featured?: Maybe<boolean>;
}

export interface RawSkillGroup extends RawOrdered {
	name?: Maybe<string>;
	items?: Maybe<unknown>;
}

export interface RawContent {
	profile: RawProfile | null;
	experience: RawExperience[];
	education: RawEducation[];
	projects: RawProject[];
	skills: RawSkillGroup[];
}
