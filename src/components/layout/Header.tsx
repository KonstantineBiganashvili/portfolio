import Link from 'next/link';
import { SECTIONS } from '@/lib/site';
import styles from './layout.module.css';

export function Header({ hasCv }: { hasCv: boolean }) {
	return (
		<header className={styles.header}>
			<div className={`shell ${styles.headerInner}`}>
				<Link href='/' className={styles.brand} aria-label='Konstantine Biganashvili, home'>
					<span aria-hidden='true'>
						kb<span className={styles.brandAt}>@</span>biganashvili<span className={styles.brandPath}>:~$</span>
					</span>
				</Link>
				<nav aria-label='Sections' className={styles.nav}>
					<ul>
						{SECTIONS.map((s) => (
							<li key={s.id}>
								<Link href={`/#${s.id}`}>{s.label}</Link>
							</li>
						))}
					</ul>
				</nav>
				{hasCv ? (
					<a href='/cv' className={styles.cv} download>
						Download CV
					</a>
				) : null}
			</div>
		</header>
	);
}
