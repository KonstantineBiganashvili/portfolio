'use client';

import React from 'react';
import styles from './introduction.module.css';
import BuildingWebsite from '@/components/common/svgs/BuildingWebsite';
import Badge from '@/components/common/Badge';
import ContactButton from '@/components/common/ContactButton';
import DownloadResume from '@/components/common/DownloadResume';
import { Handshake } from 'lucide-react';
import { techBadges } from '@/constants/introduction';

function Introduction() {
	const scrollToContact = () => {
		const contactSection = document.getElementById('contact');
		if (contactSection) {
			contactSection.scrollIntoView({
				behavior: 'smooth',
				block: 'start',
			});
		}
	};

	return (
		<div className={styles.introductionWrapper} id='introduction'>
			<div className={styles.introductionContent}>
				<BuildingWebsite className={styles.buildingWebsiteSvg} />
				<div className={styles.introductionText}>
					<h1>Hello, I&apos;m Konstantine</h1>
					<p className={styles.description}>
						Software Engineer & DevOps Specialist passionate about building
						scalable applications and immersive digital experiences.
					</p>
					<p className={styles.availability}>
						Open to new opportunities • Let&apos;s build something great!
					</p>
					<div className={styles.techBadges}>
						{techBadges.map((badge) => (
							<Badge key={badge.label} variant={badge.variant}>
								{badge.label}
							</Badge>
						))}
					</div>
					<div className={styles.divider} />
					<div className={styles.contactButtons}>
						<DownloadResume />
						<ContactButton onClick={scrollToContact}>
							<Handshake size={16} />
							Contact Me
						</ContactButton>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Introduction;
