'use client';

import React from 'react';
import styles from './introduction.module.css';
import BuildingWebsite from '@/components/common/svgs/BuildingWebsite';
import Badge from '@/components/common/Badge';
import ContactButton from '@/components/common/ContactButton';
import DownloadResume from '@/components/common/DownloadResume';
import { Handshake } from 'lucide-react';
import { usePortfolio } from '@/contexts/PortfolioContext';

function Introduction() {
	const {
		pageData: { hero },
	} = usePortfolio();

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
					<h1>{hero.page_title}</h1>
					<p className={styles.description}>{hero.subtext}</p>
					<p className={styles.availability}>{hero.subtext_2}</p>
					<div className={styles.techBadges}>
						{hero.skills.map((badge) => (
							<Badge key={badge} variant='secondary'>
								{badge}
							</Badge>
						))}
					</div>
					<div className={styles.divider} />
					<div className={styles.contactButtons}>
						<DownloadResume path={hero.download_btn_file.filename_disk}>
							{hero.download_btn_title}
						</DownloadResume>
						<ContactButton onClick={scrollToContact}>
							<Handshake size={16} />
							{hero.contact_btn_title}
						</ContactButton>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Introduction;
