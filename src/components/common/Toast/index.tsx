'use client';

import React, { useEffect } from 'react';
import styles from './toast.module.css';

export interface ToastProps {
	message: string;
	type: 'success' | 'error' | 'info';
	isVisible: boolean;
	onClose: () => void;
	duration?: number;
}

function Toast({
	message = 'This is a test toast',
	type,
	isVisible,
	onClose,
	duration = 50000,
}: ToastProps) {
	useEffect(() => {
		if (isVisible && duration > 0) {
			const timer = setTimeout(() => {
				onClose();
			}, duration);

			return () => clearTimeout(timer);
		}
	}, [isVisible, duration, onClose]);

	if (!isVisible) return null;

	const getIcon = () => {
		switch (type) {
			case 'success':
				return '✅';
			case 'error':
				return '❌';
			case 'info':
			default:
				return 'ℹ️';
		}
	};

	return (
		<div
			className={`${styles.toastContainer} ${styles[type]} ${
				isVisible ? styles.show : ''
			}`}
		>
			<div className={styles.toastContent}>
				<span className={styles.toastIcon}>{getIcon()}</span>
				<span className={styles.toastMessage}>{message}</span>
				<button
					className={styles.toastClose}
					onClick={onClose}
					aria-label='Close toast'
				>
					✕
				</button>
			</div>
			<div className={styles.toastProgress}></div>
		</div>
	);
}

export default Toast;
