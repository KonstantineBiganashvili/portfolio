'use client';

import React, { useState } from 'react';
import styles from './recentWorks.module.css';
import Badge from '@/components/common/Badge';
import Modal from '@/components/common/Modal';

const projectsData = [
	{
		id: 1,
		title: 'Exists.ai Landing',
		shortDescription:
			'Modern AI-powered landing page showcasing innovative solutions with smooth animations and responsive design.',
		fullDescription:
			'A cutting-edge landing page built for Exists.ai, featuring modern design principles and smooth user interactions. The site showcases AI solutions with engaging animations and a fully responsive layout that works seamlessly across all devices.',
		technologies: ['Next.js', 'Tailwind CSS', 'GSAP', 'TypeScript'],
		infrastructure: 'AWS (EC2, S3, CloudFront, Route 53, Formspree)',
		status: 'live',
		liveUrl: 'https://exists.ai',
		details: {
			frontend:
				'Built with Next.js 14 and TypeScript for type safety and performance. Styled with Tailwind CSS for rapid development and consistent design. GSAP animations provide smooth, engaging user interactions.',
			backend:
				'Serverless architecture using AWS Lambda for contact forms and API endpoints. Formspree for contact form submissions.',
			devops:
				'Deployed on AWS with EC2 for hosting, S3 for static assets, CloudFront CDN for global distribution, and Route 53 for DNS management. CI/CD pipeline automated with GitHub Actions.',
		},
	},
	{
		id: 2,
		title: 'App.Exists.ai Platform',
		shortDescription:
			'Comprehensive AI application platform with advanced 3D world map representation connected to Unreal Engine, real-time pixel streaming, and content management.',
		fullDescription:
			'A sophisticated web application platform featuring advanced 3D graphics, real-time collaboration tools, and comprehensive content management. Built with modern technologies and deployed on Google Cloud Platform for scalability and performance.',
		technologies: [
			'Next.js',
			'Three.js',
			'Fabric.js',
			'GSAP',
			'Tailwind CSS',
			'NestJS',
			'Supabase',
			'Unreal Engine',
			'Pixel Streaming',
			'WebRTC',
		],
		infrastructure:
			'GCP (Cloud Run, Cloud Build, Cloud Storage, IAM), Supabase, MediaCMS',
		status: 'live',
		liveUrl: 'https://app.exists.ai',
		details: {
			frontend:
				'Advanced React application using Next.js, React Three Fiber for 3D map representation, Fabric.js for canvas manipulation, and GSAP for complex animations. Responsive design with Tailwind CSS.',
			backend:
				'Robust NestJS API with Supabase integration for real-time data, authentication. Custom CMS built from open-source solution and refactored for specific business needs.',
			devops:
				'Deployed on Google Cloud Platform using Cloud Run for containerized applications, Cloud Build for CI/CD, Cloud Storage for assets, and Supabase for database management.',
		},
	},
];

function RecentWorks() {
	const [selectedProject, setSelectedProject] = useState<
		(typeof projectsData)[0] | null
	>(null);

	const openModal = (project: (typeof projectsData)[0]) => {
		setSelectedProject(project);
	};

	const closeModal = () => {
		setSelectedProject(null);
	};

	return (
		<div className={styles.recentWorksWrapper}>
			<div className={styles.recentWorksHeader}>
				<h2 className={styles.recentWorksTitle}>Recent Works</h2>
				<p className={styles.recentWorksSubtitle}>
					Professional projects showcasing full-stack development and cloud
					infrastructure expertise
				</p>
			</div>

			<div className={styles.projectsGrid}>
				{projectsData.map((project) => (
					<div
						key={project.id}
						className={styles.projectCard}
						onClick={() => openModal(project)}
					>
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
								<div className={styles.overlayContent}>
									<div className={styles.playIcon}>🔗</div>
									<span className={styles.overlayText}>Click to explore</span>
								</div>
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
								<button className={styles.actionButton}>
									<span className={styles.actionIcon}>👁️</span>
									View Details
								</button>
								<a
									href={project.liveUrl}
									target='_blank'
									rel='noopener noreferrer'
									className={styles.actionButtonSecondary}
									onClick={(e) => e.stopPropagation()}
								>
									<span className={styles.actionIcon}>🔗</span>
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

			<Modal
				isOpen={!!selectedProject}
				onClose={closeModal}
				title={selectedProject?.title || ''}
			>
				{selectedProject && (
					<>
						<p className={styles.modalDescription}>
							{selectedProject.fullDescription}
						</p>

						<div className={styles.modalSection}>
							<h4 className={styles.modalSectionTitle}>Technologies Used</h4>
							<div className={styles.modalTechnologies}>
								{selectedProject.technologies.map((tech, index) => (
									<Badge key={index} variant='outline'>
										{tech}
									</Badge>
								))}
							</div>
						</div>

						<div className={styles.modalSection}>
							<h4 className={styles.modalSectionTitle}>Infrastructure</h4>
							<p className={styles.modalInfrastructure}>
								{selectedProject.infrastructure}
							</p>
						</div>

						<div className={styles.modalSection}>
							<h4 className={styles.modalSectionTitle}>Technical Details</h4>

							<div className={styles.modalDetails}>
								<div className={styles.modalDetailItem}>
									<h5>Frontend Development</h5>
									<p>{selectedProject.details.frontend}</p>
								</div>

								<div className={styles.modalDetailItem}>
									<h5>Backend & Infrastructure</h5>
									<p>{selectedProject.details.backend}</p>
								</div>

								<div className={styles.modalDetailItem}>
									<h5>DevOps & Deployment</h5>
									<p>{selectedProject.details.devops}</p>
								</div>
							</div>
						</div>

						<div className={styles.modalFooter}>
							<a
								href={selectedProject.liveUrl}
								target='_blank'
								rel='noopener noreferrer'
								className={styles.modalActionButton}
							>
								<span className={styles.actionIcon}>🔗</span>
								Visit Live Site
							</a>
						</div>
					</>
				)}
			</Modal>
		</div>
	);
}

export default RecentWorks;
