import Image from 'next/image';
import { Command } from '@/components/console/Command';
import { Markdown } from '@/components/Markdown';
import type { Experience, Profile } from '@/lib/content/types';
import { yearsSince } from '@/lib/format/dates';
import styles from './sections.module.css';

interface AboutProps {
	profile: Profile;
	experience: Experience[];
	now?: Date;
}

export function About({ profile, experience, now = new Date() }: AboutProps) {
	const earliest = experience.map((e) => e.start).sort()[0];
	const metrics = [
		...(earliest ? [{ label: 'years in tech', value: String(yearsSince(earliest, now)), detail: `since ${earliest.slice(0, 4)}` }] : []),
		...profile.stats.map((s) => ({ label: s.label, value: s.value, detail: s.detail })),
	];

	return (
		<section id='about' aria-labelledby='about-title' className={`shell ${styles.section}`}>
			<Command id='about-title' command='cat' resource='about.md' />
			<div className={styles.aboutGrid}>
				<div className={styles.prose}>
					<Markdown>{profile.summary}</Markdown>
				</div>
				{profile.photoUrl ? (
					<figure className={styles.portrait}>
						{/* unoptimized: the browser loads it straight from the CMS. Next's optimiser would fetch it from
						    the server, and the CDN challenges server-to-server traffic. */}
						<Image src={profile.photoUrl} alt={`Portrait of ${profile.fullName}`} width={320} height={320} unoptimized />
					</figure>
				) : null}
			</div>

			{metrics.length > 0 ? (
				<div className={styles.output}>
					<p className={styles.subcommand} aria-hidden='true'>
						<span className={styles.promptChar}>$</span> kubectl top engineer
					</p>
					<table className={styles.metrics}>
						<caption className='sr-only'>Key numbers</caption>
						<thead>
							<tr>
								<th scope='col'>METRIC</th>
								<th scope='col'>VALUE</th>
								<th scope='col' className={styles.hideNarrow}>
									NOTE
								</th>
							</tr>
						</thead>
						<tbody>
							{metrics.map((m) => (
								<tr key={m.label}>
									<th scope='row'>{m.label}</th>
									<td className={styles.metricValue}>{m.value}</td>
									<td className={styles.hideNarrow}>{m.detail}</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			) : null}
		</section>
	);
}
