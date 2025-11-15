'use client';

import React, { useState } from 'react';
import ContactButton from '@/components/common/ContactButton';
import { FileDown } from 'lucide-react';

interface DownloadResumeProps {
	className?: string;
	children?: React.ReactNode;
	path: string;
}

function DownloadResume({ className, children, path }: DownloadResumeProps) {
	const [isDownloading, setIsDownloading] = useState(false);

	const handleDownloadResume = async () => {
		try {
			setIsDownloading(true);

			const response = await fetch(
				`/api/download?path=${encodeURIComponent(path)}`,
			);

			if (!response.ok) {
				throw new Error('Failed to fetch resume');
			}

			const blob = await response.blob();

			const blobUrl = window.URL.createObjectURL(blob);

			const link = document.createElement('a');
			link.href = blobUrl;
			link.download = 'Konstantine_Biganashvili_Resume.pdf';
			document.body.appendChild(link);
			link.click();

			document.body.removeChild(link);
			window.URL.revokeObjectURL(blobUrl);
		} catch (error) {
			console.error('Error downloading resume:', error);
		} finally {
			setIsDownloading(false);
		}
	};

	return (
		<ContactButton
			onClick={handleDownloadResume}
			className={className}
			disabled={isDownloading}
		>
			<FileDown size={16} />
			{children || (isDownloading ? 'Downloading...' : 'Download Resume')}
		</ContactButton>
	);
}

export default DownloadResume;
