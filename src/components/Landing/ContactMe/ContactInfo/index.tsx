'use client';

import { useState } from 'react';
import { PopupModal } from 'react-calendly';
import DownloadResume from '@/components/common/DownloadResume';
import styles from './contactInfo.module.css';
import Link from 'next/link';
import { Github, Linkedin, Mail, MapPin, Phone } from 'lucide-react';
import { usePortfolio } from '@/contexts/PortfolioContext';

const icons = {
	GitHub: Github,
	Linkedin: Linkedin,
};

interface ContactInfoProps {
	calendlyUrl: string;
}

function ContactInfo({ calendlyUrl }: ContactInfoProps) {
	const [isCalendlyOpen, setIsCalendlyOpen] = useState(false);

	const {
		pageData: {
			contact,
			hero: { download_btn_file },
			header: { socials },
		},
	} = usePortfolio();

	const mail = socials.find((social) => social.label === 'Mail');
	const contactSocials = socials.filter((social) => social.label !== 'Mail');

	return (
		<div className={styles.contactInfoWrapper}>
			<div className={styles.contactInfo}>
				<div className={styles.contactCtaSection}>
					<div className={styles.contactCtaContent}>
						<h2 className={styles.contactCtaTitle}>
							{contact.contact_box_title}
						</h2>
					</div>
					<div className={styles.contactCtaButtons}>
						<button
							className={styles.calendlyButtonWrapper}
							onClick={() => setIsCalendlyOpen(true)}
						>
							<Phone size={16} />
							{contact.contact_box_call_btn_title}
						</button>
						<DownloadResume
							className={styles.contactResumeButton}
							path={download_btn_file.filename_disk}
						>
							{contact.contact_box_resume_btn_title}
						</DownloadResume>
					</div>
				</div>
			</div>

			<div className={styles.contactInfo}>
				<h3 className={styles.infoTitle}>{contact.get_in_touch_title}</h3>
				<div className={styles.contactDetails}>
					{mail && (
						<div className={styles.contactItem}>
							<div className={styles.contactIcon}>
								<Mail size={24} />
							</div>
							<div className={styles.contactContent}>
								<span className={styles.contactLabel}>{mail.label}</span>
								<Link href={mail.path} className={styles.contactValue}>
									{mail.path.split(':')[1]}
								</Link>
							</div>
						</div>
					)}

					<div className={styles.contactItem}>
						<div className={styles.contactIcon}>
							<MapPin size={24} />
						</div>
						<div className={styles.contactContent}>
							<span className={styles.contactLabel}>
								{contact.location_title}
							</span>
							<span className={styles.contactValue}>{contact.location}</span>
						</div>
					</div>
				</div>
			</div>
			<div className={styles.contactInfo}>
				<div className={styles.socialSection}>
					<h4 className={styles.socialTitle}>Follow Me</h4>
					<div className={styles.socialLinks}>
						{contactSocials.map((social) => {
							const IconComponent = icons[social.icon as keyof typeof icons];

							return (
								<Link
									key={social.label}
									href={social.path}
									target='_blank'
									rel='noopener noreferrer'
									className={styles.socialLink}
									title={social.label}
								>
									<IconComponent size={24} />
								</Link>
							);
						})}
					</div>
				</div>
			</div>

			{isCalendlyOpen && (
				<PopupModal
					url={calendlyUrl}
					onModalClose={() => setIsCalendlyOpen(false)}
					open={isCalendlyOpen}
					rootElement={document.getElementById('__next') || document.body}
					pageSettings={{
						hideEventTypeDetails: false,
						hideLandingPageDetails: false,
					}}
				/>
			)}
		</div>
	);
}

export default ContactInfo;
