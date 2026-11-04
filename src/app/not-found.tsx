import Link from 'next/link';
import styles from './status.module.css';

export const metadata = { title: 'Not found' };

export default function NotFound() {
	return (
		<section className={`shell ${styles.status}`} aria-labelledby='nf-title'>
			<p className={styles.command} aria-hidden='true'>
				<span>$</span> kubectl get page
			</p>
			<h1 id='nf-title' className={styles.title}>
				Error from server (NotFound): this page doesn’t exist.
			</h1>
			<p className={styles.body}>The link may be old, or the address has a typo.</p>
			<Link href='/' className={styles.action}>
				Go to the home page
			</Link>
		</section>
	);
}
