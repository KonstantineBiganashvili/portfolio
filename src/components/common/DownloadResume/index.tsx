'use client';

import React from 'react';
import ContactButton from '@/components/common/ContactButton';
import { FileDown } from 'lucide-react';

interface DownloadResumeProps {
	className?: string;
	children?: React.ReactNode;
}

function DownloadResume({ className, children }: DownloadResumeProps) {
	const handleDownloadResume = () => {
		const link = document.createElement('a');
		link.href = '/static/files/resume.pdf';
		link.download = 'Konstantine_Biganashvili_Resume.pdf';
		link.target = '_blank';
		link.rel = 'noopener noreferrer';

		document.body.appendChild(link);
		link.click();
		document.body.removeChild(link);
	};

	return (
		<ContactButton onClick={handleDownloadResume} className={className}>
			<FileDown size={16} />
			{children || 'Download Resume'}
		</ContactButton>
	);
}

export default DownloadResume;
