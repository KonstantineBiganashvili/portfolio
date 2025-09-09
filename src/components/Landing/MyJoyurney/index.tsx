import React, { useRef } from 'react';
import styles from './myJourney.module.css';
import clsx from 'clsx';
import AnimatedTimeline from './AnimatedTimeline';

function MyJourney() {
	const wrapperRef = useRef<HTMLDivElement>(null);

	return (
		<div className={styles.myJourneyWrapper}>
			<div className={styles.myJourneyHeader}>
				<h2 className={styles.myJourneyTitle}>My Journey</h2>
				<p className={styles.myJourneySubtitle}>
					A timeline of my professional and educational milestones
				</p>
			</div>
			<div ref={wrapperRef} className={styles.myJourneyContent}>
				<AnimatedTimeline containerRef={wrapperRef} />
				{myJourneyItems.map((item, index) => (
					<div
						className={clsx(
							styles.myJourneyItem,
							index % 2 === 0
								? styles.myJourneyItemEven
								: styles.myJourneyItemOdd,
						)}
						key={item.id}
					>
						<div className={styles.myJourneyItemNumber}>{item.id}</div>
						<div className={styles.myJourneyItemContent}>
							<h3 className={styles.myJourneyItemTitle}>{item.title}</h3>
							<span className={styles.myJourneyItemDate}>{item.date}</span>
							<p className={styles.myJourneyItemDescription}>
								{item.description}
							</p>
						</div>
					</div>
				))}
			</div>
		</div>
	);
}

export default MyJourney;

const myJourneyItems = [
	{
		id: 1,
		title: 'Physics & Mathematics Foundation',
		date: '2010 - 2016',
		description:
			'Studied at Komarovi Campus School, building a strong base in mathematics and analytical thinking.',
		image: '/images/education.png',
	},
	{
		id: 2,
		title: 'Bachelor of Computer Science',
		date: '2016 - 2020',
		description:
			"Completed my Bachelor's degree at International Black Sea University, focusing on software engineering and computer science.",
		image: '/images/university.png',
	},
	{
		id: 3,
		title: 'Coordinator - Esports.ge',
		date: '2018 - 2019',
		description:
			'Organized LAN and online esports tournaments, coordinated participants, and authored event coverage.',
		image: '/images/esports.png',
	},
	{
		id: 4,
		title: 'IT Specialist - International Black Sea University',
		date: '2019 - 2022',
		description:
			'Managed hardware, networks, and IT security, gaining hands-on experience in infrastructure and administration.',
		image: '/images/it-support.png',
	},
	{
		id: 5,
		title: 'Master of Computer Science',
		date: '2020 - 2023',
		description:
			"Earned a Master's degree at International Black Sea University with research in advanced computing concepts.",
		image: '/images/master.png',
	},
	{
		id: 6,
		title: 'Frontend Developer - Web.smart',
		date: '2022 - 2023',
		description:
			'Started as an intern and grew into a Frontend Developer role. Built user-focused interfaces and public-facing apps.',
		image: '/images/frontend.png',
	},
	{
		id: 7,
		title: 'Software Engineer - Exists',
		date: '2023 - 2025',
		description:
			'Developed with Next.js and NestJS, managed DevOps pipelines on AWS/GCP, and automated CI/CD with GitHub Actions.',
		image: '/images/software-engineer.png',
	},
	{
		id: 8,
		title: 'Master of DevOps Engineering',
		date: '2023 - 2025',
		description:
			"Completed a second Master's degree at Business and Technology University, specializing in cloud, CI/CD, and DevOps.",
		image: '/images/devops.png',
	},
];
