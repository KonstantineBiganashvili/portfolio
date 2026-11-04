import { Fragment } from 'react';
import { Command } from '@/components/console/Command';
import type { SkillGroup } from '@/lib/content/types';
import styles from './sections.module.css';

/** Skills as the values file of a Helm release: one key per group. */
export function Skills({ skills }: { skills: SkillGroup[] }) {
	if (skills.length === 0) return null;
	return (
		<section id='skills' aria-labelledby='skills-title' className={`shell ${styles.section}`}>
			<Command id='skills-title' command='helm get values' resource='skills' />
			<dl className={styles.values}>
				{skills.map((g) => (
					<div key={g.id} className={styles.valueRow}>
						<dt>{g.name.toLowerCase()}:</dt>
						<dd>
							<span className={styles.bracket} aria-hidden='true'>
								[
							</span>
							{g.items.map((item, i) => (
								<Fragment key={`${i}-${item}`}>
									<span className={styles.valueItem}>{item}</span>
									{i < g.items.length - 1 ? (
										<span className={styles.bracket} aria-hidden='true'>
											,{' '}
										</span>
									) : null}
								</Fragment>
							))}
							<span className={styles.bracket} aria-hidden='true'>
								]
							</span>
						</dd>
					</div>
				))}
			</dl>
		</section>
	);
}
