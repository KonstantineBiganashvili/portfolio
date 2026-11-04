import styles from './console.module.css';

export type Tone = 'ok' | 'warn' | 'idle';

export function StatusPill({ tone, children }: { tone: Tone; children: React.ReactNode }) {
	return (
		<span className={styles.pill} data-tone={tone}>
			<span className={styles.dot} aria-hidden='true' />
			{children}
		</span>
	);
}
