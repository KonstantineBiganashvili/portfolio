'use client';

import React from 'react';
import styles from './badge.module.css';

interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
	variant?: 'default' | 'secondary' | 'outline';
	children: React.ReactNode;
}

function Badge({
	className,
	variant = 'default',
	children,
	...props
}: BadgeProps) {
	const badgeClasses = [styles.badge, styles[variant], className]
		.filter(Boolean)
		.join(' ');

	return (
		<div className={badgeClasses} {...props}>
			{children}
		</div>
	);
}

export default Badge;
