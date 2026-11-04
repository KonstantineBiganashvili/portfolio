import { describe, expect, it } from 'vitest';
import { formatClock } from './clock';

const moment = new Date('2026-11-04T10:05:00Z');

describe('formatClock', () => {
	it('renders 24h time and the UTC offset for the zone', () => {
		expect(formatClock(moment, 'Asia/Tbilisi')).toEqual({ time: '14:05', offset: 'UTC+4' });
	});

	it('says UTC for a zero offset', () => {
		expect(formatClock(moment, 'UTC')).toEqual({ time: '10:05', offset: 'UTC' });
	});

	it('falls back to UTC for an unknown zone', () => {
		expect(formatClock(moment, 'Mars/Olympus_Mons')).toEqual({ time: '10:05', offset: 'UTC' });
	});
});
