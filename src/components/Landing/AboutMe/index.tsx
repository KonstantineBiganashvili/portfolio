'use client';

import React from 'react';
import styles from './aboutMe.module.css';
import HighlightCard from '@/components/common/HighlightCard';
import SkillBadge from '@/components/common/SkillBadge';
import ProfileAvatar from '@/components/common/ProfileAvatar';

const highlightCards = [
	{
		icon: '💻',
		title: '6 Years in Tech',
		description: 'Software Engineer with modern web technologies',
	},
	{
		icon: '🚀',
		title: '3+ Years Next.js/NestJS',
		description: 'Building scalable applications with Next.js and NestJS',
	},
	{
		icon: '☁️',
		title: 'Cloud & DevOps',
		description: 'Extensive experience with AWS and GCP environments',
	},
	{
		icon: '🎓',
		title: "Dual Master's Degrees",
		description: 'Computer Science and DevOps Engineering',
	},
];

const technicalSkills = [
	'JavaScript',
	'TypeScript',
	'Python',
	'React',
	'Next.js',
	'Node.js',
	'NestJS',
	'GraphQL',
	'Three.js',
	'GSAP',
	'PostgreSQL',
	'MongoDB',
	'AWS',
	'GCP',
	'Docker',
	'GitHub Actions',
];

function AboutMe() {
	return (
		<div className={styles.aboutMeWrapper}>
			<div className={styles.aboutMeHeader}>
				<h2 className={styles.aboutMeTitle}>About Me</h2>
				<p className={styles.aboutMeSubtitle}>
					Transforming ideas into exceptional digital experiences through code,
					creativity, and cutting-edge technology
				</p>
			</div>

			<div className={styles.aboutMeContent}>
				<div className={styles.profileSection}>
					<ProfileAvatar initial='K' size='large' />
					<h3 className={styles.profileTitle}>
						Software Engineer & <br /> DevOps Engineer
					</h3>
					<div className={styles.profileDescription}>
						<p>
							Software Engineer and DevOps Engineer with around 6 years
							in tech, including 3+ years building applications with Next.js,
							React and NestJS, and extensive experience managing and building
							GCP and AWS environments.
						</p>
						<p>
							I hold master&apos;s degrees in Computer Science and DevOps and
							excel at delivering scalable, innovative solutions. I&apos;m
							passionate about bridging the gap between design and
							functionality, creating applications that are both visually
							stunning and highly performant.
						</p>
					</div>
				</div>

				<div className={styles.highlightsSection}>
					{highlightCards.map((card, index) => (
						<HighlightCard
							key={index}
							icon={card.icon}
							title={card.title}
							description={card.description}
						/>
					))}
				</div>
			</div>

			<div className={styles.skillsSection}>
				<h4 className={styles.skillsTitle}>Technical Skills</h4>
				<div className={styles.skillsGrid}>
					{technicalSkills.map((skill, index) => (
						<SkillBadge key={index}>{skill}</SkillBadge>
					))}
				</div>
			</div>
		</div>
	);
}

export default AboutMe;
