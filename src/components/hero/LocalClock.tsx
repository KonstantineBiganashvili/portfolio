'use client';

import { useEffect, useState } from 'react';
import { formatClock } from '@/lib/format/clock';
import styles from './hero.module.css';

export function LocalClock({ timezone, location }: { timezone: string; location: string }) {
	// Render nothing time-dependent on the server so hydration never mismatches.
	const [now, setNow] = useState<Date | null>(null);

	useEffect(() => {
		setNow(new Date());
		const id = window.setInterval(() => setNow(new Date()), 15_000);
		return () => window.clearInterval(id);
	}, []);

	const clock = now ? formatClock(now, timezone) : null;
	return (
		<p className={styles.clock}>
			<span className={styles.key}>local</span> {location || timezone}
			{clock ? (
				<>
					{' '}
					<time dateTime={now!.toISOString()}>{clock.time}</time> <span className={styles.offset}>{clock.offset}</span>
				</>
			) : null}
		</p>
	);
}
