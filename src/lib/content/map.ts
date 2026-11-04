import type { RawContent, RawEducation, RawExperience, RawProfile, RawProject, RawSkillGroup } from './raw';
import type {
	Availability,
	Education,
	Experience,
	Highlight,
	NodeKind,
	Profile,
	Project,
	ProjectStatus,
	SiteContent,
	SkillGroup,
	Social,
	SocialKind,
	StackGroup,
	Stat,
	Topology,
	TopologyEdge,
	TopologyNode,
} from './types';

interface MapOptions {
	assetUrl: (fileId: string) => string;
}

type Obj = Record<string, unknown>;

const isObj = (v: unknown): v is Obj => typeof v === 'object' && v !== null && !Array.isArray(v);
const str = (v: unknown): string => (typeof v === 'string' ? v.trim() : '');
const strOrNull = (v: unknown): string | null => str(v) || null;
const list = (v: unknown): unknown[] => (Array.isArray(v) ? v : []);
const strings = (v: unknown): string[] => list(v).map(str).filter(Boolean);

function visibleSorted<T extends { sort?: number | null; visible?: boolean | null }>(rows: T[]): T[] {
	return rows
		.filter((r) => r.visible !== false)
		.map((r, i) => ({ r, i }))
		.sort((a, b) => (a.r.sort ?? Number.MAX_SAFE_INTEGER) - (b.r.sort ?? Number.MAX_SAFE_INTEGER) || a.i - b.i)
		.map(({ r }) => r);
}

const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
/** Directus file ids are UUIDs; anything else is ignored rather than spliced into an asset URL. */
const fileId = (v: unknown): string | null => (UUID.test(str(v)) ? str(v) : null);

/** Only absolute http(s) and mailto links reach an href; everything else from the CMS is dropped. */
function safeUrl(v: unknown): string | null {
	const raw = str(v);
	try {
		const url = new URL(raw);
		return ['https:', 'http:', 'mailto:'].includes(url.protocol) ? raw : null;
	} catch {
		return null;
	}
}

const SOCIAL_KINDS: readonly SocialKind[] = ['linkedin', 'github', 'email'];
const NODE_KINDS: readonly NodeKind[] = ['client', 'service', 'data', 'external', 'infra'];
const STATUSES: readonly ProjectStatus[] = ['shipped', 'running', 'in development', 'archived'];

function mapProfile(p: RawProfile, { assetUrl }: MapOptions): Profile {
	const fullName = str(p.full_name);
	const headline = str(p.headline);
	const availability: Availability[] = list(p.availability)
		.filter(isObj)
		.filter((a) => str(a.label))
		.map((a) => ({ label: str(a.label), available: a.available === true }));
	const socials: Social[] = list(p.socials)
		.filter(isObj)
		.filter((s) => str(s.label) && safeUrl(s.url))
		.map((s) => {
			const kind = str(s.kind) as SocialKind;
			return { label: str(s.label), kind: SOCIAL_KINDS.includes(kind) ? kind : 'other', url: safeUrl(s.url)! };
		});
	const photo = fileId(p.photo);
	const stats: Stat[] = list(p.stats)
		.filter(isObj)
		.filter((s) => str(s.value) && str(s.label))
		.map((s) => ({ value: str(s.value), label: str(s.label), detail: strOrNull(s.detail) }));

	return {
		fullName,
		headline,
		tagline: str(p.tagline),
		summary: str(p.summary),
		location: str(p.location),
		timezone: str(p.timezone) || 'UTC',
		email: str(p.email),
		calendlyUrl: safeUrl(p.calendly_url),
		available: p.available === true,
		statusText: str(p.status_text),
		availability,
		socials,
		stats,
		resumeFileId: fileId(p.resume),
		photoUrl: photo ? assetUrl(photo) : null,
		seoTitle: str(p.seo_title) || [fullName, headline].filter(Boolean).join(' | '),
		seoDescription: str(p.seo_description) || str(p.tagline),
	};
}

