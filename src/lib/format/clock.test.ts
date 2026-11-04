import { describe, expect, it } from 'vitest';
import { formatClock, normalizeOffset } from './clock';

describe('normalizeOffset', () => {
	it.each([
		['GMT', 'UTC'],
		['GMT+0', 'UTC'],
		['UTC+0', 'UTC'],
		['GMT-0', 'UTC'],
		['GMT+00:00', 'UTC'],
		['GMT+4', 'UTC+4'],
		['GMT-3:30', 'UTC-3:30'],
		[undefined, 'UTC'],
	])('turns %s into %s on every platform', (input, expected) => {
		expect(normalizeOffset(input)).toBe(expected);
	});
});

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
