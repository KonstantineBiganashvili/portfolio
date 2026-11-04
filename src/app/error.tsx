'use client';

import { useEffect } from 'react';
import styles from './status.module.css';

export default function ErrorPage({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
	useEffect(() => {
		console.error('[page] render failed', error.digest ?? error.message);
	}, [error]);

	return (
		<section className={`shell ${styles.status}`} aria-labelledby='err-title'>
			<p className={styles.command} aria-hidden='true'>
				<span>$</span> kubectl get content
			</p>
			<h1 id='err-title' className={styles.title}>
				Error: the content service didn’t respond.
			</h1>
			<p className={styles.body}>This is usually brief. Try again in a moment.{error.digest ? ` Reference: ${error.digest}.` : ''}</p>
			<button type='button' onClick={reset} className={styles.action}>
				Try again
			</button>
		</section>
	);
}
