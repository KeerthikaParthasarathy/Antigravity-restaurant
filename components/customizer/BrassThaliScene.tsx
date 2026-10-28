'use client';

import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { DishConfiguration } from '@/types/dish';
import { INGREDIENTS, PROTEINS } from '@/lib/menu-data';

interface BrassThaliSceneProps {
  config: DishConfiguration;
}

function ThaliPlate({ config }: { config: DishConfiguration }) {
  const plateRef = useRef<THREE.Group>(null);

  const selectedProtein = PROTEINS.find((p) => p.id === config.proteinId);
  const proteinColor = selectedProtein?.color || '#8A2A1A';

  useFrame((state) => {
    if (!plateRef.current) return;
    const t = state.clock.getElapsedTime();
    // Gentle hovering tilt and rotation
    plateRef.current.position.y = Math.sin(t * 1.5) * 0.05;
    plateRef.current.rotation.y = t * 0.15 + state.pointer.x * 0.3;
    plateRef.current.rotation.x = 0.55 + state.pointer.y * 0.1;
  });

  return (
    <group ref={plateRef} position={[0, -0.1, 0]}>
      {/* Main Large Brass Thali Base Plate */}
      <mesh receiveShadow castShadow>
        <cylinderGeometry args={[1.8, 1.7, 0.08, 64]} />
        <meshStandardMaterial
          color="#D4AF37"
          roughness={0.25}
          metalness={0.92}
        />
      </mesh>

      {/* Decorative Outer Rim / Lip */}
      <mesh position={[0, 0.04, 0]}>
        <torusGeometry args={[1.82, 0.06, 16, 64]} />
        <meshStandardMaterial
          color="#E6CA65"
          roughness={0.2}
          metalness={0.95}
        />
      </mesh>

      {/* Center Main Culinary Portion (Protein & Dum Gravy Mound) */}
      <mesh position={[0, 0.12, 0]} castShadow>
        <cylinderGeometry args={[0.7, 0.85, 0.18, 36]} />
        <meshStandardMaterial
          color={proteinColor}
          roughness={0.65}
          metalness={0.15}
        />
      </mesh>

      {/* Saffron & Ghee Garnish atop center portion */}
      <mesh position={[0, 0.22, 0]}>
        <sphereGeometry args={[0.2, 16, 16]} />
        <meshStandardMaterial
          color="#F59E0B"
          roughness={0.3}
          metalness={0.4}
        />
      </mesh>

      {/* Peripheral Brass Katoris (Bowls) for Ingredients & Accompaniments */}
      {config.ingredientIds.slice(0, 5).map((ingId, idx) => {
        const total = Math.min(5, config.ingredientIds.length);
        const angle = (idx / total) * Math.PI * 2;
        const radius = 1.25;
        const x = Math.cos(angle) * radius;
        const z = Math.sin(angle) * radius;

        const ing = INGREDIENTS.find((i) => i.id === ingId);
        const ingColor = ing?.color || '#D6B875';

        return (
          <group key={ingId} position={[x, 0.08, z]}>
            {/* Miniature Brass Katori */}
            <mesh castShadow receiveShadow>
              <cylinderGeometry args={[0.3, 0.24, 0.16, 32]} />
              <meshStandardMaterial
                color="#C59B27"
                roughness={0.25}
                metalness={0.9}
              />
            </mesh>
            {/* Spice/Ingredient filling inside bowl */}
            <mesh position={[0, 0.06, 0]}>
              <cylinderGeometry args={[0.27, 0.27, 0.04, 24]} />
              <meshStandardMaterial
                color={ingColor}
                roughness={0.5}
                metalness={ing?.category === 'luxury' ? 0.8 : 0.1}
              />
            </mesh>
          </group>
        );
      })}

      {/* Warm Under-plate contact shadow */}
      <mesh position={[0, -0.4, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[2.0, 32]} />
        <meshBasicMaterial color="#000000" transparent opacity={0.4} />
      </mesh>
    </group>
  );
}

export const BrassThaliScene: React.FC<BrassThaliSceneProps> = ({ config }) => {
  return (
    <div className="w-full h-full min-h-[360px] sm:min-h-[460px] relative select-none">
      <Canvas
        camera={{ position: [0, 2.2, 3.2], fov: 40 }}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={0.4} />

        {/* Top Key Brass Highlight */}
        <directionalLight
          position={[3, 6, 2]}
          intensity={2.2}
          color="#FFF8E7"
          castShadow
        />

        {/* Warm Side Reflection */}
        <pointLight position={[-3, 2, -2]} intensity={1.5} color="#D6B875" />

        {/* Fire Amber Rim Accent */}
        <pointLight position={[0, -1, 0]} intensity={1.2} color="#F28C28" />

        <ThaliPlate config={config} />
      </Canvas>
    </div>
  );
};
