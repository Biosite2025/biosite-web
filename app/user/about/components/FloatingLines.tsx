'use client';

import { useEffect, useRef } from 'react';
import { useReducedMotion } from 'framer-motion';
import {
  Clock,
  Mesh,
  OrthographicCamera,
  PlaneGeometry,
  Scene,
  ShaderMaterial,
  Vector3,
  WebGLRenderer,
} from 'three';

/**
 * FloatingLines — adapted from React Bits (@react-bits/FloatingLines).
 *
 * Original renders glowing lines on an opaque BLACK canvas (dark themes).
 * This build is retuned for our LIGHT About page:
 *   • the fragment shader outputs a single soft brand-blue line color on a
 *     TRANSPARENT background (premultiplied alpha), so it composites cleanly
 *     over white/tinted sections instead of painting a black box,
 *   • interaction/gradient machinery is dropped for a calm, decorative backdrop,
 *   • honors prefers-reduced-motion (renders a single static frame, no loop),
 *   • pauses the render loop while the tab is hidden.
 *
 * Mount ONCE as a fixed, full-viewport backdrop — not per section.
 */

const vertexShader = `
precision highp float;
void main() {
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`;

const fragmentShader = `
precision highp float;

uniform float iTime;
uniform vec3  iResolution;
uniform float animationSpeed;

uniform bool enableTop;
uniform bool enableMiddle;
uniform bool enableBottom;

uniform int topLineCount;
uniform int middleLineCount;
uniform int bottomLineCount;

uniform float topLineDistance;
uniform float middleLineDistance;
uniform float bottomLineDistance;

uniform vec3 topWavePosition;
uniform vec3 middleWavePosition;
uniform vec3 bottomWavePosition;

uniform vec3  uLineColor;   // main / "big" lines (middle wave)
uniform float uOpacity;
uniform vec3  uAltColor;    // secondary lines (top + bottom waves)
uniform float uAltOpacity;

mat2 rotate(float r) {
  return mat2(cos(r), sin(r), -sin(r), cos(r));
}

float wave(vec2 uv, float offset) {
  float time = iTime * animationSpeed;
  float x_movement = time * 0.1;
  float amp = sin(offset + time * 0.2) * 0.3;
  float y   = sin(uv.x + offset + x_movement) * amp;
  float d   = uv.y - y;
  // Crisp thin line. Two fixes vs the original so it stays clean on WHITE:
  //  (1) no "+ 0.01" constant floor (that smeared blue over the whole canvas),
  //  (2) subtract the reciprocal's tail so between-line gaps fall fully to zero
  //      instead of leaving a faint blue haze that reads as gray.
  float g = 0.008 / max(abs(d) + 0.004, 1e-3);
  return max(g - 0.05, 0.0);
}

void mainImage(out vec4 fragColor, in vec2 fragCoord) {
  vec2 baseUv = (2.0 * fragCoord - iResolution.xy) / iResolution.y;
  baseUv.y *= -1.0;

  float midI  = 0.0; // middle wave  -> main color (the bold "big" lines)
  float sideI = 0.0; // top + bottom -> alt color

  if (enableBottom) {
    for (int i = 0; i < 64; ++i) {
      if (i >= bottomLineCount) break;
      float fi = float(i);
      float angle = bottomWavePosition.z * log(length(baseUv) + 1.0);
      vec2 ruv = baseUv * rotate(angle);
      sideI += wave(ruv + vec2(bottomLineDistance * fi + bottomWavePosition.x, bottomWavePosition.y), 1.5 + 0.2 * fi) * 0.35;
    }
  }

  if (enableMiddle) {
    for (int i = 0; i < 64; ++i) {
      if (i >= middleLineCount) break;
      float fi = float(i);
      float angle = middleWavePosition.z * log(length(baseUv) + 1.0);
      vec2 ruv = baseUv * rotate(angle);
      midI += wave(ruv + vec2(middleLineDistance * fi + middleWavePosition.x, middleWavePosition.y), 2.0 + 0.15 * fi);
    }
  }

  if (enableTop) {
    for (int i = 0; i < 64; ++i) {
      if (i >= topLineCount) break;
      float fi = float(i);
      float angle = topWavePosition.z * log(length(baseUv) + 1.0);
      vec2 ruv = baseUv * rotate(angle);
      ruv.x *= -1.0;
      sideI += wave(ruv + vec2(topLineDistance * fi + topWavePosition.x, topWavePosition.y), 1.0 + 0.2 * fi) * 0.25;
    }
  }

  // Two-color composite (premultiplied alpha — renderer uses premultipliedAlpha).
  float aMain = clamp(midI,  0.0, 1.0) * uOpacity;
  float aAlt  = clamp(sideI, 0.0, 1.0) * uAltOpacity;
  vec3 rgb = uLineColor * aMain + uAltColor * aAlt;
  float a  = clamp(aMain + aAlt, 0.0, 1.0);
  fragColor = vec4(rgb, a);
}

void main() {
  vec4 color = vec4(0.0);
  mainImage(color, gl_FragCoord.xy);
  gl_FragColor = color;
}
`;

type WaveType = 'top' | 'middle' | 'bottom';

