import { useRef } from 'react';
import styles from './myJourney.module.css';
import clsx from 'clsx';
import AnimatedTimeline from './AnimatedTimeline';
import { usePortfolio } from '@/contexts/PortfolioContext';

function MyJourney() {
	const wrapperRef = useRef<HTMLDivElement>(null);
	const {
		pageData: { myJourney },
	} = usePortfolio();

	return (
		<div className={styles.myJourneyWrapper} id='myJourney'>
			<div className={styles.myJourneyHeader}>
				<h2 className={styles.myJourneyTitle}>{myJourney.page_title}</h2>
				<p className={styles.myJourneySubtitle}>{myJourney.subtext}</p>
			</div>
			<div ref={wrapperRef} className={styles.myJourneyContent}>
				<AnimatedTimeline containerRef={wrapperRef} />
				{myJourney.journey_items.map((item, index) => (
					<div
						className={clsx(
							styles.myJourneyItem,
							index % 2 === 0
								? styles.myJourneyItemEven
								: styles.myJourneyItemOdd,
						)}
						key={item.order}
					>
						<div className={styles.myJourneyItemNumber}>{item.order}</div>
						<div className={styles.myJourneyItemContent}>
							<h3 className={styles.myJourneyItemTitle}>{item.title}</h3>
							<span className={styles.myJourneyItemDate}>{item.dates}</span>
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
