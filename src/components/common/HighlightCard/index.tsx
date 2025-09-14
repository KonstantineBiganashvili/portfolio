'use client';

import React from 'react';
import styles from './highlightCard.module.css';
import { LucideIcon } from 'lucide-react';

interface HighlightCardProps {
	icon: LucideIcon;
	title: string;
	description: string;
	className?: string;
}

function HighlightCard({
	icon: Icon,
	title,
	description,
	className,
}: HighlightCardProps) {
	const cardClasses = [styles.highlightCard, className]
		.filter(Boolean)
		.join(' ');

	return (
		<div className={cardClasses}>
			<div className={styles.highlightIcon}>
				<Icon size={24} />
			</div>
			<div className={styles.highlightContent}>
				<h4 className={styles.highlightTitle}>{title}</h4>
				<p className={styles.highlightDescription}>{description}</p>
			</div>
		</div>
	);
}

export default HighlightCard;
