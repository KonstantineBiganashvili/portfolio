'use client';

import Image from 'next/image';
import styles from './recentWorks.module.css';
import Badge from '@/components/common/Badge';
import Link from 'next/link';
import { ExternalLink, Eye, LinkIcon } from 'lucide-react';
import { usePortfolio } from '@/contexts/PortfolioContext';
import buildCmsUrl from '@/utils/buildCmsUrl';

function RecentWorks() {
	const {
		pageData: { recentWorks },
		cmsUrl,
	} = usePortfolio();

	return (
		<div className={styles.recentWorksWrapper} id='recentWorks'>
			<div className={styles.recentWorksHeader}>
				<h2 className={styles.recentWorksTitle}>{recentWorks.page_title}</h2>
				<p className={styles.recentWorksSubtitle}>{recentWorks.subtext}</p>
			</div>

			<div className={styles.projectsGrid}>
				{recentWorks.projects.map((project) => (
					<div key={project.id} className={styles.projectCard}>
						<div className={styles.projectImage}>
							<Image
								src={buildCmsUrl(project.thumbnail, cmsUrl)}
								alt={`${project.title} preview`}
								fill
								className={styles.projectImageElement}
								sizes='(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw'
								priority={true}
							/>
							<div className={styles.projectImageOverlay}>
								<Link
									href={project.live_url}
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
								{project.short_description}
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
									{recentWorks.card_view_title}
								</Link>
								<a
									href={project.live_url}
									target='_blank'
									rel='noopener noreferrer'
									className={styles.actionButtonSecondary}
								>
									<ExternalLink size={16} />
									{recentWorks.card_live_title}
								</a>
							</div>
						</div>
					</div>
				))}
			</div>

			<div className={styles.explanation}>
				<p dangerouslySetInnerHTML={{ __html: recentWorks.additional_info }} />
			</div>
		</div>
	);
}

export default RecentWorks;
