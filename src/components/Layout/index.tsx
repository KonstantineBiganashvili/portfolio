'use client';

import Header from './Header';
import styles from './layout.module.css';

function Layout({ children }: { children: React.ReactNode }) {
	return (
		<main className={styles.main}>
			<Header />
			<div className={styles.content}>{children}</div>
		</main>
	);
}

export default Layout;
