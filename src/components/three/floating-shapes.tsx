"use client";

import { useRef, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshDistortMaterial, Preload } from "@react-three/drei";
import type { Mesh } from "three";

/**
 * FloatingIcosahedron — forma geométrica flotante con distorsión
 */
function FloatingIcosahedron({
  position = [0, 0, 0],
  color = "#d4a853",
  scale = 1,
}: {
  position?: [number, number, number];
  color?: string;
  scale?: number;
}) {
  const meshRef = useRef<Mesh>(null);

  useFrame((_state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += delta * 0.15;
      meshRef.current.rotation.y += delta * 0.2;
    }
  });

  return (
    <Float speed={1.4} rotationIntensity={0.4} floatIntensity={0.5}>
      <mesh ref={meshRef} position={position} scale={scale}>
        <icosahedronGeometry args={[1, 1]} />
        <MeshDistortMaterial
          color={color}
          attach="material"
          distort={0.3}
          speed={1.5}
          roughness={0.4}
          metalness={0.8}
        />
      </mesh>
    </Float>
  );
}

/**
 * FloatingRing — anillo flotante
 */
function FloatingRing({
  position = [0, 0, 0],
  color = "#ffffff",
  scale = 1,
}: {
  position?: [number, number, number];
  color?: string;
  scale?: number;
}) {
  const meshRef = useRef<Mesh>(null);

  useFrame((_state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.z += delta * 0.3;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.6} floatIntensity={0.3}>
      <mesh ref={meshRef} position={position} scale={scale}>
        <torusGeometry args={[1, 0.02, 16, 100]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={0.3}
          transparent
          opacity={0.6}
        />
      </mesh>
    </Float>
  );
}

/**
 * HeroScene — escena 3D para el hero con formas flotantes
 */
export function HeroScene({ className = "" }: { className?: string }) {
  return (
    <div className={`pointer-events-none absolute inset-0 z-0 ${className}`}>
      <Canvas camera={{ position: [0, 0, 5], fov: 45 }} dpr={[1, 2]}>
        <Suspense fallback={null}>
          <ambientLight intensity={0.5} />
          <directionalLight position={[10, 10, 5]} intensity={1} />
          <pointLight position={[-10, -10, -5]} intensity={0.5} color="#d4a853" />

          <FloatingIcosahedron position={[2.5, 0.5, 0]} color="#d4a853" scale={0.8} />
          <FloatingIcosahedron position={[-2, -0.5, -1]} color="#ffffff" scale={0.5} />
          <FloatingRing position={[0, 0, 0]} color="#d4a853" scale={2} />
          <FloatingRing position={[1.5, -1, 0.5]} color="#ffffff" scale={1} />
        </Suspense>
        <Preload all />
      </Canvas>
    </div>
  );
}

/**
 * MinimalHeroCanvas — versión minimalista con solo formas geométricas sutiles
 */
export function MinimalHeroCanvas({ className = "" }: { className?: string }) {
  return (
    <div className={`pointer-events-none absolute inset-0 z-0 ${className}`}>
      <Canvas camera={{ position: [0, 0, 5], fov: 45 }} dpr={[1, 2]}>
        <Suspense fallback={null}>
          <ambientLight intensity={0.3} />
          <pointLight position={[10, 10, 10]} intensity={0.5} color="#d4a853" />

          <Float speed={1} rotationIntensity={0.2} floatIntensity={0.3}>
            <mesh position={[3, 1, -2]} scale={0.6}>
              <octahedronGeometry args={[1, 0]} />
              <meshStandardMaterial
                color="#d4a853"
                wireframe
                transparent
                opacity={0.5}
              />
            </mesh>
          </Float>

          <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.4}>
            <mesh position={[-3, -1, -1]} scale={0.4}>
              <icosahedronGeometry args={[1, 0]} />
              <meshStandardMaterial
                color="#ffffff"
                wireframe
                transparent
                opacity={0.3}
              />
            </mesh>
          </Float>
        </Suspense>
        <Preload all />
      </Canvas>
    </div>
  );
}
