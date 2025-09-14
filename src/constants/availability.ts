export interface AvailabilityItem {
	id: string;
	label: string;
	isAvailable: boolean;
}

export const defaultAvailability: AvailabilityItem[] = [
	{ id: 'freelance', label: 'Freelance', isAvailable: true },
	{ id: 'fulltime', label: 'Full-time', isAvailable: true },
	{ id: 'consulting', label: 'Consulting', isAvailable: true },
];
