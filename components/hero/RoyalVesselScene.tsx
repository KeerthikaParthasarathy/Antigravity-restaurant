'use client';

import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useHeatState } from '@/hooks/useHeatState';

// Procedural Fire Shader beneath the vessel
const FireShaderMaterial = {
  uniforms: {
    uTime: { value: 0 },
    uHeat: { value: 0.55 },
    uColorCore: { value: new THREE.Color('#F4EFE5') },
    uColorMid: { value: new THREE.Color('#F28C28') },
    uColorOuter: { value: new THREE.Color('#A83420') },
  },
  vertexShader: `
    uniform float uTime;
    uniform float uHeat;
    varying vec2 vUv;
    varying float vElevation;

    void main() {
      vUv = uv;
      vec3 pos = position;
      
      // Upward flame wave distortion
      float wave = sin(pos.x * 4.0 + uTime * 4.0) * cos(pos.z * 4.0 + uTime * 3.5) * 0.15 * uHeat;
      float flicker = sin(uTime * 12.0 + pos.x * 8.0) * 0.08 * uHeat;
      pos.y += wave + flicker;
      vElevation = pos.y;

      gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
    }
  `,
  fragmentShader: `
    uniform float uTime;
    uniform float uHeat;
    uniform vec3 uColorCore;
    uniform vec3 uColorMid;
    uniform vec3 uColorOuter;
    varying vec2 vUv;
    varying float vElevation;

    void main() {
      // Radial falloff from center
      vec2 center = vec2(0.5, 0.5);
      float dist = distance(vUv, center);
      
      // Noise animation approximation
      float n = sin(vUv.x * 12.0 + uTime * 6.0) * cos(vUv.y * 12.0 - uTime * 8.0);
      float flameShape = smoothstep(0.5, 0.05, dist + n * 0.1);

      // Color gradient based on heat & radius
      vec3 col = mix(uColorOuter, uColorMid, smoothstep(0.4, 0.15, dist));
      col = mix(col, uColorCore, smoothstep(0.18, 0.02, dist) * uHeat);

      float alpha = flameShape * (0.4 + uHeat * 0.6);
      gl_FragColor = vec4(col, alpha);
    }
  `,
};

