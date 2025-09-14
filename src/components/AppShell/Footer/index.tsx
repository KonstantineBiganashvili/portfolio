'use client';

import React from 'react';
import Link from 'next/link';
import styles from './footer.module.css';
import { Binary, Github, Linkedin, Mail, MapPin, ArrowUp } from 'lucide-react';

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
						<p className={styles.brandDescription}>
							Crafting digital experiences that bridge creativity and
							functionality. Passionate about building the future of web
							applications.
						</p>
						<div className={styles.socialLinks}>
							<Link
								href='https://github.com/KonstantineBiganashvili'
								target='_blank'
								rel='noopener noreferrer'
								className={styles.socialLink}
								title='GitHub'
							>
								<Github size={20} />
							</Link>
							<Link
								href='https://www.linkedin.com/in/konstantine-biganashvili-553a20246/'
								target='_blank'
								rel='noopener noreferrer'
								className={styles.socialLink}
								title='LinkedIn'
							>
								<Linkedin size={20} />
							</Link>
							<Link
								href='mailto:contact@biganashvili.dev'
								className={styles.socialLink}
								title='Email'
							>
								<Mail size={20} />
							</Link>
						</div>
					</div>

					<div className={styles.navigationSection}>
						<h3 className={styles.sectionTitle}>Navigation</h3>
						<nav className={styles.footerNav}>
							<button
								className={styles.navLink}
								onClick={() => scrollToSection('introduction')}
							>
								Home
							</button>
							<button
								className={styles.navLink}
								onClick={() => scrollToSection('aboutMe')}
							>
								About
							</button>
							<button
								className={styles.navLink}
								onClick={() => scrollToSection('recentWorks')}
							>
								Projects
							</button>
							<button
								className={styles.navLink}
								onClick={() => scrollToSection('myJourney')}
							>
								Journey
							</button>
							<button
								className={styles.navLink}
								onClick={() => scrollToSection('contact')}
							>
								Contact
							</button>
						</nav>
					</div>

					<div className={styles.contactSection}>
						<h3 className={styles.sectionTitle}>Get in Touch</h3>
						<div className={styles.contactInfo}>
							<div className={styles.contactItem}>
								<Mail size={16} />
								<Link href='mailto:contact@biganashvili.dev'>
									contact@biganashvili.dev
								</Link>
							</div>
							<div className={styles.contactItem}>
								<MapPin size={16} />
								<span>Tbilisi, Georgia</span>
							</div>
							<div className={styles.availabilityStatus}>
								<div className={styles.availabilityDot}></div>
								<span>Available for work</span>
							</div>
						</div>
					</div>
				</div>

				<div className={styles.footerBottom}>
					<div className={styles.copyright}>
						© 2025 Biganashvili.dev
					</div>
					<button className={styles.backToTop} onClick={scrollToTop}>
						Back to Top
						<ArrowUp size={16} />
					</button>
				</div>
			</div>
		</footer>
	);
}

export default Footer;
