import { Command } from '@/components/console/Command';
import type { Education as EducationEntry } from '@/lib/content/types';
import { formatYearMonth } from '@/lib/format/dates';
import styles from './sections.module.css';

export function Education({ education }: { education: EducationEntry[] }) {
	if (education.length === 0) return null;
	return (
		<section id='education' aria-labelledby='education-title' className={`shell ${styles.section}`}>
			<Command id='education-title' command='tail' resource='education.log' />
			<ol className={styles.log}>
				{education.map((e) => (
					<li key={e.id}>
						<span className={styles.logTime}>
							{[formatYearMonth(e.start), formatYearMonth(e.end)].filter(Boolean).join(' → ')}
						</span>
						<span className={styles.logText}>
							<strong>{e.degree}</strong>
							<span className={styles.logSource}>{e.institution}</span>
						</span>
					</li>
				))}
			</ol>
		</section>
	);
}
