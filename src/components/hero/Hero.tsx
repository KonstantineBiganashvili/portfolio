import { StatusPill } from '@/components/console/StatusPill';
import { SceneMount } from '@/components/scene/SceneMount';
import type { Experience, Profile } from '@/lib/content/types';
import { LocalClock } from './LocalClock';
import styles from './hero.module.css';

interface HeroProps {
	profile: Profile;
	currentRoles: Experience[];
}

export function Hero({ profile, currentRoles }: HeroProps) {
	const [first, ...rest] = profile.fullName.split(' ');
	return (
		<section className={styles.hero} aria-labelledby='hero-name'>
			<SceneMount />
			<div className={`shell ${styles.frame}`}>
				<div className={styles.hudTop}>
					<p className={styles.context}>
						<span className={styles.key}>context</span> biganashvili.dev
					</p>
					<StatusPill tone={profile.available ? 'ok' : 'idle'}>{profile.available ? 'open to work' : 'not looking'}</StatusPill>
				</div>

				<div className={styles.copy}>
					<p className={styles.whoami} aria-hidden='true'>
						<span className={styles.prompt}>$</span> whoami
					</p>
					<h1 id='hero-name' className={styles.name}>
						<span>{first}</span> <span>{rest.join(' ')}</span>
					</h1>
					<p className={styles.headline}>{profile.headline}</p>
					<p className={styles.tagline}>{profile.tagline}</p>
					{currentRoles.length > 0 ? (
						<ul className={styles.roles} aria-label='Currently'>
							{currentRoles.map((r) => (
								<li key={r.id}>
									<span className={styles.running} aria-hidden='true' />
									{r.role} at {r.company}
								</li>
							))}
						</ul>
					) : null}
					<div className={styles.actions}>
						<a href='#projects' className={styles.primary}>
							See the work
						</a>
						{profile.resumeFileId ? (
							<a href='/cv' className={styles.secondary} download>
								Download CV
							</a>
						) : null}
					</div>
				</div>

				<div className={styles.hudBottom}>
					<LocalClock timezone={profile.timezone} location={profile.location} />
					<a href='#about' className={styles.scroll}>
						scroll
						<span className={styles.scrollLine} aria-hidden='true' />
					</a>
				</div>
			</div>
		</section>
	);
}
