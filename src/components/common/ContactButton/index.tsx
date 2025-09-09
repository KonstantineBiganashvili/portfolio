'use client';

import React from 'react';
import styles from './contactButton.module.css';

interface ContactButtonProps {
	children: React.ReactNode;
	onClick?: () => void;
	className?: string;
	type?: 'button' | 'submit' | 'reset';
}

function ContactButton({
	children,
	onClick,
	className,
	type = 'button',
}: ContactButtonProps) {
	const buttonClasses = [styles.contactButton, className]
		.filter(Boolean)
		.join(' ');

	return (
		<button className={buttonClasses} onClick={onClick} type={type}>
			{children}
		</button>
	);
}

export default ContactButton;
