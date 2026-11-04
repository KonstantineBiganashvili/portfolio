import { SocialIcon } from '@/components/console/Icon';
import type { Profile } from '@/lib/content/types';
import { FALLBACK } from '@/lib/site';
import styles from './layout.module.css';

export function Footer({ profile, buildSha }: { profile: Profile | null; buildSha: string }) {
	const year = new Date().getFullYear();
	const socials = profile?.socials ?? [];
	return (
		<footer className={styles.footer}>
			<div className={`shell ${styles.footerInner}`}>
				<p className={styles.build}>
					<span className={styles.buildKey}>build</span> {buildSha.slice(0, 12)}
					<span className={styles.buildSep} aria-hidden='true'>
						{' '}
						/{' '}
					</span>
					shipped by commit, synced by ArgoCD
				</p>
				{socials.length > 0 ? (
					<ul className={styles.socials} aria-label='Elsewhere'>
						{socials.map((s, i) => (
							<li key={`${i}-${s.url}`}>
								<a href={s.url} {...(s.kind === 'email' ? {} : { target: '_blank', rel: 'noopener noreferrer' })}>
									<SocialIcon kind={s.kind} size={16} />
									<span>{s.label}</span>
								</a>
							</li>
						))}
					</ul>
				) : null}
				<p className={styles.copy}>
					© {year} {profile?.fullName || FALLBACK.name}
				</p>
			</div>
		</footer>
	);
}
