'use client';

import React from 'react';
import styles from './aboutMe.module.css';
import HighlightCard from '@/components/common/HighlightCard';
import SkillBadge from '@/components/common/SkillBadge';
import ProfileAvatar from '@/components/common/ProfileAvatar';
import { usePortfolio } from '@/contexts/PortfolioContext';
import buildCmsUrl from '@/utils/buildCmsUrl';
import { Cloud, GraduationCap, Laptop, Rocket } from 'lucide-react';

const Icons = {
	Laptop: Laptop,
	Rocket: Rocket,
	Cloud: Cloud,
	GraduationCap: GraduationCap,
};

function AboutMe() {
	const {
		pageData: { about },
		cmsUrl,
	} = usePortfolio();

	const profilePicturePath = buildCmsUrl(
		about.profile_photo.filename_disk,
		cmsUrl,
	);

	return (
		<div className={styles.aboutMeWrapper} id='aboutMe'>
			<div className={styles.aboutMeHeader}>
				<h2 className={styles.aboutMeTitle}>{about.page_title}</h2>
				<p className={styles.aboutMeSubtitle}>{about.subtext}</p>
			</div>

			<div className={styles.aboutMeContent}>
				<div className={styles.profileSection}>
					<ProfileAvatar
						imageSrc={profilePicturePath}
						initial='K'
						size='large'
					/>
					<h3 className={styles.profileTitle}>{about.position}</h3>
					<div className={styles.profileDescription}>
						<p>{about.description_1}</p>
						<p>{about.description_2}</p>
					</div>
				</div>

				<div className={styles.highlightsSection}>
					{about.highlights.map((card, index) => {
						const IconComponent = Icons[card.icon];

						return (
							<HighlightCard
								key={index}
								icon={IconComponent}
								title={card.title}
								description={card.description}
							/>
						);
					})}
				</div>
			</div>

			<div className={styles.skillsSection}>
				<h4 className={styles.skillsTitle}>{about.skills_title}</h4>
				<div className={styles.skillsGrid}>
					{about.skills.map((skill, index) => (
						<SkillBadge key={index}>{skill}</SkillBadge>
					))}
				</div>
			</div>
		</div>
	);
}

export default AboutMe;
