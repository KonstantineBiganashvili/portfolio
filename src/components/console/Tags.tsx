import styles from './console.module.css';

export function Tags({ items, label }: { items: string[]; label: string }) {
	if (items.length === 0) return null;
	return (
		<ul className={styles.tags} aria-label={label}>
			{items.map((item, i) => (
				<li key={`${i}-${item}`} className={styles.tag}>
					{item}
				</li>
			))}
		</ul>
	);
}
