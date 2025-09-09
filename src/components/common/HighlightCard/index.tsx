'use client';

import React from 'react';
import styles from './highlightCard.module.css';

interface HighlightCardProps {
	icon: string;
	title: string;
	description: string;
	className?: string;
}

function HighlightCard({
	icon,
	title,
	description,
	className,
}: HighlightCardProps) {
	const cardClasses = [styles.highlightCard, className]
		.filter(Boolean)
		.join(' ');

	return (
		<div className={cardClasses}>
			<div className={styles.highlightIcon}>{icon}</div>
			<div className={styles.highlightContent}>
				<h4 className={styles.highlightTitle}>{title}</h4>
				<p className={styles.highlightDescription}>{description}</p>
			</div>
		</div>
	);
}

export default HighlightCard;
