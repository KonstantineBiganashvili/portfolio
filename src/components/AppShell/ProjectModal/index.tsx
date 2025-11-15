'use client';

import React from 'react';
import Modal from '@/components/common/Modal';
import Badge from '@/components/common/Badge';
import Link from 'next/link';
import styles from './projectModal.module.css';
import { ExternalLink } from 'lucide-react';
import type { ProjectData } from '@/types/portfolio';

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
					<p className={styles.modalDescription}>{project.long_description}</p>

					<div className={styles.modalSection}>
						<h4 className={styles.modalSectionTitle}>
							{project.technologies_title}
						</h4>
						<div className={styles.modalTechnologies}>
							{project.technologies.map((tech, index) => (
								<Badge key={index} variant='outline'>
									{tech}
								</Badge>
							))}
						</div>
					</div>

					<div className={styles.modalSection}>
						<h4 className={styles.modalSectionTitle}>Technical Details</h4>
						{project.technical_details.map((detail) => (
							<div key={detail.title} className={styles.modalDetailItem}>
								<h5>{detail.title}</h5>
								<p>{detail.description}</p>
							</div>
						))}
					</div>

					<div className={styles.modalFooter}>
						<Link
							href={project.live_url}
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
