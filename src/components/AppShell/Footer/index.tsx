'use client';

import Link from 'next/link';
import styles from './footer.module.css';
import { Binary, Github, Linkedin, Mail, MapPin, ArrowUp } from 'lucide-react';
import { usePortfolio } from '@/contexts/PortfolioContext';

const icons = {
	GitHub: Github,
	Linkedin: Linkedin,
	Mail: Mail,
};

function Footer() {
	const scrollToSection = (sectionId: string) => {
		const element = document.getElementById(sectionId);
		if (element) {
			element.scrollIntoView({ behavior: 'smooth' });
		}
	};

	const scrollToTop = () => {
		window.scrollTo({ top: 0, behavior: 'smooth' });
	};

	const {
		pageData: {
			footer,
			// contact: { availability_items },
		},
	} = usePortfolio();

	const mail = footer.socials.find((social) => social.label === 'Mail');
	const currentYear = new Date().getFullYear();
	// const _availability = availability_items.find(
	// 	(item: any) => item.is_available,
	// );

	return (
		<footer className={styles.footer}>
			<div className={styles.footerContent}>
				<div className={styles.footerMain}>
					<div className={styles.brandSection}>
						<Link href='/' className={styles.logoLink}>
							<div className={styles.logoIcon}>
								<Binary size={20} />
							</div>
							<span className={styles.logoText}>Biganashvili.dev</span>
						</Link>
						<p className={styles.brandDescription}>{footer.footer_subtext}</p>
						<div className={styles.socialLinks}>
							{footer.socials.map((social) => {
								const IconComponent = icons[social.icon as keyof typeof icons];

								return (
									<Link
										key={social.label}
										href={social.path}
										target='_blank'
										rel='noopener noreferrer'
										className={styles.socialLink}
										title={social.label}
									>
										<IconComponent size={20} />
									</Link>
								);
							})}
						</div>
					</div>

					<div className={styles.navigationSection}>
						<h3 className={styles.sectionTitle}>Navigation</h3>
						<nav className={styles.footerNav}>
							{footer.navigation.map((item) => {
								return (
									<button
										key={item.label}
										className={styles.navLink}
										onClick={() => scrollToSection(item.path)}
									>
										<span>{item.label}</span>
									</button>
								);
							})}
						</nav>
					</div>

					<div className={styles.contactSection}>
						<h3 className={styles.sectionTitle}>Get in Touch</h3>
						<div className={styles.contactInfo}>
							{mail && (
								<div className={styles.contactItem}>
									<Mail size={16} />
									<Link href={mail.path}>{mail.path.split(':')[1]}</Link>
								</div>
							)}
							<div className={styles.contactItem}>
								<MapPin size={16} />
								<span>{footer.location}</span>
							</div>
							<div className={styles.availabilityStatus}>
								<div className={styles.availabilityDot}></div>
								<span>{footer.availability_text}</span>
							</div>
						</div>
					</div>
				</div>

				<div className={styles.footerBottom}>
					<div className={styles.copyright}>
						© {currentYear} Biganashvili.dev
					</div>
					<button className={styles.backToTop} onClick={scrollToTop}>
						{footer.btt_btn_title}
						<ArrowUp size={16} />
					</button>
				</div>
			</div>
		</footer>
	);
}

export default Footer;
