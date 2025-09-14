'use client';

import React from 'react';
import Modal from '@/components/common/Modal';
import Badge from '@/components/common/Badge';
import Link from 'next/link';
import styles from './projectModal.module.css';
import { ExternalLink } from 'lucide-react';

interface ProjectData {
	id: number;
	title: string;
	shortDescription: string;
	fullDescription: string;
	technologies: string[];
	infrastructure: string;
	status: string;
	liveUrl: string;
	details: {
		frontend: string;
		backend: string;
		devops: string;
	};
}

interface ProjectModalProps {
	project: ProjectData | null;
	isOpen: boolean;
	onClose: () => void;
}

function ProjectModal({ project, isOpen, onClose }: ProjectModalProps) {
	return (
		<Modal isOpen={isOpen} onClose={onClose} title={project?.title || ''}>
			{project && (
				<>
					<p className={styles.modalDescription}>{project.fullDescription}</p>

					<div className={styles.modalSection}>
						<h4 className={styles.modalSectionTitle}>Technologies Used</h4>
						<div className={styles.modalTechnologies}>
							{project.technologies.map((tech, index) => (
								<Badge key={index} variant='outline'>
									{tech}
								</Badge>
							))}
						</div>
					</div>

					<div className={styles.modalSection}>
						<h4 className={styles.modalSectionTitle}>Infrastructure</h4>
						<p className={styles.modalInfrastructure}>
							{project.infrastructure}
						</p>
					</div>

					<div className={styles.modalSection}>
						<h4 className={styles.modalSectionTitle}>Technical Details</h4>

						<div className={styles.modalDetails}>
							<div className={styles.modalDetailItem}>
								<h5>Frontend Development</h5>
								<p>{project.details.frontend}</p>
							</div>

							<div className={styles.modalDetailItem}>
								<h5>Backend & Infrastructure</h5>
								<p>{project.details.backend}</p>
							</div>

							<div className={styles.modalDetailItem}>
								<h5>DevOps & Deployment</h5>
								<p>{project.details.devops}</p>
							</div>
						</div>
					</div>

					<div className={styles.modalFooter}>
						<Link
							href={project.liveUrl}
							target='_blank'
							rel='noopener noreferrer'
							className={styles.modalActionButton}
						>
							<ExternalLink size={16} />
							Visit Live Site
						</Link>
					</div>
				</>
			)}
		</Modal>
	);
}

export default ProjectModal;
