'use client';

import React from 'react';
import styles from './recentWorks.module.css';
import Badge from '@/components/common/Badge';
import Link from 'next/link';
import { ExternalLink, Eye, LinkIcon } from 'lucide-react';
import { projectsData } from '@/constants/projects';

function RecentWorks() {
	return (
		<div className={styles.recentWorksWrapper} id='recentWorks'>
			<div className={styles.recentWorksHeader}>
				<h2 className={styles.recentWorksTitle}>Recent Works</h2>
				<p className={styles.recentWorksSubtitle}>
					Professional projects showcasing full-stack development and cloud
					infrastructure expertise
				</p>
			</div>

			<div className={styles.projectsGrid}>
				{projectsData.map((project) => (
					<div key={project.id} className={styles.projectCard}>
						<div className={styles.projectImage}>
							<iframe
								src={project.liveUrl}
								className={styles.projectIframe}
								title={`${project.title} preview`}
								sandbox='allow-scripts allow-same-origin allow-forms allow-popups'
								loading='lazy'
								onError={() => {
									console.log('Error loading iframe');
								}}
							/>
							<div className={styles.projectImageOverlay}>
								<Link
									href={project.liveUrl}
									target='_blank'
									rel='noopener noreferrer'
									className={styles.overlayContent}
								>
									<LinkIcon size={48} color='white' />
									<span className={styles.overlayText}>Click to explore</span>
								</Link>
							</div>
							<div className={styles.projectStatus}>
								<span
									className={`${styles.statusBadge} ${styles[project.status]}`}
								>
									{project.status === 'live' ? 'Live' : 'In Development'}
								</span>
							</div>
						</div>
						<div className={styles.projectContent}>
							<h4 className={styles.projectTitle}>{project.title}</h4>
							<p className={styles.projectDescription}>
								{project.shortDescription}
							</p>
							<div className={styles.projectTechnologies}>
								{project.technologies.slice(0, 4).map((tech, index) => (
									<Badge key={index} variant='secondary'>
										{tech}
									</Badge>
								))}
							</div>
							<div className={styles.projectActions}>
								<Link
									href={`/?project=${project.id}`}
									scroll={false}
									className={styles.actionButton}
								>
									<Eye size={16} />
									View Details
								</Link>
								<a
									href={project.liveUrl}
									target='_blank'
									rel='noopener noreferrer'
									className={styles.actionButtonSecondary}
								>
									<ExternalLink size={16} />
									Visit Site
								</a>
							</div>
						</div>
					</div>
				))}
			</div>

			<div className={styles.explanation}>
				<p>
					Both projects were developed for <strong>Exists</strong>, where I was
					responsible for the complete infrastructure setup on AWS and GCP,
					full-stack development, and deployment automation. The projects
					demonstrate expertise in modern web technologies, 3D graphics,
					real-time systems, and cloud architecture.
				</p>
			</div>
		</div>
	);
}

export default RecentWorks;
