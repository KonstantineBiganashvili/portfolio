'use client';

import React from 'react';
import styles from './profileAvatar.module.css';

interface ProfileAvatarProps {
	initial: string;
	size?: 'small' | 'medium' | 'large';
	className?: string;
}

function ProfileAvatar({
	initial,
	size = 'large',
	className,
}: ProfileAvatarProps) {
	const avatarClasses = [styles.profileAvatar, styles[size], className]
		.filter(Boolean)
		.join(' ');

	return (
		<div className={avatarClasses}>
			<div className={styles.avatarImage}>
				<div className={styles.avatarPlaceholder}>{initial}</div>
			</div>
		</div>
	);
}

export default ProfileAvatar;
