'use client';

import React, { useState } from 'react';
import ContactButton from '@/components/common/ContactButton';
import styles from './contactForm.module.css';
import { Plane } from 'lucide-react';
import { usePortfolio } from '@/contexts/PortfolioContext';

interface ContactFormProps {
	onSubmit: (formData: FormData) => Promise<void>;
	isSubmitting: boolean;
}

interface FormData {
	name: string;
	email: string;
	subject: string;
	message: string;
	honeypot: string;
}

function ContactForm({ onSubmit, isSubmitting }: ContactFormProps) {
	const {
		pageData: { contact },
	} = usePortfolio();

	const [formData, setFormData] = useState<FormData>({
		name: '',
		email: '',
		subject: '',
		message: '',
		honeypot: '',
	});

	const handleInputChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
	) => {
		const { name, value } = e.target;
		setFormData((prev) => ({
			...prev,
			[name]: value,
		}));
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		if (formData.honeypot) {
			console.log('Bot detected via honeypot');
			return;
		}

		await onSubmit(formData);

		setFormData({
			name: '',
			email: '',
			subject: '',
			message: '',
			honeypot: '',
		});
	};

	return (
		<div className={styles.contactForm}>
			<h3 className={styles.formTitle}>{contact.form_title}</h3>
			<p className={styles.formDescription}>{contact.form_subtext}</p>

			<form onSubmit={handleSubmit} className={styles.form}>
				<div className={styles.formRow}>
					<div className={styles.inputGroup}>
						<label htmlFor='name' className={styles.label}>
							{contact.form_name_title}
						</label>
						<input
							type='text'
							id='name'
							name='name'
							value={formData.name}
							onChange={handleInputChange}
							placeholder={contact.form_name_placeholder}
							className={styles.input}
							required
						/>
					</div>
					<div className={styles.inputGroup}>
						<label htmlFor='email' className={styles.label}>
							{contact.form_email_title}
						</label>
						<input
							type='email'
							id='email'
							name='email'
							value={formData.email}
							onChange={handleInputChange}
							placeholder={contact.form_email_placeholder}
							className={styles.input}
							required
						/>
					</div>
				</div>

				<div className={styles.inputGroup}>
					<label htmlFor='subject' className={styles.label}>
						{contact.form_subject_title}
					</label>
					<input
						type='text'
						id='subject'
						name='subject'
						value={formData.subject}
						onChange={handleInputChange}
						placeholder={contact.form_subject_placeholder}
						className={styles.input}
						required
					/>
				</div>

				<div className={styles.inputGroup}>
					<label htmlFor='message' className={styles.label}>
						{contact.form_message_title}
					</label>
					<textarea
						id='message'
						name='message'
						value={formData.message}
						onChange={handleInputChange}
						placeholder={contact.form_message_placeholder}
						className={styles.textarea}
						rows={6}
						required
					/>
				</div>

				<input
					type='text'
					name='honeypot'
					value={formData.honeypot}
					onChange={handleInputChange}
					className={styles.honeypot}
					tabIndex={-1}
					autoComplete='off'
					aria-hidden='true'
				/>

				<ContactButton type='submit' disabled={isSubmitting}>
					{isSubmitting ? (
						<>
							<span className={styles.spinner}></span>
							{contact.form_btn_loading_text}
						</>
					) : (
						<>
							<Plane size={18} />
							{contact.form_btn_text}
						</>
					)}
				</ContactButton>
			</form>
		</div>
	);
}

export default ContactForm;
export type { FormData };
