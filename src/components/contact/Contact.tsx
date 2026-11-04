import { Command } from '@/components/console/Command';
import { SocialIcon } from '@/components/console/Icon';
import { StatusPill } from '@/components/console/StatusPill';
import type { Profile } from '@/lib/content/types';
import { ContactForm } from './ContactForm';
import styles from './contact.module.css';

interface ContactProps {
	profile: Profile;
	formEndpoint: string;
	formAccessKey: string;
}

export function Contact({ profile, formEndpoint, formAccessKey }: ContactProps) {
	const links = profile.socials.filter((s) => s.kind !== 'email');
	return (
		<section id='contact' aria-labelledby='contact-title' className={`shell ${styles.section}`}>
			<Command id='contact-title' command='kubectl exec -it' resource='contact' flags='-- sh' />
			<div className={styles.grid}>
				<div className={styles.intro}>
					<p className={styles.status}>
						<StatusPill tone={profile.available ? 'ok' : 'idle'}>{profile.available ? 'open to work' : 'not looking'}</StatusPill>
						{profile.statusText ? <span>{profile.statusText}</span> : null}
					</p>
					{profile.availability.length > 0 ? (
						<ul className={styles.availability} aria-label='Availability'>
							{profile.availability.map((a) => (
								<li key={a.label} data-available={a.available}>
									<span aria-hidden='true'>{a.available ? '✓' : '✗'}</span> {a.label}
									<span className='sr-only'>{a.available ? ': available' : ': not available'}</span>
								</li>
							))}
						</ul>
					) : null}
					{profile.email ? (
						<a className={styles.email} href={`mailto:${profile.email}`}>
							{profile.email}
						</a>
					) : null}
					<div className={styles.actions}>
						{profile.calendlyUrl ? (
							<a className={styles.action} href={profile.calendlyUrl} target='_blank' rel='noopener noreferrer'>
								Book a 30-minute call
							</a>
						) : null}
						{profile.resumeFileId ? (
							<a className={styles.action} href='/cv' download>
								Download CV
							</a>
						) : null}
					</div>
					{links.length > 0 ? (
						<ul className={styles.socials} aria-label='Profiles'>
							{links.map((s) => (
								<li key={s.url}>
									<a href={s.url} target='_blank' rel='noopener noreferrer'>
										<SocialIcon kind={s.kind} />
										{s.label}
									</a>
								</li>
							))}
						</ul>
					) : null}
				</div>
				<ContactForm endpoint={formEndpoint} accessKey={formAccessKey} fallbackEmail={profile.email} />
			</div>
		</section>
	);
}
