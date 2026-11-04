import { Command } from '@/components/console/Command';
import { StatusPill } from '@/components/console/StatusPill';
import { Tags } from '@/components/console/Tags';
import type { Experience } from '@/lib/content/types';
import { durationLabel, formatPeriod } from '@/lib/format/dates';
import styles from './sections.module.css';

export function ExperienceSection({ experience, now = new Date() }: { experience: Experience[]; now?: Date }) {
	if (experience.length === 0) return null;
	return (
		<section id='experience' aria-labelledby='experience-title' className={`shell ${styles.section}`}>
			<Command id='experience-title' command='kubectl get' resource='experience' flags='-o wide' />
			<div className={styles.table}>
				<div className={`${styles.row} ${styles.headRow}`} aria-hidden='true'>
					<span>COMPANY</span>
					<span>ROLE</span>
					<span>PERIOD</span>
					<span>AGE</span>
					<span>STATUS</span>
				</div>
				{experience.map((e, i) => (
					<details key={e.id} className={styles.entry} open={i === 0}>
						<summary className={styles.row}>
							<span className={styles.company}>{e.company}</span>
							<span className={styles.role}>{e.role}</span>
							<span className={styles.period}>{formatPeriod(e.start, e.end)}</span>
							<span className={styles.age}>{durationLabel(e.start, e.end, now)}</span>
							<span className={styles.status}>
								<StatusPill tone={e.current ? 'ok' : 'idle'}>{e.current ? 'Running' : 'Completed'}</StatusPill>
							</span>
						</summary>
						<div className={styles.entryBody}>
							{e.summary ? <p className={styles.entrySummary}>{e.summary}</p> : null}
							{e.highlights.length > 0 ? (
								<ul className={styles.highlights}>
									{e.highlights.map((h, i) => (
										<li key={`${i}-${h.slice(0, 32)}`}>{h}</li>
									))}
								</ul>
							) : null}
							<Tags items={e.stack} label={`Stack at ${e.company}`} />
						</div>
					</details>
				))}
			</div>
		</section>
	);
}
