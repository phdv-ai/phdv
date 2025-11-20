"use client";

import React, { Suspense, useMemo, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import * as THREE from 'three';

function Particles({ count = 5000 }) {
  const points = useRef<THREE.Points>(null!);

  const burstStates = useRef(new Float32Array(count)).current;

  const { positions, randomFactors, colors } = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const randomFactors = new Float32Array(count);
    const colors = new Float32Array(count * 3);
    const radius = 800; // Radius of the sphere
    const baseColor = new THREE.Color('#00aaff');

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      const p = new THREE.Vector3(
        (Math.random() - 0.5),
        (Math.random() - 0.5),
        (Math.random() - 0.5)
      ).normalize().multiplyScalar(radius + Math.random() * 2);
      positions[i3] = p.x;
      positions[i3 + 1] = p.y;
      positions[i3 + 2] = p.z;
      randomFactors[i] = Math.random();
      baseColor.toArray(colors, i3);
    }
    return { positions, randomFactors, colors };
  }, [count]);

  useFrame((state, delta) => {
    if (points.current) {
      const positions = points.current.geometry.attributes.position.array as Float32Array;
      const colors = points.current.geometry.attributes.color.array as Float32Array;
      const time = state.clock.getElapsedTime();
      const baseColor = new THREE.Color('#00aaff');
      const burstColor = new THREE.Color(10, 10, 10); // "Super" white for intense bloom

      for (let i = 0; i < count; i++) {
        const i3 = i * 3;
        const factor = randomFactors[i];
        
        // A more chaotic movement
        positions[i3] += Math.sin(time * factor) * 0.5;
        positions[i3 + 1] += Math.cos(time * factor) * 0.5;
        positions[i3 + 2] += Math.sin(time * factor) * Math.cos(time * factor) * 0.5;

        // Burst effect logic
        if (burstStates[i] > 0) {
          burstStates[i] = Math.max(0, burstStates[i] - delta * 5); // Burst fades over time, clamp at 0
          const currentColor = baseColor.clone().lerp(burstColor, burstStates[i]);
          currentColor.toArray(colors, i3);
        } else {
          baseColor.toArray(colors, i3);
        }
      }

      // Randomly trigger new bursts
      const burstsPerFrame = 10;
      for (let i = 0; i < burstsPerFrame; i++) {
        const index = Math.floor(Math.random() * count);
        if (burstStates[index] <= 0) {
          burstStates[index] = 1; // Start the burst
        }
      }

      points.current.geometry.attributes.position.needsUpdate = true;
      points.current.geometry.attributes.color.needsUpdate = true;
      points.current.rotation.y += delta / 30;
    }
  });

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.02} transparent blending={THREE.AdditiveBlending} sizeAttenuation depthWrite={false} vertexColors />
    </points>
  );
}

export default function ParticlesScene() {
  return (
    <Canvas style={{ position: 'fixed', top: 0, left: 0, zIndex: -1 }} camera={{ fov: 50, position: [0, 0, 6] }}>
      <ambientLight intensity={1.5} />
      <directionalLight position={[10, 10, 5]} intensity={2} />
      <Suspense fallback={null}>
        <Particles />
      </Suspense>
      <EffectComposer>
        <Bloom luminanceThreshold={0} luminanceSmoothing={0.9} height={300} />
      </EffectComposer>
    </Canvas>
  );
}