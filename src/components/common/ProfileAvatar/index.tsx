'use client';

import React from 'react';
import Image from 'next/image';
import styles from './profileAvatar.module.css';

interface ProfileAvatarProps {
	initial?: string;
	imageSrc?: string;
	size?: 'small' | 'medium' | 'large';
	className?: string;
}

function ProfileAvatar({
	initial,
	imageSrc,
	size = 'large',
	className,
}: ProfileAvatarProps) {
	const avatarClasses = [styles.profileAvatar, styles[size], className]
		.filter(Boolean)
		.join(' ');

	return (
		<div className={avatarClasses}>
			<div className={styles.avatarImage}>
				{imageSrc ? (
					<Image
						src={imageSrc}
						alt='Profile'
						fill
						className={styles.profileImage}
						sizes='(max-width: 768px) 120px, 150px'
						priority
					/>
				) : (
					<div className={styles.avatarPlaceholder}>{initial}</div>
				)}
			</div>
		</div>
	);
}

export default ProfileAvatar;
