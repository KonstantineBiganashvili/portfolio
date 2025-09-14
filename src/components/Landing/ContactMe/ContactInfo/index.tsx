'use client';

import React, { useState, useEffect } from 'react';
import { PopupModal } from 'react-calendly';
import DownloadResume from '@/components/common/DownloadResume';
import styles from './contactInfo.module.css';
import Link from 'next/link';
import { Github, Linkedin, Mail, MapPin, Phone } from 'lucide-react';

interface ContactInfoProps {
	calendlyUrl: string;
}

function ContactInfo({ calendlyUrl }: ContactInfoProps) {
	const [isMounted, setIsMounted] = useState(false);
	const [isCalendlyOpen, setIsCalendlyOpen] = useState(false);

	useEffect(() => {
		setIsMounted(true);
	}, []);

	return (
		<div className={styles.contactInfoWrapper}>
			<div className={styles.contactInfo}>
				<div className={styles.contactCtaSection}>
					<div className={styles.contactCtaContent}>
						<h2 className={styles.contactCtaTitle}>
							Ready to Start Something Amazing?
						</h2>
					</div>
					<div className={styles.contactCtaButtons}>
						{isMounted ? (
							<button
								className={styles.calendlyButtonWrapper}
								onClick={() => setIsCalendlyOpen(true)}
							>
								<Phone size={16} />
								Schedule a Call
							</button>
						) : (
							<button className={styles.contactScheduleButton} disabled>
								<Phone size={16} />
								Schedule a Call
							</button>
						)}
						<DownloadResume className={styles.contactResumeButton} />
					</div>
				</div>
			</div>

			<div className={styles.contactInfo}>
				<h3 className={styles.infoTitle}>Get in Touch</h3>
				<div className={styles.contactDetails}>
					<div className={styles.contactItem}>
						<div className={styles.contactIcon}>
							<Mail size={24} />
						</div>
						<div className={styles.contactContent}>
							<span className={styles.contactLabel}>Email</span>
							<Link
								href='mailto:contact@biganashvili.dev'
								className={styles.contactValue}
							>
								contact@biganashvili.dev
							</Link>
						</div>
					</div>

					<div className={styles.contactItem}>
						<div className={styles.contactIcon}>
							<MapPin size={24} />
						</div>
						<div className={styles.contactContent}>
							<span className={styles.contactLabel}>Location</span>
							<span className={styles.contactValue}>Tbilisi, Georgia</span>
						</div>
					</div>
				</div>
			</div>
			<div className={styles.contactInfo}>
				<div className={styles.socialSection}>
					<h4 className={styles.socialTitle}>Follow Me</h4>
					<div className={styles.socialLinks}>
						<Link
							href='https://github.com/KonstantineBiganashvili'
							target='_blank'
							rel='noopener noreferrer'
							className={styles.socialLink}
							title='GitHub'
						>
							<Github size={24} />
						</Link>
						<Link
							href='https://www.linkedin.com/in/konstantine-biganashvili-553a20246/'
							target='_blank'
							rel='noopener noreferrer'
							className={styles.socialLink}
							title='LinkedIn'
						>
							<Linkedin size={24} />
						</Link>
					</div>
				</div>
			</div>

			{isMounted && (
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
