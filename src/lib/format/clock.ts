/** "14:32" and "UTC+4" for a moment in an IANA time zone. Falls back to UTC for unknown zones. */
export function formatClock(date: Date, timeZone: string): { time: string; offset: string } {
	const zone = isValidZone(timeZone) ? timeZone : 'UTC';
	const time = new Intl.DateTimeFormat('en-GB', { timeZone: zone, hour: '2-digit', minute: '2-digit', hour12: false }).format(date);
	const name = new Intl.DateTimeFormat('en-US', { timeZone: zone, timeZoneName: 'shortOffset' })
		.formatToParts(date)
		.find((p) => p.type === 'timeZoneName')?.value;
	return { time, offset: normalizeOffset(name) };
}

/**
 * ICU builds disagree on how they spell a zero offset ("GMT" on Windows, "GMT+0" on Linux).
 * Normalise to "UTC" / "UTC+4" / "UTC-3:30".
 */
export function normalizeOffset(name: string | undefined): string {
	const match = name?.match(/^(?:GMT|UTC)(?:([+-])(\d{1,2})(?::(\d{2}))?)?$/);
	if (!match || !match[1]) return 'UTC';
	const [, sign, hours, minutes] = match;
	if (Number(hours) === 0 && (!minutes || Number(minutes) === 0)) return 'UTC';
	return `UTC${sign}${Number(hours)}${minutes && minutes !== '00' ? `:${minutes}` : ''}`;
}

function isValidZone(zone: string): boolean {
	try {
		new Intl.DateTimeFormat('en-US', { timeZone: zone });
		return true;
	} catch {
		return false;
	}
}
