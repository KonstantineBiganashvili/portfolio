import styles from './console.module.css';

interface CommandProps {
	/** The shell command shown before the resource, e.g. "kubectl get". Hidden from screen readers. */
	command: string;
	/** The resource name: the part that is announced as the heading. */
	resource: string;
	id?: string;
	level?: 1 | 2;
	flags?: string;
}

/** A section heading written as the shell command whose output is the section. */
export function Command({ command, resource, id, level = 2, flags }: CommandProps) {
	const Tag = level === 1 ? 'h1' : 'h2';
	return (
		<Tag id={id} className={level === 1 ? `${styles.command} ${styles.commandLarge}` : styles.command}>
			<span className={styles.prompt} aria-hidden='true'>
				${' '}
			</span>
			<span className={styles.verb} aria-hidden='true'>
				{command}{' '}
			</span>
			<span className={styles.resource}>{resource}</span>
			{flags ? (
				<span className={styles.flags} aria-hidden='true'>
					{' '}
					{flags}
				</span>
			) : null}
		</Tag>
	);
}
