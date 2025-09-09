'use client';

import React from 'react';
import styles from './introduction.module.css';
import BuildingWebsite from '@/components/common/svgs/BuildingWebsite';
import Badge from '@/components/common/Badge';
import ContactButton from '@/components/common/ContactButton';

const techBadges: {
	variant: 'default' | 'secondary' | 'outline';
	label: string;
}[] = [
	{
		variant: 'default',
		label: 'TypeScript',
	},
	{
		variant: 'secondary',
		label: 'Python',
	},
	{
		variant: 'outline',
		label: 'Cloud',
	},
	{
		variant: 'default',
		label: 'DevOps',
	},
];

function Introduction() {
	return (
		<div className={styles.introductionWrapper}>
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
						<ContactButton>Download Resume</ContactButton>
						<ContactButton>Contact Me</ContactButton>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Introduction;
