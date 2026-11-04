'use client';

import { type ChangeEvent, type FormEvent, useId, useRef, useState } from 'react';
import { type ContactErrors, type ContactInput, validateContact } from '@/lib/contact/validate';
import styles from './contact.module.css';

interface ContactFormProps {
	endpoint: string;
	/** Web3Forms access key. It is public by design (submissions go straight from the browser). */
	accessKey: string;
	fallbackEmail: string;
}

type SendState = { kind: 'idle' } | { kind: 'sending' } | { kind: 'sent'; email: string } | { kind: 'failed'; reason: string };

const EMPTY: ContactInput = { name: '', email: '', subject: '', message: '' };
const FIELDS: { name: keyof ContactInput; label: string; type?: string; autoComplete?: string; multiline?: boolean }[] = [
	{ name: 'name', label: 'Name', autoComplete: 'name' },
	{ name: 'email', label: 'Email', type: 'email', autoComplete: 'email' },
	{ name: 'subject', label: 'Subject (optional)' },
	{ name: 'message', label: 'Message', multiline: true },
];

export function ContactForm({ endpoint, accessKey, fallbackEmail }: ContactFormProps) {
	const id = useId();
	const formRef = useRef<HTMLFormElement>(null);
	const [values, setValues] = useState<ContactInput>(EMPTY);
	const [errors, setErrors] = useState<ContactErrors>({});
	const [state, setState] = useState<SendState>({ kind: 'idle' });

	if (!accessKey) {
		return (
			<p className={styles.offline}>
				The contact form is offline right now. Email <a href={`mailto:${fallbackEmail}`}>{fallbackEmail}</a> instead.
			</p>
		);
	}

	const onChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		const { name, value } = e.target;
		setValues((v) => ({ ...v, [name]: value }));
	};

	async function onSubmit(e: FormEvent<HTMLFormElement>) {
		e.preventDefault();
		const trap = e.currentTarget.elements.namedItem('botcheck') as HTMLInputElement | null;
		if (trap?.checked) {
			setState({ kind: 'sent', email: values.email });
			return;
		}
		const result = validateContact(values);
		if (!result.ok) {
			setErrors(result.errors);
			const first = FIELDS.find((f) => result.errors[f.name]);
			if (first) formRef.current?.querySelector<HTMLElement>(`[name="${first.name}"]`)?.focus();
			return;
		}
		setErrors({});
		setState({ kind: 'sending' });
		try {
			const res = await fetch(endpoint, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
				body: JSON.stringify({
					access_key: accessKey,
					...result.data,
					subject: result.data.subject || `New message from ${result.data.name}`,
					from_name: 'biganashvili.dev',
					botcheck: false,
				}),
			});
			const body = (await res.json().catch(() => ({}))) as { success?: boolean; message?: string };
			if (!res.ok || body.success === false) throw new Error(body.message || `status ${res.status}`);
			setState({ kind: 'sent', email: result.data.email });
			setValues(EMPTY);
		} catch (error) {
			setState({ kind: 'failed', reason: error instanceof TypeError ? 'network error' : (error as Error).message });
		}
	}

	const sending = state.kind === 'sending';
	return (
		<form ref={formRef} className={styles.form} onSubmit={onSubmit} noValidate>
			<p className={styles.formTitle} aria-hidden='true'>
				new-message.txt
			</p>
			{FIELDS.map((f) => {
				const fieldId = `${id}-${f.name}`;
				const error = errors[f.name];
				const shared = {
					id: fieldId,
					name: f.name,
					value: values[f.name],
					onChange,
					'aria-invalid': error ? true : undefined,
					'aria-describedby': error ? `${fieldId}-error` : undefined,
					className: styles.input,
				};
				return (
					<div key={f.name} className={styles.field}>
						<label htmlFor={fieldId} className={styles.label}>
							{f.label}
						</label>
						{f.multiline ? <textarea {...shared} rows={6} /> : <input {...shared} type={f.type ?? 'text'} autoComplete={f.autoComplete} />}
						{error ? (
							<p id={`${fieldId}-error`} className={styles.error}>
								{error}
							</p>
						) : null}
					</div>
				);
			})}
			{/* Bot trap: hidden from people and assistive tech; bots that tick everything give themselves away. */}
			<input type='checkbox' name='botcheck' className={styles.trap} tabIndex={-1} autoComplete='off' aria-hidden='true' />

			<div className={styles.formFooter}>
				<button type='submit' className={styles.submit} disabled={sending}>
					{sending ? 'Sending…' : 'Send message'}
				</button>
				{state.kind === 'sent' ? (
					<p role='status' className={styles.sent}>
						Message sent. I’ll reply to {state.email} within a couple of days.
					</p>
				) : null}
				{state.kind === 'failed' ? (
					<p role='alert' className={styles.failed}>
						The message wasn’t sent ({state.reason}). Email me at <a href={`mailto:${fallbackEmail}`}>{fallbackEmail}</a> instead.
					</p>
				) : null}
			</div>
		</form>
	);
}
