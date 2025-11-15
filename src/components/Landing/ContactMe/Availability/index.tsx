'use client';

import styles from './availability.module.css';
import { usePortfolio } from '@/contexts/PortfolioContext';

function Availability() {
	const {
		pageData: { contact },
	} = usePortfolio();

	return (
		<div className={styles.availability}>
			<div className={styles.availabilityCard}>
				<h3 className={styles.availabilityTitle}>
					{contact.availability_title}
				</h3>
				<p className={styles.availabilityDescription}>
					{contact.availability_subtext}
				</p>
				<div className={styles.availabilityList}>
					{contact.availability_items.map((item) => (
						<div
							key={item.title}
							className={`${styles.availabilityItem} ${
								item.is_available ? styles.available : styles.unavailable
							}`}
						>
							<div className={styles.itemIndicator}></div>
							<span className={styles.itemLabel}>{item.title}</span>
						</div>
					))}
				</div>
			</div>
		</div>
	);
}

export default Availability;
