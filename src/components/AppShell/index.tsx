import { Suspense } from 'react';
import LayoutClient from './LayoutClient';

export default function AppShell({ children }: { children: React.ReactNode }) {
	return (
		<Suspense fallback={null}>
			<LayoutClient>{children}</LayoutClient>
		</Suspense>
	);
}
