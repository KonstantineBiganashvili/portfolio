import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Command } from '@/components/console/Command';
import { StatusPill } from '@/components/console/StatusPill';
import { Markdown } from '@/components/Markdown';
import { TopologyDiagram } from '@/components/projects/Topology';
import styles from '@/components/projects/projects.module.css';
import { STATUS_TONE } from '@/components/sections/Projects';
import { getContent, getProject } from '@/lib/content';

type Params = Promise<{ slug: string }>;

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
	const project = await getProject((await params).slug);
	if (!project) return { title: 'Project not found' };
	return {
		title: project.name,
		description: project.tagline || project.summary,
		alternates: { canonical: `/projects/${project.slug}` },
		openGraph: { title: project.name, description: project.tagline || project.summary },
	};
}

export default async function ProjectPage({ params }: { params: Params }) {
	const { slug } = await params;
	const { projects } = await getContent();
	const index = projects.findIndex((p) => p.slug === slug);
	const project = projects[index];
	if (!project) notFound();
	const next = projects.length > 1 ? projects[(index + 1) % projects.length] : null;

	const facts = [
		['Name', project.name],
		['Status', null],
		['Context', project.context],
		['Period', project.period],
		['Role', project.role],
	] as const;

	return (
		<article className={`shell ${styles.page}`}>
			<Link href='/#projects' className={styles.back}>
				cd ..<span className='sr-only'> back to all projects</span>
			</Link>
			<Command level={1} command='kubectl describe project' resource={project.name} />

			<dl className={styles.describe}>
				{facts.map(([key, value]) =>
					key === 'Status' ? (
						<div key={key} style={{ display: 'contents' }}>
							<dt>{key}:</dt>
							<dd>
								<StatusPill tone={STATUS_TONE[project.status]}>{project.status}</StatusPill>
							</dd>
						</div>
					) : value ? (
						<div key={key} style={{ display: 'contents' }}>
							<dt>{key}:</dt>
							<dd>{value}</dd>
						</div>
					) : null,
				)}
			</dl>

			{project.tagline ? <p className={styles.lead}>{project.tagline}</p> : null}
			{project.summary ? <p className={styles.summary}>{project.summary}</p> : null}

			{project.topology ? (
				<section className={styles.block} aria-labelledby='architecture'>
					<h2 id='architecture' className={styles.blockTitle}>
						<span aria-hidden='true'>## </span>Architecture
					</h2>
					<TopologyDiagram topology={project.topology} title={`${project.name} architecture`} />
				</section>
			) : null}

			{project.highlights.length > 0 ? (
				<section className={styles.block} aria-labelledby='highlights'>
					<h2 id='highlights' className={styles.blockTitle}>
						<span aria-hidden='true'>## </span>Highlights
					</h2>
					<dl className={styles.highlightList}>
						{project.highlights.map((h, i) => (
							<div key={`${i}-${h.title}`}>
								<dt>{h.title}</dt>
								<dd>{h.body}</dd>
							</div>
						))}
					</dl>
				</section>
			) : null}

			{project.body ? (
				<section className={`${styles.block} ${styles.article}`} aria-label='Case study'>
					<Markdown>{project.body}</Markdown>
				</section>
			) : null}

			{project.stack.length > 0 ? (
				<section className={styles.block} aria-labelledby='stack'>
					<h2 id='stack' className={styles.blockTitle}>
						<span aria-hidden='true'>## </span>Stack
					</h2>
					<dl className={styles.stack}>
						{project.stack.map((g, i) => (
							<div key={`${i}-${g.group}`}>
								<dt>{g.group.toLowerCase()}:</dt>
								<dd>{g.items.join(', ')}</dd>
							</div>
						))}
					</dl>
				</section>
			) : null}

			<nav className={styles.next} aria-label='More projects'>
				<Link href='/#projects'>cd ..</Link>
				{next && next.slug !== project.slug ? <Link href={`/projects/${next.slug}`}>next: {next.name}</Link> : null}
			</nav>
		</article>
	);
}
