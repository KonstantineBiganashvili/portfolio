'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Custom404() {
	const router = useRouter();

	useEffect(() => {
		router.replace('/');
	}, [router]);

	return (
		<div
			style={{
				display: 'flex',
				justifyContent: 'center',
				alignItems: 'center',
				height: '100vh',
				fontFamily: 'system-ui, sans-serif',
			}}
		>
			<p>Redirecting to home page...</p>
		</div>
	);
}
