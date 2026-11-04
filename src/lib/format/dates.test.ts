import { describe, expect, it } from 'vitest';
import { durationLabel, formatMonthYear, formatPeriod, formatYearMonth, yearsSince } from './dates';

const NOW = new Date('2026-11-04T12:00:00Z');

describe('formatMonthYear', () => {
	it('formats an ISO date as short month and year', () => {
		expect(formatMonthYear('2023-05-01')).toBe('May 2023');
	});
});

describe('formatYearMonth', () => {
	it('formats an ISO date as YYYY-MM', () => {
		expect(formatYearMonth('2016-09-01')).toBe('2016-09');
	});
	it('returns an empty string for a missing date', () => {
		expect(formatYearMonth(null)).toBe('');
	});
});

describe('formatPeriod', () => {
	it('joins start and end months', () => {
		expect(formatPeriod('2023-05-01', '2025-07-31')).toBe('May 2023 – Jul 2025');
	});
	it('says "present" for an open-ended period', () => {
		expect(formatPeriod('2026-01-01', null)).toBe('Jan 2026 – present');
	});
});

describe('durationLabel', () => {
	it('counts whole months inclusively, kubectl AGE style', () => {
		expect(durationLabel('2023-05-01', '2025-07-31', NOW)).toBe('2y3mo');
	});
	it('drops the month part on exact years', () => {
		expect(durationLabel('2025-12-01', null, NOW)).toBe('1y');
	});
	it('uses months only below a year', () => {
		expect(durationLabel('2026-01-01', null, NOW)).toBe('11mo');
	});
	it('never returns less than one month', () => {
		expect(durationLabel('2026-11-01', null, NOW)).toBe('1mo');
	});
});

describe('yearsSince', () => {
	it('returns whole elapsed years', () => {
		expect(yearsSince('2019-09-01', NOW)).toBe(7);
	});
	it('does not round up before the anniversary', () => {
		expect(yearsSince('2019-12-01', NOW)).toBe(6);
	});
});
