'use client';

import dynamic from 'next/dynamic';
import { useEffect, useRef, useState } from 'react';
import styles from './scene.module.css';

// three.js only loads in the browser, after first paint.
const Scene = dynamic(() => import('./Scene'), { ssr: false, loading: () => null });

type Mode = 'pending' | 'static' | 'live';

function supportsWebGL(): boolean {
	try {
		const canvas = document.createElement('canvas');
		const gl = canvas.getContext('webgl2') ?? canvas.getContext('webgl');
		if (!gl) return false;
		// Release the probe context straight away: browsers cap live WebGL contexts per page.
		gl.getExtension('WEBGL_lose_context')?.loseContext();
		return true;
	} catch {
		return false;
	}
}

/**
 * Decides whether the hero gets the live cluster or the static poster:
 * reduced motion or no WebGL means poster; the canvas only renders frames while the hero is on screen.
 */
export function SceneMount() {
	const ref = useRef<HTMLDivElement>(null);
	const [mode, setMode] = useState<Mode>('pending');
	const [onScreen, setOnScreen] = useState(true);

	useEffect(() => {
		const reduce = window.matchMedia('(prefers-reduced-motion: reduce)');
		if (reduce.matches || !supportsWebGL()) {
			setMode('static');
			return;
		}
		const start = () => setMode('live');
		const idle = 'requestIdleCallback' in window ? window.requestIdleCallback(start, { timeout: 1200 }) : null;
		const timer = idle === null ? window.setTimeout(start, 250) : null;
		const onChange = (e: MediaQueryListEvent) => setMode(e.matches ? 'static' : 'live');
		reduce.addEventListener('change', onChange);
		return () => {
			if (idle !== null) window.cancelIdleCallback(idle);
			if (timer !== null) window.clearTimeout(timer);
			reduce.removeEventListener('change', onChange);
		};
	}, []);

	useEffect(() => {
		const el = ref.current;
		if (!el) return;
		const io = new IntersectionObserver(([entry]) => setOnScreen(Boolean(entry?.isIntersecting)));
		io.observe(el);
		return () => io.disconnect();
	}, []);

	return (
		<div ref={ref} className={styles.mount} data-mode={mode} aria-hidden='true'>
			<div className={styles.poster}>
				<span className={styles.posterCore} />
				<span className={styles.posterRing} />
				<span className={`${styles.posterRing} ${styles.posterRing2}`} />
			</div>
			{mode === 'live' ? <Scene active={onScreen} /> : null}
		</div>
	);
}
