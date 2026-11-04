'use client';

import { useEffect } from 'react';
import './globals.css';
import styles from './status.module.css';

/** Last-resort boundary for failures in the root layout itself. It replaces the layout, so it renders its own document. */
export default function GlobalError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
	useEffect(() => {
		console.error('[app] root layout failed', error.digest ?? error.message);
	}, [error]);

	return (
		<html lang='en'>
			<body>
				<section className={`shell ${styles.status}`} aria-labelledby='global-err-title'>
					<p className={styles.command} aria-hidden='true'>
						<span>$</span> kubectl get site
					</p>
					<h1 id='global-err-title' className={styles.title}>
						Error: the site couldn’t load.
					</h1>
					<p className={styles.body}>This is usually brief. Try again in a moment.</p>
					<button type='button' onClick={reset} className={styles.action}>
						Try again
					</button>
				</section>
			</body>
		</html>
	);
}
