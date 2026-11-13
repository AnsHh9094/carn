import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { prefersReducedMotion, isTouch } from '../engine';

interface WorkShaderImageProps {
  src: string;
  alt: string;
  active: boolean;
}

const VERTEX_SHADER = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const FRAGMENT_SHADER = `
  precision mediump float;
  varying vec2 vUv;
  uniform sampler2D uTexture;
  uniform vec2 uMouse;
  uniform float uHover;
  uniform float uTime;

  void main() {
    float dist = distance(vUv, uMouse);
    float influence = smoothstep(0.38, 0.0, dist) * uHover;

    // Subtle pixel-mosaic quantization inside pointer radius (Dave Holloway PixelDistortion feel)
    float blocks = mix(180.0, 26.0, influence);
    vec2 gridUv = floor(vUv * blocks) / blocks;
    vec2 finalUv = mix(vUv, gridUv, influence * 0.65);

    // Light RGB chromatic cut split proportional to wave influence
    float shift = influence * 0.014 * sin(uTime * 8.0 + vUv.y * 12.0);
    float r = texture2D(uTexture, vec2(clamp(finalUv.x + shift, 0.0, 1.0), finalUv.y)).r;
    float g = texture2D(uTexture, finalUv).g;
    float b = texture2D(uTexture, vec2(clamp(finalUv.x - shift, 0.0, 1.0), finalUv.y)).b;

    gl_FragColor = vec4(r, g, b, 1.0);
  }
`;

/**
 * Displays a crisp WebP video still in the DOM (fast LCP, reduced-motion & SSR safe)
 * and layers an isolated WebGL pixel-distortion shader only while actively hovered.
 */
export const WorkShaderImage: React.FC<WorkShaderImageProps> = ({ src, alt, active }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!active || prefersReducedMotion() || isTouch() || !containerRef.current) return;

    const container = containerRef.current;
    let disposed = false;
    let rafId = 0;

    let renderer: THREE.WebGLRenderer | null = null;
    try {
      renderer = new THREE.WebGLRenderer({ alpha: true, antialias: false, powerPreference: 'high-performance' });
    } catch {
      return;
    }

    const { width, height } = container.getBoundingClientRect();
    if (width === 0 || height === 0) {
      renderer.dispose();
      return;
    }

    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5));
    renderer.setSize(width, height);
    const canvas = renderer.domElement;
    canvas.className = 'absolute inset-0 w-full h-full pointer-events-none z-10';
    container.appendChild(canvas);

    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-0.5, 0.5, 0.5, -0.5, 0.1, 10);
    camera.position.z = 1;

    const uniforms = {
      uTexture: { value: null as THREE.Texture | null },
      uMouse: { value: new THREE.Vector2(0.5, 0.5) },
      uHover: { value: 0.0 },
      uTime: { value: 0.0 },
    };

    const loader = new THREE.TextureLoader();
    const texture = loader.load(src, () => {
      texture.minFilter = THREE.LinearFilter;
      texture.magFilter = THREE.LinearFilter;
      uniforms.uTexture.value = texture;
    });

    const geometry = new THREE.PlaneGeometry(1, 1);
    const material = new THREE.ShaderMaterial({
      vertexShader: VERTEX_SHADER,
      fragmentShader: FRAGMENT_SHADER,
      uniforms,
      transparent: true,
    });

    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    const onMove = (e: MouseEvent) => {
      const r = container.getBoundingClientRect();
      if (!r.width || !r.height) return;
      uniforms.uMouse.value.x = (e.clientX - r.left) / r.width;
      uniforms.uMouse.value.y = 1.0 - (e.clientY - r.top) / r.height;
    };

    const parentCard = container.parentElement;
    parentCard?.addEventListener('mousemove', onMove);

    const startTime = performance.now();
    const renderLoop = () => {
      if (disposed) return;
      uniforms.uHover.value += (1.0 - uniforms.uHover.value) * 0.14;
      uniforms.uTime.value = (performance.now() - startTime) * 0.001;
      if (uniforms.uTexture.value) {
        renderer?.render(scene, camera);
      }
      rafId = requestAnimationFrame(renderLoop);
    };
    renderLoop();

    return () => {
      disposed = true;
      cancelAnimationFrame(rafId);
      parentCard?.removeEventListener('mousemove', onMove);
      geometry.dispose();
      material.dispose();
      texture.dispose();
      renderer?.dispose();
      if (canvas.parentElement === container) {
        container.removeChild(canvas);
      }
    };
  }, [active, src]);

  return (
    <div ref={containerRef} className="relative w-full h-full overflow-hidden bg-[#0A0A0A]">
      <img
        src={src}
        alt={alt}
        loading="lazy"
        decoding="async"
        className={`w-full h-full object-cover transition-transform duration-500 ease-out ${
          active ? 'scale-[1.03]' : 'scale-100'
        }`}
      />
    </div>
  );
};

