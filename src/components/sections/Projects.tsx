import Link from 'next/link';
import { Command } from '@/components/console/Command';
import { StatusPill, type Tone } from '@/components/console/StatusPill';
import { Tags } from '@/components/console/Tags';
import type { Project, ProjectStatus } from '@/lib/content/types';
import styles from './sections.module.css';

export const STATUS_TONE: Record<ProjectStatus, Tone> = {
	running: 'ok',
	shipped: 'idle',
	'in development': 'warn',
	archived: 'idle',
};

/** Projects are described, never linked out: the only links go to the case studies on this site. */
export function Projects({ projects }: { projects: Project[] }) {
	const featured = projects.filter((p) => p.featured);
	if (featured.length === 0) return null;
	return (
		<section id='projects' aria-labelledby='projects-title' className={`shell ${styles.section}`}>
			<Command id='projects-title' command='kubectl get' resource='projects' />
			<ol className={styles.projects}>
				{featured.map((p) => (
					<li key={p.slug} className={styles.project}>
						<div className={styles.projectMeta}>
							<h3 className={styles.projectName}>
								<Link href={`/projects/${p.slug}`}>{p.name}</Link>
							</h3>
							<StatusPill tone={STATUS_TONE[p.status]}>{p.status}</StatusPill>
							<p className={styles.projectContext}>
								{p.context}
								{p.context && p.period ? ', ' : ''}
								{p.period}
							</p>
						</div>
						<div className={styles.projectBody}>
							<p className={styles.projectTagline}>{p.tagline}</p>
							<p className={styles.projectSummary}>{p.summary}</p>
							<Tags items={p.stack.flatMap((g) => g.items).slice(0, 8)} label={`${p.name} stack`} />
							<p className={styles.readMore} aria-hidden='true'>
								<span className={styles.promptChar}>$</span> kubectl describe project {p.slug}
							</p>
						</div>
					</li>
				))}
			</ol>
		</section>
	);
}
