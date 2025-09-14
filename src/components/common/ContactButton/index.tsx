'use client';

import React from 'react';
import styles from './contactButton.module.css';

interface ContactButtonProps {
	children: React.ReactNode;
	onClick?: () => void;
	className?: string;
	type?: 'button' | 'submit' | 'reset';
	disabled?: boolean;
}

function ContactButton({
	children,
	onClick,
	className,
	type = 'button',
	disabled = false,
}: ContactButtonProps) {
	const buttonClasses = [styles.contactButton, className]
		.filter(Boolean)
		.join(' ');

	return (
		<button
			className={buttonClasses}
			onClick={onClick}
			type={type}
			disabled={disabled}
		>
			{children}
		</button>
	);
}

export default ContactButton;
