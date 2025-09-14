'use client';

import React from 'react';
import styles from './availability.module.css';
import {
	AvailabilityItem,
	defaultAvailability,
} from '@/constants/availability';

interface AvailabilityProps {
	availabilityItems?: AvailabilityItem[];
}

function Availability({ availabilityItems }: AvailabilityProps) {
	const items = availabilityItems || defaultAvailability;

	return (
		<div className={styles.availability}>
			<div className={styles.availabilityCard}>
				<h3 className={styles.availabilityTitle}>
					Available for New Opportunities
				</h3>
				<p className={styles.availabilityDescription}>
					Currently open to the following types of work:
				</p>
				<div className={styles.availabilityList}>
					{items.map((item) => (
						<div
							key={item.id}
							className={`${styles.availabilityItem} ${
								item.isAvailable ? styles.available : styles.unavailable
							}`}
						>
							<div className={styles.itemIndicator}></div>
							<span className={styles.itemLabel}>{item.label}</span>
						</div>
					))}
				</div>
			</div>
		</div>
	);
}

export default Availability;
