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
import { usePortfolio } from '@/contexts/PortfolioContext';

const icons = {
	Home: Home,
	User: User,
	Code: Code,
	TrendingUp: TrendingUp,
	Mail: Mail,
	Github: Github,
	GitHub: Github,
	Linkedin: Linkedin,
	Email: Mail,
};

function Header() {
	const [isVisible, setIsVisible] = useState(true);
	const [lastScrollY, setLastScrollY] = useState(0);
	const {
		pageData: { header },
	} = usePortfolio();

	useEffect(() => {
		const handleScroll = () => {
			const currentScrollY = window.scrollY;

			if (currentScrollY < 10) {
				setIsVisible(true);
			} else if (currentScrollY > lastScrollY && currentScrollY > 100) {
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
					{header.navigation.map((item) => {
						const IconComponent = icons[item.icon as keyof typeof icons];

						return (
							<button
								key={item.label}
								className={styles.navLink}
								onClick={() => scrollToSection(item.path)}
							>
								{IconComponent && <IconComponent size={16} />}
								<span>{item.label}</span>
							</button>
						);
					})}
				</nav>

				<div className={styles.headerActions}>
					<div className={styles.divider}></div>
					<ThemeSwitch />
					<div className={styles.socialLinks}>
						{header.socials.map((item) => {
							const IconComponent = icons[item.icon as keyof typeof icons];

							return (
								<Link
									key={item.label}
									href={item.path}
									target='_blank'
									rel='noopener noreferrer'
									className={styles.socialLink}
									title={item.label}
								>
									{IconComponent && <IconComponent size={18} />}
								</Link>
							);
						})}
					</div>
				</div>
			</div>
		</div>
	);
}

export default Header;
