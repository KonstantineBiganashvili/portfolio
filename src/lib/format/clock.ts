/** "14:32" and "UTC+4" for a moment in an IANA time zone. Falls back to UTC for unknown zones. */
export function formatClock(date: Date, timeZone: string): { time: string; offset: string } {
	const zone = isValidZone(timeZone) ? timeZone : 'UTC';
	const time = new Intl.DateTimeFormat('en-GB', { timeZone: zone, hour: '2-digit', minute: '2-digit', hour12: false }).format(date);
	const name = new Intl.DateTimeFormat('en-US', { timeZone: zone, timeZoneName: 'shortOffset' })
		.formatToParts(date)
		.find((p) => p.type === 'timeZoneName')?.value;
	const offset = !name || name === 'GMT' ? 'UTC' : name.replace('GMT', 'UTC');
	return { time, offset };
}

function isValidZone(zone: string): boolean {
	try {
		new Intl.DateTimeFormat('en-US', { timeZone: zone });
		return true;
	} catch {
		return false;
	}
}
