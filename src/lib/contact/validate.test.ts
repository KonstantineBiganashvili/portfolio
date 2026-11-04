import { describe, expect, it } from 'vitest';
import { validateContact } from './validate';

const valid = { name: 'Ada Lovelace', email: 'ada@example.com', subject: 'Hello', message: 'I would like to talk about a project.' };

describe('validateContact', () => {
	it('accepts a complete message and trims the values', () => {
		const result = validateContact({ ...valid, name: '  Ada Lovelace  ' });
		expect(result).toEqual({ ok: true, data: valid });
	});

	it('allows an empty subject', () => {
		expect(validateContact({ ...valid, subject: '' }).ok).toBe(true);
	});

	it('reports every invalid field with a plain-language message', () => {
		const result = validateContact({ name: 'A', email: 'not-an-email', subject: 'x'.repeat(151), message: 'short' });
		expect(result.ok).toBe(false);
		if (result.ok) return;
		expect(result.errors).toEqual({
			name: 'Enter your name.',
			email: 'Enter a valid email address.',
			subject: 'Keep the subject under 150 characters.',
			message: 'Write at least 10 characters.',
		});
	});

	it('rejects overly long messages', () => {
		const result = validateContact({ ...valid, message: 'x'.repeat(5001) });
		expect(result.ok).toBe(false);
		if (!result.ok) expect(result.errors.message).toBe('Keep the message under 5,000 characters.');
	});
});
