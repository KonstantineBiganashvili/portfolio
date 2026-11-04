const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'] as const;

interface YearMonth {
	year: number;
	month: number; // 0-11
}

/** Parse the YYYY-MM part of an ISO date without timezone surprises. */
function parse(iso: string): YearMonth {
	const [y, m] = iso.split('-');
	return { year: Number(y), month: Number(m) - 1 };
}

function fromDate(d: Date): YearMonth {
	return { year: d.getUTCFullYear(), month: d.getUTCMonth() };
}

export function formatMonthYear(iso: string): string {
	const { year, month } = parse(iso);
	return `${MONTHS[month]} ${year}`;
}

export function formatYearMonth(iso: string | null): string {
	if (!iso) return '';
	const { year, month } = parse(iso);
	return `${year}-${String(month + 1).padStart(2, '0')}`;
}

export function formatPeriod(start: string, end: string | null): string {
	return `${formatMonthYear(start)} – ${end ? formatMonthYear(end) : 'present'}`;
}

/** Inclusive month count rendered like kubectl's AGE column: "2y3mo", "1y", "11mo". */
export function durationLabel(start: string, end: string | null, now: Date = new Date()): string {
	const a = parse(start);
	const b = end ? parse(end) : fromDate(now);
	const months = Math.max(1, (b.year - a.year) * 12 + (b.month - a.month) + 1);
	const years = Math.floor(months / 12);
	const rest = months % 12;
	if (years === 0) return `${rest}mo`;
	return rest === 0 ? `${years}y` : `${years}y${rest}mo`;
}

export function yearsSince(iso: string, now: Date = new Date()): number {
	const a = parse(iso);
	const b = fromDate(now);
	return Math.floor(((b.year - a.year) * 12 + (b.month - a.month)) / 12);
}
