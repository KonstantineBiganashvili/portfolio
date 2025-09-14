import React, { useRef } from 'react';
import styles from './myJourney.module.css';
import clsx from 'clsx';
import AnimatedTimeline from './AnimatedTimeline';
import { myJourneyItems } from '@/constants/journey';

function MyJourney() {
	const wrapperRef = useRef<HTMLDivElement>(null);

	return (
		<div className={styles.myJourneyWrapper} id='myJourney'>
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
