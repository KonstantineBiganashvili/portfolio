'use client';

import React from 'react';
import styles from './skillBadge.module.css';

interface SkillBadgeProps {
	children: React.ReactNode;
	className?: string;
}

function SkillBadge({ children, className }: SkillBadgeProps) {
	const badgeClasses = [styles.skillBadge, className].filter(Boolean).join(' ');

	return <div className={badgeClasses}>{children}</div>;
}

export default SkillBadge;