function mapExperience(rows: RawExperience[]): Experience[] {
	return visibleSorted(rows)
		.filter((e) => str(e.company) && str(e.role) && str(e.start_date))
		.map((e) => ({
			id: e.id,
			company: str(e.company),
			role: str(e.role),
			start: str(e.start_date),
			end: strOrNull(e.end_date),
			current: !str(e.end_date),
			location: strOrNull(e.location),
			employment: strOrNull(e.employment),
			summary: str(e.summary),
			highlights: list(e.highlights)
				.map((h) => (isObj(h) ? str(h.text) : str(h)))
				.filter(Boolean),
			stack: strings(e.stack),
		}));
}

function mapEducation(rows: RawEducation[]): Education[] {
	return visibleSorted(rows)
		.filter((e) => str(e.institution) && str(e.degree))
		.map((e) => ({
			id: e.id,
			institution: str(e.institution),
			degree: str(e.degree),
			start: strOrNull(e.start_date),
			end: strOrNull(e.end_date),
		}));
}

export function parseTopology(value: unknown): Topology | null {
	let v = value;
	if (typeof v === 'string') {
		try {
			v = JSON.parse(v);
		} catch {
			return null;
		}
	}
	if (!isObj(v) || !Array.isArray(v.nodes)) return null;
	const seen = new Set<string>();
	const nodes: TopologyNode[] = [];
	for (const n of v.nodes.filter(isObj)) {
		const id = str(n.id);
		if (!id || seen.has(id)) continue;
		seen.add(id);
		const kind = str(n.kind) as NodeKind;
		nodes.push({ id, label: str(n.label) || id, kind: NODE_KINDS.includes(kind) ? kind : 'service' });
	}
	if (nodes.length === 0) return null;
	const edges: TopologyEdge[] = list(v.edges)
		.filter(isObj)
		.filter((e) => seen.has(str(e.from)) && seen.has(str(e.to)))
		.map((e) => ({ from: str(e.from), to: str(e.to), label: strOrNull(e.label) }));
	return { nodes, edges };
}

function mapProjects(rows: RawProject[]): Project[] {
	return visibleSorted(rows)
		.filter((p) => str(p.slug) && str(p.name))
		.map((p) => {
			const status = str(p.status) as ProjectStatus;
			const highlights: Highlight[] = list(p.highlights)
				.filter(isObj)
				.filter((h) => str(h.title))
				.map((h) => ({ title: str(h.title), body: str(h.body) }));
			const stack: StackGroup[] = list(p.stack)
				.filter(isObj)
				.map((g) => ({ group: str(g.group), items: strings(g.items) }))
				.filter((g) => g.group && g.items.length);
			return {
				id: p.id,
				slug: str(p.slug),
				name: str(p.name),
				tagline: str(p.tagline),
				context: str(p.context),
				period: str(p.period),
				role: str(p.role),
				status: STATUSES.includes(status) ? status : 'shipped',
				summary: str(p.summary),
				body: str(p.body),
				highlights,
				stack,
				topology: parseTopology(p.topology),
				featured: p.featured !== false,
			};
		});
}

function mapSkills(rows: RawSkillGroup[]): SkillGroup[] {
	return visibleSorted(rows)
		.filter((g) => str(g.name))
		.map((g) => ({ id: g.id, name: str(g.name), items: strings(g.items) }))
		.filter((g) => g.items.length);
}

export function toSiteContent(raw: RawContent, options: MapOptions): SiteContent {
	if (!raw.profile) throw new Error('CMS content is missing the "profile" singleton.');
	return {
		profile: mapProfile(raw.profile, options),
		experience: mapExperience(raw.experience),
		education: mapEducation(raw.education),
		projects: mapProjects(raw.projects),
		skills: mapSkills(raw.skills),
	};
}
