'use client';

import React, { useState, useEffect } from 'react';
import { PopupButton } from 'react-calendly';
import styles from './calendlyForm.module.css';

interface CalendlyFormProps {
	url: string;
	primaryColor?: string;
	textColor?: string;
	backgroundColor?: string;
}

function CalendlyForm({
	url,
	primaryColor = '0f4c75',
	textColor = 'ffffff',
	backgroundColor = 'ffffff',
}: CalendlyFormProps) {
	const [isMounted, setIsMounted] = useState(false);

	useEffect(() => {
		setIsMounted(true);
	}, []);

	return (
		<div className={styles.calendlySection}>
			<h3 className={styles.calendlyTitle}>Schedule a Call</h3>
			<p className={styles.calendlyDescription}>
				Prefer to talk directly? Book a convenient time for us to discuss your
				project.
			</p>
			{isMounted ? (
				<PopupButton
					url={url}
					rootElement={document.getElementById('__next') || document.body}
					text='Schedule Meeting'
					className={styles.calendlyButton}
					pageSettings={{
						hideEventTypeDetails: false,
						hideLandingPageDetails: false,
						primaryColor: primaryColor,
						textColor: textColor,
						backgroundColor: backgroundColor,
					}}
				/>
			) : (
				<button className={styles.calendlyButton} disabled>
					Schedule Meeting
				</button>
			)}
		</div>
	);
}

export default CalendlyForm;
