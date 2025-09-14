'use client';

import React, { useState } from 'react';
import styles from './contactMe.module.css';
import ContactForm from './ContactForm';
import ContactInfo from './ContactInfo';
import Availability from './Availability';
import Toast from '@/components/common/Toast';
import type { FormData } from './ContactForm';

function ContactMe() {
	const [isSubmitting, setIsSubmitting] = useState(false);

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
			const response = await fetch(
				`https://formsubmit.co/${process.env.NEXT_PUBLIC_ACTIONFORM_STRING}`,
				{
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify({
						name: formData.name,
						email: formData.email,
						subject: formData.subject,
						message: formData.message,
						_subject: `New message from ${formData.name}: ${formData.subject}`,
						_captcha: 'false',
						_template: 'table',
					}),
				},
			);

			if (response.ok) {
				showToast(
					"Message sent successfully! I'll get back to you soon.",
					'success',
				);
			} else {
				throw new Error('Failed to send message');
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
				<h2 className={styles.contactMeTitle}>Let&apos;s Connect</h2>
				<p className={styles.contactMeSubtitle}>
					Ready to discuss your next project, explore collaboration
					opportunities, or just say hello? I&apos;d love to hear from you.
				</p>
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
