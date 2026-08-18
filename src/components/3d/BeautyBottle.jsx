import React, { useRef, useMemo } from 'react';
import { useFrame }               from '@react-three/fiber';
import { MeshTransmissionMaterial } from '@react-three/drei';
import * as THREE                  from 'three';

/**
 * AURELÉ — Procedural Glass Serum Bottle
 *
 * Geometry: LatheGeometry creates a rotationally-symmetric profile from a
 * hand-crafted set of 2D cross-section points.
 * The profile is designed to mimic a high-end serum / perfume bottle with:
 *   • A flat base with a slight bevel
 *   • A nearly parallel body
 *   • A clear shoulder curve
 *   • A thin, elegant neck
 *
 * Animation: Driven by a `scrollProgress` ref passed from Hero.
 * Uses `useFrame` (R3F) — NOT GSAP — for reading progress inside Canvas.
 */
const BeautyBottle = ({ scrollProgress }) => {
  const groupRef = useRef();

  // ── Lathe profile points (radius x, height y) ────────────────
  const bottlePoints = useMemo(() => [
    // Close bottom centre
    new THREE.Vector2(0.000, -0.02),
    // Base edge
    new THREE.Vector2(0.480, -0.02),
    new THREE.Vector2(0.500,  0.00),
    // Base bevel → body
    new THREE.Vector2(0.500,  0.10),
    new THREE.Vector2(0.480,  0.18),
    // Body — nearly parallel sides
    new THREE.Vector2(0.470,  0.55),
    new THREE.Vector2(0.470,  1.00),
    new THREE.Vector2(0.470,  1.35),
    // Shoulder curve
    new THREE.Vector2(0.450,  1.50),
    new THREE.Vector2(0.340,  1.68),
    // Neck
    new THREE.Vector2(0.220,  1.80),
    new THREE.Vector2(0.200,  1.90),
    new THREE.Vector2(0.200,  2.08),
  ], []);

  // ── Cap profile for lathe ─────────────────────────────────────
  const capPoints = useMemo(() => [
    new THREE.Vector2(0.000, 0.00),
    new THREE.Vector2(0.235, 0.00),
    new THREE.Vector2(0.250, 0.04),
    new THREE.Vector2(0.250, 0.58),
    new THREE.Vector2(0.230, 0.64),
    new THREE.Vector2(0.000, 0.70),
  ], []);

  // ── useFrame: read scroll progress & animate ─────────────────
  useFrame((state) => {
    if (!groupRef.current) return;

    const p    = scrollProgress ? scrollProgress.current : 0;
    const time = state.clock.elapsedTime;

    // Ambient float
    const floatY = Math.sin(time * 0.7) * 0.07;

    // Targets
    let tRotY = 0;
    let tPosX = 0;
    let tPosY = -0.7 + floatY;
    let tPosZ = 0;

    if (p < 0.12) {
      // 0–12 %: idle — bottle centred, floating
      tRotY = Math.sin(time * 0.3) * 0.05;  // very slow drift rotation
    } else if (p < 0.55) {
      // 12–55 %: rotate & camera-zoom (Z move)
      const t = (p - 0.12) / 0.43;
      tRotY = t * Math.PI * 1.3;
      tPosZ = t * 2.0;
    } else if (p < 0.80) {
      // 55–80 %: slide to side as services appear
      const t = (p - 0.55) / 0.25;
      tRotY = Math.PI * 1.3 + t * 0.4;
      tPosZ = 2.0;
      tPosX = t * 2.8;
    } else {
      // 80–100 %: exit downward
      const t = (p - 0.80) / 0.20;
      tPosX = 2.8;
      tPosZ = 2.0;
      tPosY = -0.7 + floatY - t * 5.0;
    }

    // Smooth lerp toward targets
    const lerpSpeed = 0.05;
    groupRef.current.rotation.y += (tRotY - groupRef.current.rotation.y) * lerpSpeed;
    groupRef.current.position.x += (tPosX - groupRef.current.position.x) * lerpSpeed;
    groupRef.current.position.y += (tPosY - groupRef.current.position.y) * lerpSpeed;
    groupRef.current.position.z += (tPosZ - groupRef.current.position.z) * lerpSpeed;
  });

  return (
    <group ref={groupRef} position={[0, -0.7, 0]}>

      {/* ── Glass Bottle Body ───────────────────────────────── */}
      <mesh castShadow receiveShadow>
        <latheGeometry args={[bottlePoints, 80]} />
        <MeshTransmissionMaterial
          backside
          samples={4}
          thickness={0.2}
          color="#fefcf9"
          attenuationDistance={0.9}
          attenuationColor="#f5ede0"
          transparent
          opacity={0.93}
          roughness={0.04}
          ior={1.52}
          envMapIntensity={1.2}
        />
      </mesh>

      {/* ── Inner Liquid (seen through glass) ──────────────── */}
      <mesh position={[0, 0.85, 0]}>
        <cylinderGeometry args={[0.33, 0.33, 1.4, 48, 1, true]} />
        <meshPhysicalMaterial
          color="#c9a77c"
          transparent
          opacity={0.35}
          roughness={0.05}
          side={THREE.BackSide}
        />
      </mesh>

      {/* ── Liquid meniscus (flat disc at top of liquid) ─── */}
      <mesh position={[0, 1.56, 0]}>
        <circleGeometry args={[0.33, 48]} />
        <meshPhysicalMaterial
          color="#c9a77c"
          transparent
          opacity={0.5}
          roughness={0.08}
        />
      </mesh>

      {/* ── Metallic Cap ───────────────────────────────────── */}
      <mesh position={[0, 2.18, 0]} castShadow>
        <latheGeometry args={[capPoints, 64]} />
        <meshStandardMaterial
          color="#c8a86a"
          metalness={0.96}
          roughness={0.06}
          envMapIntensity={2.5}
        />
      </mesh>

      {/* ── Cap → Neck junction ring ────────────────────────── */}
      <mesh position={[0, 2.10, 0]}>
        <torusGeometry args={[0.215, 0.018, 16, 64]} />
        <meshStandardMaterial
          color="#9a7030"
          metalness={1.0}
          roughness={0.12}
        />
      </mesh>

      {/* ── Label band ──────────────────────────────────────── */}
      <mesh position={[0, 0.82, 0]}>
        <cylinderGeometry args={[0.474, 0.474, 0.48, 64, 1, true]} />
        <meshStandardMaterial
          color="#1c1a18"
          transparent
          opacity={0.88}
          roughness={0.9}
          metalness={0.0}
        />
      </mesh>

      {/* ── Subtle contact shadow plane ─────────────────────── */}
      <mesh position={[0, -0.03, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <circleGeometry args={[0.7, 64]} />
        <shadowMaterial transparent opacity={0.12} />
      </mesh>

    </group>
  );
};

export default BeautyBottle;
