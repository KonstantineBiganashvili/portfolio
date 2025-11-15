'use client';

import React, { useState } from 'react';
import styles from './contactMe.module.css';
import ContactForm from './ContactForm';
import ContactInfo from './ContactInfo';
import Availability from './Availability';
import Toast from '@/components/common/Toast';
import type { FormData } from './ContactForm';
import { usePortfolio } from '@/contexts/PortfolioContext';

function ContactMe() {
	const [isSubmitting, setIsSubmitting] = useState(false);
	const {
		pageData: { contact },
		web3FormApiUrl,
		web3FormApiKey,
	} = usePortfolio();

	const [toast, setToast] = useState({
		isVisible: false,
		message: '',
		type: 'info' as 'success' | 'error' | 'info',
	});

	const showToast = (message: string, type: 'success' | 'error' | 'info') => {
		setToast({
			isVisible: true,
			message,
			type,
		});
	};

	const hideToast = () => {
		setToast((prev) => ({
			...prev,
			isVisible: false,
		}));
	};

	const handleFormSubmit = async (formData: FormData) => {
		setIsSubmitting(true);

		try {
			const response = await fetch(web3FormApiUrl, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					access_key: web3FormApiKey,
					name: formData.name,
					email: formData.email,
					subject: formData.subject,
					message: formData.message,
				}),
			});

			const data = await response.json();

			if (response.ok && data.success) {
				showToast(
					"Message sent successfully! I'll get back to you soon.",
					'success',
				);
			} else {
				throw new Error(data.message || 'Failed to send message');
			}
		} catch (error) {
			console.error('Error sending message:', error);
			showToast(
				'Failed to send message. Please try again or email me directly at contact@biganashvili.dev',
				'error',
			);
		} finally {
			setIsSubmitting(false);
		}
	};

	return (
		<div className={styles.contactMeWrapper} id='contact'>
			<div className={styles.contactMeHeader}>
				<h2 className={styles.contactMeTitle}>{contact.page_title}</h2>
				<p className={styles.contactMeSubtitle}>{contact.subtext}</p>
			</div>
			<div className={styles.topSection}>
				<ContactForm onSubmit={handleFormSubmit} isSubmitting={isSubmitting} />
				<ContactInfo calendlyUrl='https://calendly.com/konstantine-biganashvili/30min' />
			</div>
			<Availability />
			<Toast
				message={toast.message}
				type={toast.type}
				isVisible={toast.isVisible}
				onClose={hideToast}
			/>
		</div>
	);
}

export default ContactMe;
