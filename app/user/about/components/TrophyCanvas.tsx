'use client';

import { Suspense, useRef } from 'react';
import type { ReactNode } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, useGLTF, Center, Environment, Lightformer, ContactShadows } from '@react-three/drei';
import type * as THREE from 'three';

const MODEL = '/asset/trophy.glb';

/* ============================================================================
 * CONFIG — spin speed, framing and lighting in one place.
 * ========================================================================== */
const CONFIG = {
  /** OrbitControls auto-rotate (desktop). Degrees-ish; drei's own unit. */
  autoRotateSpeed: 0.9,
  /** Manual spin used on touch, where OrbitControls is not mounted. rad/sec. */
  touchSpinSpeed: 0.32,
  camera: { position: [0, 1.1, 5.4] as [number, number, number], fov: 35 },
  /** Keep the trophy from being tipped upside-down while dragging. */
  polar: { min: Math.PI * 0.18, max: Math.PI * 0.62 },
  dpr: [1, 1.75] as [number, number],
  /**
   * Lighting for a metalness:1 surface. Metal has NO diffuse response — what
   * you see is almost entirely the environment reflection tinted by baseColor.
   * That makes it very easy to blow out to white: push these too high and the
   * gold clips under ACES tone mapping. Keep env intensities ~1–2 and direct
   * lights low; raise `exposure` (not intensity) if it reads too dark.
   */
  light: {
    exposure: 0.95,
    env: { key: 1.9, left: 0.9, right: 1.15, fill: 0.55 },
    ambient: 0.18,
    directional: 0.45,
  },
};

/** Loads the GLB and re-centres it — the exported node sits off-origin. */
function TrophyModel() {
  const { scene } = useGLTF(MODEL);
  return (
    <Center>
      <primitive object={scene} />
    </Center>
  );
}
// The chunk itself is lazy-loaded, so preloading here starts the model download
// the moment the section comes into view rather than on first render.
useGLTF.preload(MODEL);

/**
 * Spins its children on the Y axis. Used only when OrbitControls is absent
 * (touch), so the trophy still rotates without a control that would swallow
 * vertical page scroll.
 */
function AutoSpin({ enabled, children }: { enabled: boolean; children: ReactNode }) {
  const ref = useRef<THREE.Group>(null);
  useFrame((_, delta) => {
    if (enabled && ref.current) ref.current.rotation.y += delta * CONFIG.touchSpinSpeed;
  });
  return <group ref={ref}>{children}</group>;
}

type Props = {
  /** Desktop only — mounts OrbitControls for click-and-hold 360° rotation. */
  interactive?: boolean;
  /** Stops all rotation (prefers-reduced-motion). */
  paused?: boolean;
  /** Rendered if WebGL is unavailable. */
  fallback?: ReactNode;
};

const TrophyCanvas = ({ interactive = true, paused = false, fallback = null }: Props) => {
  const spin = !paused;

  return (
    <Canvas
      dpr={CONFIG.dpr}
      // Deliberately always-on. Gating this to 'never' while off screen saves a
      // little GPU but renders a blank canvas if the flag is ever false at mount
      // — not worth the failure mode for one small model. The canvas is only
      // mounted once the section scrolls into view anyway.
      frameloop="always"
      gl={{
        antialias: true,
        alpha: true,
        powerPreference: 'high-performance',
        toneMappingExposure: CONFIG.light.exposure,
      }}
      camera={{ position: CONFIG.camera.position, fov: CONFIG.camera.fov }}
      // On touch we never mount OrbitControls, so the canvas must not claim the
      // gesture — pan-y keeps vertical page scrolling working.
      style={{ touchAction: interactive ? 'none' : 'pan-y' }}
      fallback={fallback}
      aria-hidden="true"
    >
      <Suspense fallback={null}>
        {/* The material is metallicFactor: 1 — with direct light alone it would
            render nearly black. These Lightformers supply the reflections that
            make it read as gold, with no external HDRI fetch. */}
        <Environment resolution={256}>
          <Lightformer intensity={CONFIG.light.env.key} position={[0, 4, 2]} scale={[8, 3, 1]} color="#ffffff" />
          <Lightformer intensity={CONFIG.light.env.left} position={[-4, 1, 2]} scale={[4, 6, 1]} color="#dce6ff" />
          <Lightformer intensity={CONFIG.light.env.right} position={[4, 0, 3]} scale={[4, 6, 1]} color="#fff3d6" />
          <Lightformer intensity={CONFIG.light.env.fill} position={[0, -3, 1]} scale={[8, 3, 1]} color="#ffffff" />
        </Environment>

        <ambientLight intensity={CONFIG.light.ambient} />
        <directionalLight position={[4, 6, 4]} intensity={CONFIG.light.directional} />

        <AutoSpin enabled={spin && !interactive}>
          <TrophyModel />
        </AutoSpin>

        <ContactShadows position={[0, -1.6, 0]} opacity={0.32} scale={9} blur={2.6} far={4} resolution={256} />
      </Suspense>

      {interactive && (
        <OrbitControls
          makeDefault
          // OrbitControls pauses autoRotate while dragging and resumes on
          // release on its own — that's the spin/drag behaviour, no extra state.
          autoRotate={spin}
          autoRotateSpeed={CONFIG.autoRotateSpeed}
          enableZoom={false} // keeps the mouse wheel scrolling the page
          enablePan={false}
          minPolarAngle={CONFIG.polar.min}
          maxPolarAngle={CONFIG.polar.max}
        />
      )}
    </Canvas>
  );
};

export default TrophyCanvas;