type FloatingLinesProps = {
  /** Main / "big" line color (middle wave) — defaults to soft brand blue. */
  lineColor?: string;
  /** Secondary line color (top + bottom waves). */
  altColor?: string;
  /** Overall opacity for the main lines (0–1). */
  opacity?: number;
  /** Opacity for the secondary (alt-color) lines. Defaults to `opacity`. */
  altOpacity?: number;
  animationSpeed?: number;
  enabledWaves?: WaveType[];
  /** Per-wave line count (array) or a single count for all waves. */
  lineCount?: number | number[];
  /** Per-wave spacing (array) or a single spacing for all waves. */
  lineDistance?: number | number[];
  className?: string;
};

function hexToVec3(hex: string): Vector3 {
  let v = hex.trim().replace('#', '');
  if (v.length === 3) v = v[0] + v[0] + v[1] + v[1] + v[2] + v[2];
  const r = parseInt(v.slice(0, 2), 16) / 255;
  const g = parseInt(v.slice(2, 4), 16) / 255;
  const b = parseInt(v.slice(4, 6), 16) / 255;
  return new Vector3(r, g, b);
}

export default function FloatingLines({
  lineColor = '#4E6AD0',
  altColor = '#EE232E',
  opacity = 0.4,
  altOpacity,
  animationSpeed = 0.8,
  enabledWaves = ['top', 'middle', 'bottom'],
  lineCount = 7,
  lineDistance = 7,
  className = '',
}: FloatingLinesProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const has = (w: WaveType) => enabledWaves.includes(w);
    const countFor = (w: WaveType) => {
      if (typeof lineCount === 'number') return lineCount;
      const i = enabledWaves.indexOf(w);
      return i >= 0 ? lineCount[i] ?? 6 : 0;
    };
    const distFor = (w: WaveType) => {
      if (typeof lineDistance === 'number') return lineDistance * 0.01;
      const i = enabledWaves.indexOf(w);
      return (i >= 0 ? lineDistance[i] ?? 5 : 5) * 0.01;
    };

    let active = true;
    const scene = new Scene();
    const camera = new OrthographicCamera(-1, 1, 1, -1, 0, 1);
    camera.position.z = 1;

    const renderer = new WebGLRenderer({ antialias: true, alpha: true, premultipliedAlpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.setClearColor(0x000000, 0);
    renderer.domElement.style.width = '100%';
    renderer.domElement.style.height = '100%';
    container.appendChild(renderer.domElement);

    const col = hexToVec3(lineColor);
    const alt = hexToVec3(altColor);
    const uniforms = {
      iTime: { value: 0 },
      iResolution: { value: new Vector3(1, 1, 1) },
      animationSpeed: { value: animationSpeed },
      enableTop: { value: has('top') },
      enableMiddle: { value: has('middle') },
      enableBottom: { value: has('bottom') },
      topLineCount: { value: has('top') ? countFor('top') : 0 },
      middleLineCount: { value: has('middle') ? countFor('middle') : 0 },
      bottomLineCount: { value: has('bottom') ? countFor('bottom') : 0 },
      topLineDistance: { value: distFor('top') },
      middleLineDistance: { value: distFor('middle') },
      bottomLineDistance: { value: distFor('bottom') },
      topWavePosition: { value: new Vector3(10.0, 0.5, -0.4) },
      middleWavePosition: { value: new Vector3(5.0, 0.0, 0.2) },
      bottomWavePosition: { value: new Vector3(2.0, -0.7, -1.0) },
      uLineColor: { value: new Vector3(col.x, col.y, col.z) },
      uOpacity: { value: opacity },
      uAltColor: { value: new Vector3(alt.x, alt.y, alt.z) },
      uAltOpacity: { value: altOpacity ?? opacity },
    };

    const material = new ShaderMaterial({ uniforms, vertexShader, fragmentShader, transparent: true });
    const geometry = new PlaneGeometry(2, 2);
    const mesh = new Mesh(geometry, material);
    scene.add(mesh);

    const clock = new Clock();

    const setSize = () => {
      if (!active) return;
      const w = container.clientWidth || 1;
      const h = container.clientHeight || 1;
      renderer.setSize(w, h, false);
      uniforms.iResolution.value.set(renderer.domElement.width, renderer.domElement.height, 1);
    };
    setSize();

    const ro = typeof ResizeObserver !== 'undefined' ? new ResizeObserver(setSize) : null;
    ro?.observe(container);

    const drawFrame = () => {
      uniforms.iTime.value = clock.getElapsedTime();
      renderer.render(scene, camera);
    };

    let raf = 0;
    const loop = () => {
      if (!active) return;
      drawFrame();
      raf = requestAnimationFrame(loop);
    };

    const onVisibility = () => {
      if (document.hidden) {
        cancelAnimationFrame(raf);
        raf = 0;
      } else if (!reducedMotion && raf === 0) {
        loop();
      }
    };

    if (reducedMotion) {
      drawFrame(); // one static frame, no animation
    } else {
      loop();
      document.addEventListener('visibilitychange', onVisibility);
    }

    return () => {
      active = false;
      cancelAnimationFrame(raf);
      document.removeEventListener('visibilitychange', onVisibility);
      ro?.disconnect();
      geometry.dispose();
      material.dispose();
      renderer.dispose();
      renderer.forceContextLoss();
      renderer.domElement.parentElement?.removeChild(renderer.domElement);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lineColor, altColor, opacity, altOpacity, animationSpeed, reducedMotion]);

  return <div ref={containerRef} aria-hidden="true" className={`h-full w-full overflow-hidden ${className}`} />;
}
