"use client";

import { useState, useRef, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial, Preload } from "@react-three/drei";
import * as random from "maath/random/dist/maath-random.esm";
import type { Points as PointsType } from "three";

/**
 * Stars — partículas 3D animadas que giran lentamente
 */
function Stars(props: JSX.IntrinsicElements["group"]) {
  const ref = useRef<PointsType>(null);
  const [sphere] = useState(() =>
    random.inSphere(new Float32Array(5000), { radius: 1.2 }) as Float32Array
  );

  useFrame((_state, delta) => {
    if (ref.current) {
      ref.current.rotation.x -= delta / 10;
      ref.current.rotation.y -= delta / 15;
    }
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]} {...props}>
      <Points ref={ref} positions={sphere} stride={3} frustumCulled>
        <PointMaterial
          transparent
          color="#d4a853"
          size={0.002}
          sizeAttenuation={true}
          depthWrite={false}
        />
      </Points>
    </group>
  );
}

/**
 * StarsCanvas — canvas full-screen con estrellas 3D animadas
 */
export function StarsCanvas({ className = "" }: { className?: string }) {
  return (
    <div className={`pointer-events-none absolute inset-0 z-[-1] ${className}`}>
      <Canvas camera={{ position: [0, 0, 1] }}>
        <Suspense fallback={null}>
          <Stars />
        </Suspense>
        <Preload all />
      </Canvas>
    </div>
  );
}
