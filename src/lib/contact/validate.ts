export interface ContactInput {
	name: string;
	email: string;
	subject: string;
	message: string;
}

export type ContactErrors = Partial<Record<keyof ContactInput, string>>;

export type ContactResult = { ok: true; data: ContactInput } | { ok: false; errors: ContactErrors };

// Deliberately permissive: one @, a dot in the domain, no spaces. The mail provider does the real check.
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateContact(input: ContactInput): ContactResult {
	const data: ContactInput = {
		name: input.name.trim(),
		email: input.email.trim(),
		subject: input.subject.trim(),
		message: input.message.trim(),
	};
	const errors: ContactErrors = {};

	if (data.name.length < 2 || data.name.length > 100) errors.name = 'Enter your name.';
	if (!EMAIL.test(data.email) || data.email.length > 254) errors.email = 'Enter a valid email address.';
	if (data.subject.length > 150) errors.subject = 'Keep the subject under 150 characters.';
	if (data.message.length < 10) errors.message = 'Write at least 10 characters.';
	else if (data.message.length > 5000) errors.message = 'Keep the message under 5,000 characters.';

	return Object.keys(errors).length === 0 ? { ok: true, data } : { ok: false, errors };
}