function FloatingEmbers({ count, speed }: { count: number; speed: number }) {
  const meshRef = useRef<THREE.Points>(null);

  const [positions, scales] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const sc = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 3.5;
      pos[i * 3 + 1] = -1.2 + Math.random() * 3.5;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 3.5;
      sc[i] = Math.random() * 0.04 + 0.015;
    }
    return [pos, sc];
  }, [count]);

  useFrame((_, delta) => {
    if (!meshRef.current) return;
    const posArray = meshRef.current.geometry.attributes.position.array as Float32Array;

    for (let i = 0; i < count; i++) {
      posArray[i * 3 + 1] += delta * speed * (0.8 + Math.sin(i) * 0.4);
      // Gentle horizontal drift
      posArray[i * 3] += Math.sin(posArray[i * 3 + 1] * 2.0 + i) * 0.003;

      // Loop back to base
      if (posArray[i * 3 + 1] > 2.5) {
        posArray[i * 3 + 1] = -1.3;
        posArray[i * 3] = (Math.random() - 0.5) * 3.0;
        posArray[i * 3 + 2] = (Math.random() - 0.5) * 3.0;
      }
    }
    meshRef.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <points ref={meshRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.06}
        color="#F28C28"
        transparent
        opacity={0.85}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}

function HandcraftedVessel({ heatNorm }: { heatNorm: number }) {
  const groupRef = useRef<THREE.Group>(null);
  const fireMaterialRef = useRef<THREE.ShaderMaterial>(null);

  // Reusable lathe points for royal handi body curve
  const bodyPoints = useMemo(() => {
    const pts = [];
    pts.push(new THREE.Vector2(0.01, -0.9));
    pts.push(new THREE.Vector2(0.4, -0.85));
    pts.push(new THREE.Vector2(0.85, -0.6));
    pts.push(new THREE.Vector2(1.15, -0.2));
    pts.push(new THREE.Vector2(1.2, 0.15));
    pts.push(new THREE.Vector2(0.95, 0.45));
    pts.push(new THREE.Vector2(0.82, 0.55));
    pts.push(new THREE.Vector2(0.85, 0.62));
    return pts;
  }, []);

  useFrame((state, delta) => {
    if (!groupRef.current) return;
    const time = state.clock.getElapsedTime();

    // Gentle levitation float
    groupRef.current.position.y = Math.sin(time * 1.4) * 0.08;

    // Slow royal rotation & pointer reaction
    const targetRotY = (state.pointer.x * 0.4) + time * 0.12;
    groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, targetRotY, 0.05);
    groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, state.pointer.y * 0.15, 0.05);

    // Update Fire Shader uniforms
    if (fireMaterialRef.current) {
      fireMaterialRef.current.uniforms.uTime.value = time;
      fireMaterialRef.current.uniforms.uHeat.value = THREE.MathUtils.lerp(
        fireMaterialRef.current.uniforms.uHeat.value,
        heatNorm,
        delta * 3
      );
    }
  });

  return (
    <group ref={groupRef} position={[0, 0, 0]}>
      {/* 1. Dark Ceramic Handi Body */}
      <mesh position={[0, -0.1, 0]} castShadow receiveShadow>
        <latheGeometry args={[bodyPoints, 48]} />
        <meshStandardMaterial
          color="#151413"
          roughness={0.75}
          metalness={0.15}
        />
      </mesh>

      {/* 2. Antique Hammered Copper & Brass Lid */}
      <mesh position={[0, 0.6, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[0.88, 0.94, 0.14, 48]} />
        <meshStandardMaterial
          color="#D6B875"
          roughness={0.3}
          metalness={0.88}
        />
      </mesh>

      {/* Lid Dome */}
      <mesh position={[0, 0.72, 0]}>
        <sphereGeometry args={[0.84, 48, 24, 0, Math.PI * 2, 0, Math.PI * 0.35]} />
        <meshStandardMaterial
          color="#B8860B"
          roughness={0.35}
          metalness={0.85}
        />
      </mesh>

      {/* Lid Finial Crown Knob */}
      <mesh position={[0, 1.25, 0]}>
        <sphereGeometry args={[0.12, 32, 16]} />
        <meshStandardMaterial
          color="#F4EFE5"
          roughness={0.2}
          metalness={0.9}
        />
      </mesh>

      {/* Finial Spire */}
      <mesh position={[0, 1.45, 0]}>
        <coneGeometry args={[0.07, 0.3, 24]} />
        <meshStandardMaterial
          color="#D6B875"
          roughness={0.25}
          metalness={0.9}
        />
      </mesh>

      {/* 3. Engraved Royal Rim Collar */}
      <mesh position={[0, 0.52, 0]}>
        <torusGeometry args={[0.88, 0.05, 16, 48]} />
        <meshStandardMaterial
          color="#D6B875"
          roughness={0.3}
          metalness={0.8}
        />
      </mesh>

      {/* 4. Brass Cast Handles on Sides */}
      <group position={[1.15, 0.2, 0]} rotation={[0, 0, Math.PI * 0.15]}>
        <mesh>
          <torusGeometry args={[0.22, 0.04, 16, 32, Math.PI * 1.2]} />
          <meshStandardMaterial color="#D6B875" roughness={0.35} metalness={0.85} />
        </mesh>
      </group>
      <group position={[-1.15, 0.2, 0]} rotation={[0, 0, -Math.PI * 0.15]}>
        <mesh>
          <torusGeometry args={[0.22, 0.04, 16, 32, Math.PI * 1.2]} />
          <meshStandardMaterial color="#D6B875" roughness={0.35} metalness={0.85} />
        </mesh>
      </group>

      {/* 5. Procedural Fire Disk beneath the base */}
      <mesh position={[0, -1.05, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[1.5 * (0.6 + heatNorm * 0.6), 40]} />
        <shaderMaterial
          ref={fireMaterialRef}
          args={[FireShaderMaterial]}
          transparent
          depthWrite={false}
          blending={THREE.AdditiveBlending}
          side={THREE.DoubleSide}
        />
      </mesh>
    </group>
  );
}

export const RoyalVesselScene: React.FC = () => {
  const { heatValue, visuals } = useHeatState();
  const heatNorm = heatValue / 100;

  return (
    <div className="w-full h-full relative cursor-grab active:cursor-grabbing select-none">
      <Canvas
        camera={{ position: [0, 0.6, 3.8], fov: 42 }}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      >
        {/* Environmental lighting modulated by heat */}
        <ambientLight intensity={0.25 + visuals.ambientAmberLight * 0.15} />

        {/* Champagne gold key spotlight */}
        <spotLight
          position={[3, 5, 4]}
          angle={0.4}
          penumbra={0.8}
          intensity={2.8}
          color="#F4EFE5"
          castShadow
        />

        {/* Dramatic warm rim light */}
        <spotLight
          position={[-3, 2, -2]}
          angle={0.5}
          penumbra={1}
          intensity={visuals.vesselRimLight}
          color="#D6B875"
        />

        {/* Under-hearth fire glow */}
        <pointLight
          position={[0, -1.2, 0]}
          intensity={1.2 + heatNorm * 3.5}
          distance={5}
          color={heatNorm > 0.6 ? '#F28C28' : '#A83420'}
        />

        {/* Royal 3D Vessel with levitation */}
        <HandcraftedVessel heatNorm={heatNorm} />

        {/* Ambient rising embers */}
        <FloatingEmbers count={visuals.emberCount} speed={visuals.emberSpeed} />
      </Canvas>
    </div>
  );
};
