'use client';

import React, { useState } from 'react';
import ContactButton from '@/components/common/ContactButton';
import styles from './contactForm.module.css';
import { Plane } from 'lucide-react';

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
			<h3 className={styles.formTitle}>Send a Message</h3>
			<p className={styles.formDescription}>
				Fill out the form below and I&apos;ll get back to you as soon as
				possible.
			</p>

			<form onSubmit={handleSubmit} className={styles.form}>
				<div className={styles.formRow}>
					<div className={styles.inputGroup}>
						<label htmlFor='name' className={styles.label}>
							Name
						</label>
						<input
							type='text'
							id='name'
							name='name'
							value={formData.name}
							onChange={handleInputChange}
							placeholder='Your full name'
							className={styles.input}
							required
						/>
					</div>
					<div className={styles.inputGroup}>
						<label htmlFor='email' className={styles.label}>
							Email
						</label>
						<input
							type='email'
							id='email'
							name='email'
							value={formData.email}
							onChange={handleInputChange}
							placeholder='your@email.com'
							className={styles.input}
							required
						/>
					</div>
				</div>

				<div className={styles.inputGroup}>
					<label htmlFor='subject' className={styles.label}>
						Subject
					</label>
					<input
						type='text'
						id='subject'
						name='subject'
						value={formData.subject}
						onChange={handleInputChange}
						placeholder="What's this about?"
						className={styles.input}
						required
					/>
				</div>

				<div className={styles.inputGroup}>
					<label htmlFor='message' className={styles.label}>
						Message
					</label>
					<textarea
						id='message'
						name='message'
						value={formData.message}
						onChange={handleInputChange}
						placeholder='Tell me about your project or idea...'
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
							Sending...
						</>
					) : (
						<>
							<Plane size={18} />
							Send Message
						</>
					)}
				</ContactButton>
			</form>
		</div>
	);
}

export default ContactForm;
export type { FormData };
