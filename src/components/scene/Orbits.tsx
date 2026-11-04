'use client';

import { useFrame } from '@react-three/fiber';
import { useEffect, useMemo, useRef } from 'react';
import { AdditiveBlending, BufferAttribute, BufferGeometry, type Group, type Mesh, Vector3 } from 'three';
import { easeOutBack, nodeDelay, quadBezier, ringPoint, type Vec3 } from '@/lib/scene/math';
import { dotTexture } from './sprite';

interface RingSpec {
	radius: number;
	tilt: Vec3;
	speed: number;
	nodes: number;
	phase: number;
	/** Index of the node drawn in beacon amber: the one doing the work right now. */
	leader: number;
}

const RINGS: RingSpec[] = [
	{ radius: 8, tilt: [0.42, 0, 0.18], speed: 0.12, nodes: 5, phase: 0, leader: 2 },
	{ radius: 10.6, tilt: [-0.3, 0.4, -0.38], speed: -0.075, nodes: 7, phase: 0.6, leader: 5 },
	{ radius: 13.2, tilt: [0.75, -0.2, 0.52], speed: 0.045, nodes: 6, phase: 1.3, leader: 0 },
];

/** Global index of each ring's first node, so start-up staggers across all rings. */
const NODE_OFFSETS = RINGS.map((_, i) => RINGS.slice(0, i).reduce((sum, r) => sum + r.nodes, 0));

const PACKETS_PER_RING = 3;
const PACKETS_START = 2.2; // seconds: traffic starts once the nodes are up
const CORE_SURFACE = 5.3;

interface Packet {
	node: number;
	t: number;
	speed: number;
	inbound: boolean;
}

function surfacePoint([x, , z]: Vec3): Vec3 {
	const len = Math.hypot(x, z) || 1;
	return [(x / len) * CORE_SURFACE, 0, (z / len) * CORE_SURFACE];
}

function Ring({ ring, offset }: { ring: RingSpec; offset: number }) {
	const spin = useRef<Group>(null);
	const nodes = useRef<(Mesh | null)[]>([]);
	const packets = useRef<Packet[]>(
		Array.from({ length: PACKETS_PER_RING }, (_, i) => ({
			node: (i * 2 + ring.leader) % ring.nodes,
			t: i / PACKETS_PER_RING,
			speed: 0.24 + 0.08 * (i % 3),
			inbound: i % 2 === 0,
		})),
	);
	const packetGeometry = useMemo(() => {
		const g = new BufferGeometry();
		g.setAttribute('position', new BufferAttribute(new Float32Array(PACKETS_PER_RING * 3), 3));
		g.setDrawRange(0, 0);
		return g;
	}, []);

	const angles = useMemo(() => Array.from({ length: ring.nodes }, (_, i) => ring.phase + (i * Math.PI * 2) / ring.nodes), [ring]);
	const loop = useMemo(() => {
		const pts = Array.from({ length: 129 }, (_, i) => new Vector3(...ringPoint(ring.radius, (i / 128) * Math.PI * 2)));
		return new BufferGeometry().setFromPoints(pts);
	}, [ring.radius]);

	// Geometries passed as props aren't disposed by R3F; free them when the canvas unmounts.
	useEffect(
		() => () => {
			loop.dispose();
			packetGeometry.dispose();
		},
		[loop, packetGeometry],
	);

	useFrame((state, delta) => {
		const t = state.clock.elapsedTime;
		if (spin.current) spin.current.rotation.y = ring.phase + t * ring.speed;

		nodes.current.forEach((m, i) => {
			if (!m) return;
			m.scale.setScalar(Math.max(0.0001, easeOutBack((t - nodeDelay(offset + i)) / 0.5)));
			m.rotation.set(t * 0.6 + i, t * 0.4, 0);
		});

		const live = t > PACKETS_START;
		const position = packetGeometry.getAttribute('position') as BufferAttribute;
		packets.current.forEach((p, i) => {
			if (live) {
				p.t += Math.min(delta, 0.1) * p.speed;
				if (p.t >= 1) {
					p.t = 0;
					p.node = (p.node + 1 + i) % ring.nodes;
					p.inbound = !p.inbound;
				}
			}
			const node = ringPoint(ring.radius, angles[p.node]!);
			const core = surfacePoint(node);
			const lift: Vec3 = [node[0] * 0.55, i % 2 ? 2.6 : -2.6, node[2] * 0.55];
			const [from, to] = p.inbound ? [node, core] : [core, node];
			position.setXYZ(i, ...quadBezier(from, lift, to, p.t));
		});
		position.needsUpdate = true;
		packetGeometry.setDrawRange(0, live ? PACKETS_PER_RING : 0);
	});

	return (
		<group rotation={ring.tilt}>
			<lineLoop geometry={loop}>
				<lineBasicMaterial color='#2c3c5a' transparent opacity={0.6} />
			</lineLoop>
			<group ref={spin}>
				{angles.map((a, i) => {
					const leader = i === ring.leader;
					return (
						<mesh
							key={a}
							ref={(el) => {
								nodes.current[i] = el;
							}}
							position={ringPoint(ring.radius, a)}
							scale={0.0001}
						>
							<octahedronGeometry args={[leader ? 0.42 : 0.32, 0]} />
							<meshStandardMaterial
								color={leader ? '#f5b544' : '#2dd4bf'}
								emissive={leader ? '#f5b544' : '#0f766e'}
								emissiveIntensity={leader ? 0.9 : 0.5}
								roughness={0.35}
								flatShading
							/>
						</mesh>
					);
				})}
				<points geometry={packetGeometry}>
					<pointsMaterial map={dotTexture()} size={0.6} color='#f5b544' transparent depthWrite={false} blending={AdditiveBlending} sizeAttenuation />
				</points>
			</group>
		</group>
	);
}

/** Three tilted orbits of worker nodes around the core, with packets travelling between them. */
export function Orbits() {
	return (
		<>
			{RINGS.map((ring, i) => (
				<Ring key={ring.radius} ring={ring} offset={NODE_OFFSETS[i]!} />
			))}
		</>
	);
}
