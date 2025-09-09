import React from 'react';
import styles from './header.module.css';
import Logo from '@/components/common/svgs/Logo';
import ThemeSwitch from '@/components/common/ThemeSwitch';

function Header() {


	return (
		<div className={styles.headerWrapper}>
			<div className={styles.headerContent}>
				<Logo width={60} height={60} />
				<ThemeSwitch />
			</div>
		</div>
	);
}

export default Header;

