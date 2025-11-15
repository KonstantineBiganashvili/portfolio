'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import { useMemo } from 'react';
import Header from './Header';
import Footer from './Footer';
import ProjectModal from './ProjectModal';
import styles from './appShell.module.css';
import { usePortfolio } from '@/contexts/PortfolioContext';

export default function LayoutClient({
	children,
}: {
	children: React.ReactNode;
}) {
	const router = useRouter();
	const searchParams = useSearchParams();
	const {
		pageData: {
			recentWorks: { projects },
		},
	} = usePortfolio();

	const projectId = searchParams.get('project');

	const selectedProject = useMemo(() => {
		if (!projectId) return null;
		return projects.find((p) => p.id === projectId) || null;
	}, [projectId, projects]);

	const closeModal = () => router.push('/', { scroll: false });

	return (
		<main className={styles.main}>
			<Header />
			<div className={styles.content}>{children}</div>
			<Footer />
			<ProjectModal
				project={selectedProject}
				isOpen={!!selectedProject}
				onClose={closeModal}
			/>
		</main>
	);
}
