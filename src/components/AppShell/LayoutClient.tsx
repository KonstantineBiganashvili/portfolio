'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';
import Header from './Header';
import Footer from './Footer';
import ProjectModal from './ProjectModal';
import styles from './appShell.module.css';
import { projectsData } from '@/constants/projects';

export default function LayoutClient({
	children,
}: {
	children: React.ReactNode;
}) {
	const router = useRouter();
	const searchParams = useSearchParams();
	const [mounted, setMounted] = useState(false);
	const [selectedProject, setSelectedProject] = useState<
		(typeof projectsData)[0] | null
	>(null);

	useEffect(() => {
		setMounted(true);
	}, []);

	const projectId = useMemo(
		() => (mounted ? searchParams.get('project') : null),
		[mounted, searchParams],
	);

	useEffect(() => {
		if (!mounted) return;
		if (projectId) {
			const project = projectsData.find((p) => p.id === projectId);
			setSelectedProject(project || null);
		} else {
			setSelectedProject(null);
		}
	}, [mounted, projectId]);

	const closeModal = () => router.push('/', { scroll: false });

	return (
		<main className={styles.main}>
			<Header />
			<div className={styles.content}>{children}</div>
			<Footer />
			{mounted && (
				<ProjectModal
					project={selectedProject}
					isOpen={!!selectedProject}
					onClose={closeModal}
				/>
			)}
		</main>
	);
}
