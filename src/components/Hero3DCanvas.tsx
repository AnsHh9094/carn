import React, { useRef, useMemo, useEffect, useState, Component, ErrorInfo, ReactNode } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { isTouch, prefersReducedMotion } from '../engine';

function checkWebGLSupport(): boolean {
  try {
    const canvas = document.createElement('canvas');
    const gl = canvas.getContext('webgl2') || canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
    return !!(gl && gl instanceof WebGLRenderingContext || gl instanceof WebGL2RenderingContext);
  } catch {
    return false;
  }
}

class CanvasErrorBoundary extends Component<{ children: ReactNode }, { hasError: boolean }> {
  state = { hasError: false };
  static getDerivedStateFromError(): { hasError: boolean } {
    return { hasError: true };
  }
  componentDidCatch(error: Error, info: ErrorInfo) {
    console.warn('[Hero3DCanvas] Graceful WebGL fallback:', error.message, info.componentStack);
  }
  render() {
    if (this.state.hasError) return null;
    return this.props.children;
  }
}

function StudioDust({ count = 110, theme = 'light' }: { count?: number; theme?: 'light' | 'dark' }) {
  const points = useMemo(() => {
    const coords = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      coords[i * 3] = (Math.random() - 0.5) * 15;
      coords[i * 3 + 1] = (Math.random() - 0.5) * 10;
      coords[i * 3 + 2] = (Math.random() - 0.5) * 12;
    }
    return coords;
  }, [count]);

  const pointsRef = useRef<THREE.Points>(null!);

  useFrame((_, delta) => {
    if (prefersReducedMotion()) return;
    if (pointsRef.current) {
      pointsRef.current.rotation.y += delta * 0.03;
      pointsRef.current.rotation.x += delta * 0.015;
    }
  });

  const isLight = theme === 'light';

  return (
    <group>
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={points.length / 3}
            array={points}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          size={isLight ? 0.045 : 0.03}
          color={isLight ? '#2B47FF' : '#ffffff'}
          transparent
          opacity={isLight ? 0.32 : 0.28}
          depthWrite={false}
        />
      </points>
    </group>
  );
}

export const Hero3DCanvas: React.FC<{ theme?: 'light' | 'dark' }> = ({ theme = 'light' }) => {
  const [inView, setInView] = useState(true);
  const [webglReady, setWebglReady] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!prefersReducedMotion() && !isTouch() && window.innerWidth >= 768) {
      setWebglReady(checkWebGLSupport());
    }
  }, []);

  useEffect(() => {
    if (typeof IntersectionObserver === 'undefined') return;
    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold: 0.05 }
    );
    if (containerRef.current) observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={containerRef} className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
      {webglReady && (
        <CanvasErrorBoundary>
          <Canvas
            camera={{ position: [0, 0, 6], fov: 45 }}
            dpr={[1, 1.5]}
            frameloop={inView ? 'always' : 'never'}
            gl={{
              antialias: true,
              alpha: true,
              powerPreference: 'high-performance',
              failIfMajorPerformanceCaveat: false,
            }}
          >
            <ambientLight intensity={0.7} />
            <directionalLight position={[5, 8, 5]} intensity={0.9} color="#ffffff" />
            <StudioDust count={110} theme={theme} />
          </Canvas>
        </CanvasErrorBoundary>
      )}
    </div>
  );
};
