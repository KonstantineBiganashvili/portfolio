import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { ContactForm } from './ContactForm';

const props = { endpoint: 'https://forms.test/submit', accessKey: 'public-key', fallbackEmail: 'contact@example.com' };

async function fill(user: ReturnType<typeof userEvent.setup>) {
	await user.type(screen.getByLabelText('Name'), 'Ada Lovelace');
	await user.type(screen.getByLabelText('Email'), 'ada@example.com');
	await user.type(screen.getByLabelText(/Subject/), 'Project');
	await user.type(screen.getByLabelText('Message'), 'I would like to talk about a project.');
}

describe('ContactForm', () => {
	afterEach(() => vi.unstubAllGlobals());

	it('shows field errors and does not send an invalid form', async () => {
		const fetchMock = vi.fn();
		vi.stubGlobal('fetch', fetchMock);
		const user = userEvent.setup();
		render(<ContactForm {...props} />);
		await user.click(screen.getByRole('button', { name: 'Send message' }));
		expect(screen.getByText('Enter your name.')).toBeInTheDocument();
		expect(screen.getByText('Enter a valid email address.')).toBeInTheDocument();
		expect(screen.getByLabelText('Name')).toHaveAttribute('aria-invalid', 'true');
		expect(fetchMock).not.toHaveBeenCalled();
	});

	it('sends the message with the access key and confirms success', async () => {
		const fetchMock = vi.fn().mockResolvedValue(new Response(JSON.stringify({ success: true }), { status: 200 }));
		vi.stubGlobal('fetch', fetchMock);
		const user = userEvent.setup();
		render(<ContactForm {...props} />);
		await fill(user);
		await user.click(screen.getByRole('button', { name: 'Send message' }));

		expect(fetchMock).toHaveBeenCalledTimes(1);
		const [url, init] = fetchMock.mock.calls[0] as [string, RequestInit];
		expect(url).toBe(props.endpoint);
		const body = JSON.parse(String(init.body));
		expect(body).toMatchObject({ access_key: 'public-key', name: 'Ada Lovelace', email: 'ada@example.com', message: 'I would like to talk about a project.', botcheck: false });
		expect(await screen.findByRole('status')).toHaveTextContent('Message sent. I’ll reply to ada@example.com');
		expect(screen.getByLabelText('Message')).toHaveValue('');
	});

	it('explains a failed send and offers the email address instead', async () => {
		vi.stubGlobal('fetch', vi.fn().mockResolvedValue(new Response(JSON.stringify({ success: false, message: 'Rate limited' }), { status: 429 })));
		const user = userEvent.setup();
		render(<ContactForm {...props} />);
		await fill(user);
		await user.click(screen.getByRole('button', { name: 'Send message' }));
		const alert = await screen.findByRole('alert');
		expect(alert).toHaveTextContent('The message wasn’t sent (Rate limited).');
		expect(alert).toHaveTextContent('contact@example.com');
		expect(screen.getByLabelText('Message')).toHaveValue('I would like to talk about a project.');
	});

	it('handles network failures', async () => {
		vi.stubGlobal('fetch', vi.fn().mockRejectedValue(new TypeError('Failed to fetch')));
		const user = userEvent.setup();
		render(<ContactForm {...props} />);
		await fill(user);
		await user.click(screen.getByRole('button', { name: 'Send message' }));
		expect(await screen.findByRole('alert')).toHaveTextContent('network');
	});

	it('silently drops submissions that tick the hidden bot trap', async () => {
		const fetchMock = vi.fn();
		vi.stubGlobal('fetch', fetchMock);
		const user = userEvent.setup();
		const { container } = render(<ContactForm {...props} />);
		await fill(user);
		const trap = container.querySelector<HTMLInputElement>('input[name="botcheck"]')!;
		trap.checked = true;
		await user.click(screen.getByRole('button', { name: 'Send message' }));
		expect(fetchMock).not.toHaveBeenCalled();
	});

	it('tells the visitor to email directly when the form is not configured', () => {
		render(<ContactForm {...props} accessKey='' />);
		expect(screen.getByText(/form is offline/i)).toBeInTheDocument();
		expect(screen.queryByRole('button', { name: 'Send message' })).not.toBeInTheDocument();
	});
});
