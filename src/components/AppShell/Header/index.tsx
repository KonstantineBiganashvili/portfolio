'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import styles from './header.module.css';
import ThemeSwitch from '@/components/common/ThemeSwitch';
import {
	Binary,
	Home,
	User,
	Code,
	TrendingUp,
	Mail,
	Github,
	Linkedin,
} from 'lucide-react';

function Header() {
	const [isVisible, setIsVisible] = useState(true);
	const [lastScrollY, setLastScrollY] = useState(0);

	useEffect(() => {
		const handleScroll = () => {
			const currentScrollY = window.scrollY;

			if (currentScrollY < 10) {
				setIsVisible(true);
			}
			else if (currentScrollY > lastScrollY && currentScrollY > 100) {
				setIsVisible(false);
			} else if (currentScrollY < lastScrollY) {
				setIsVisible(true);
			}

			setLastScrollY(currentScrollY);
		};

		window.addEventListener('scroll', handleScroll, { passive: true });

		return () => {
			window.removeEventListener('scroll', handleScroll);
		};
	}, [lastScrollY]);

	const scrollToSection = (sectionId: string) => {
		const element = document.getElementById(sectionId);
		if (element) {
			element.scrollIntoView({ behavior: 'smooth' });
		}
	};

	return (
		<div
			className={`${styles.headerWrapper} ${
				!isVisible ? styles.headerHidden : ''
			}`}
		>
			<div className={styles.headerContent}>
				<Link href='/' className={styles.logoLink}>
					<div className={styles.logoIcon}>
						<Binary size={20} />
					</div>
					<span className={styles.logoText}>Biganashvili.dev</span>
				</Link>

				<nav className={styles.navigation}>
					<button
						className={styles.navLink}
						onClick={() => scrollToSection('introduction')}
					>
						<Home size={16} />
						<span>Home</span>
					</button>
					<button
						className={styles.navLink}
						onClick={() => scrollToSection('aboutMe')}
					>
						<User size={16} />
						<span>About</span>
					</button>
					<button
						className={styles.navLink}
						onClick={() => scrollToSection('recentWorks')}
					>
						<Code size={16} />
						<span>Projects</span>
					</button>
					<button
						className={styles.navLink}
						onClick={() => scrollToSection('myJourney')}
					>
						<TrendingUp size={16} />
						<span>Journey</span>
					</button>
					<button
						className={styles.navLink}
						onClick={() => scrollToSection('contact')}
					>
						<Mail size={16} />
						<span>Contact</span>
					</button>
				</nav>

				<div className={styles.headerActions}>
					<div className={styles.divider}></div>
					<ThemeSwitch />
					<div className={styles.socialLinks}>
						<Link
							href='https://github.com/KonstantineBiganashvili'
							target='_blank'
							rel='noopener noreferrer'
							className={styles.socialLink}
							title='GitHub'
						>
							<Github size={18} />
						</Link>
						<Link
							href='https://www.linkedin.com/in/konstantine-biganashvili-553a20246/'
							target='_blank'
							rel='noopener noreferrer'
							className={styles.socialLink}
							title='LinkedIn'
						>
							<Linkedin size={18} />
						</Link>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Header;
