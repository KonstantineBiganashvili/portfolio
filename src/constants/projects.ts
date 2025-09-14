export const projectsData = [
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
		image: '/static/images/projects/exists-ai.webp',
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
		image: '/static/images/projects/app-exists-ai.webp',
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
