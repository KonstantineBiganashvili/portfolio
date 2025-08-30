'use client';

import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import UFO from '../../../common/svgs/UFO';
import styles from './animatedTimeline.module.css';

if (typeof window !== 'undefined') {
	gsap.registerPlugin(ScrollTrigger);
}

function AnimatedTimeline({ containerRef }: AnimatedTimelineProps) {
	const timelineRef = useRef<HTMLDivElement>(null);
	const progressRef = useRef<HTMLDivElement>(null);
	const ufoRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (
			!timelineRef.current ||
			!progressRef.current ||
			!containerRef.current ||
			!ufoRef.current
		)
			return;

		const progress = progressRef.current;
		const container = containerRef.current;
		const ufo = ufoRef.current;

		gsap.set(progress, { height: '0%' });
		gsap.set(ufo, { opacity: 1, scale: 1 });

		ufo.classList.add(styles.active);

		const tl = gsap.timeline({
			scrollTrigger: {
				trigger: container,
				start: 'top center',
				end: 'bottom center',
				scrub: 1,
				onUpdate: (self) => {
					const progressValue = self.progress;
					if (progressValue > 0.1) {
						gsap.to(progress, {
							boxShadow: '0 0 30px rgba(14, 165, 233, 0.8)',
							duration: 0.3,
						});
					}
				},
			},
		});

		const timelineHeight = timelineRef.current?.offsetHeight || 1965;

		tl.fromTo(progress, { height: '0%' }, { height: '100%', ease: 'none' }, 0);

		tl.fromTo(
			ufo,
			{ y: 0 },
			{ y: timelineHeight + 12, ease: 'none' },
			0,
		);

		return () => {
			ScrollTrigger.getAll().forEach((trigger) => {
				if (trigger.trigger === container) {
					trigger.kill();
				}
			});
		};
	}, [containerRef]);

	return (
		<div ref={timelineRef} className={styles.timelineContainer}>
			<div className={styles.timelineBackground} />
			<div ref={progressRef} className={styles.timelineProgress} />
			<div ref={ufoRef} className={styles.ufoContainer}>
				<UFO width={24} height={24} fill='var(--theme-secondary)' />
			</div>
		</div>
	);
}

export default AnimatedTimeline;

interface AnimatedTimelineProps {
	containerRef: React.RefObject<HTMLDivElement | null>;
}
