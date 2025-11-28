'use client';

import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Sky, Stars, Float, Html } from '@react-three/drei';
import { useMemo, useRef } from 'react';
import * as THREE from 'three';

const Wolf = () => {
  const muzzleRef = useRef<THREE.Mesh>(null);
  const chestRef = useRef<THREE.Mesh>(null);

  useFrame((state, delta) => {
    const t = state.clock.getElapsedTime();
    if (muzzleRef.current) {
      const scale = 1 + Math.sin(t * 4) * 0.03;
      muzzleRef.current.scale.set(scale, scale, scale);
    }
    if (chestRef.current) {
      const lift = Math.sin(t * 3) * 0.05;
      chestRef.current.position.y = 0.55 + lift;
    }
  });

  return (
    <group position={[-2.4, 0, 0.4]} rotation={[0, Math.PI * 0.18, 0]}>
      <group>
        <mesh ref={chestRef} position={[0, 0.55, 0]}>
          <capsuleGeometry args={[0.4, 0.9, 6, 12]} />
          <meshStandardMaterial color="#4d4d5c" metalness={0.15} roughness={0.6} />
        </mesh>
        <mesh position={[0, 1.05, 0.25]}>
          <sphereGeometry args={[0.32, 32, 32]} />
          <meshStandardMaterial color="#5c556d" roughness={0.5} />
        </mesh>
        <mesh ref={muzzleRef} position={[0, 1, 0.6]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.18, 0.26, 0.45, 24]} />
          <meshStandardMaterial color="#d9d9df" roughness={0.2} />
        </mesh>
        <mesh position={[0, 1.32, 0.38]}>
          <coneGeometry args={[0.07, 0.14, 16]} />
          <meshStandardMaterial color="#2f2f3b" roughness={0.4} />
        </mesh>
        <mesh position={[0.16, 1.22, 0.16]} rotation={[0, 0, Math.PI / 10]}>
          <coneGeometry args={[0.12, 0.36, 18]} />
          <meshStandardMaterial color="#3f3f50" roughness={0.45} />
        </mesh>
        <mesh position={[-0.16, 1.22, 0.16]} rotation={[0, 0, -Math.PI / 10]}>
          <coneGeometry args={[0.12, 0.36, 18]} />
          <meshStandardMaterial color="#3f3f50" roughness={0.45} />
        </mesh>
      </group>
      <group position={[0, 0.16, -0.12]}>
        {[ -0.22, 0.22 ].map((x) => (
          <mesh key={x} position={[x, 0, -0.12]} rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.07, 0.07, 0.7, 16]} />
            <meshStandardMaterial color="#2e2e39" roughness={0.5} />
          </mesh>
        ))}
        {[ -0.22, 0.22 ].map((x) => (
          <mesh key={`leg-${x}`} position={[x, -0.45, 0]}>
            <cylinderGeometry args={[0.08, 0.06, 0.55, 16]} />
            <meshStandardMaterial color="#2a2a38" roughness={0.6} />
          </mesh>
        ))}
      </group>
      <group position={[0, 0.42, -0.55]} rotation={[0, Math.PI * 0.04, 0]}>
        <mesh>
          <coneGeometry args={[0.12, 0.5, 16]} />
          <meshStandardMaterial color="#2c2c3a" roughness={0.6} />
        </mesh>
      </group>
      <group position={[0, 1, 0.52]}>
        <mesh position={[0.18, 0.05, 0.08]} rotation={[0, 0, Math.PI / 14]}>
          <boxGeometry args={[0.08, 0.22, 0.08]} />
          <meshStandardMaterial color="#f1f1f2" roughness={0.3} />
        </mesh>
        <mesh position={[-0.18, 0.05, 0.08]} rotation={[0, 0, -Math.PI / 14]}>
          <boxGeometry args={[0.08, 0.22, 0.08]} />
          <meshStandardMaterial color="#f1f1f2" roughness={0.3} />
        </mesh>
      </group>
      <mesh position={[0, 1.1, 0.55]} rotation={[Math.PI / 2.4, 0, 0]}>
        <ringGeometry args={[0.12, 0.2, 24, 1, 0, Math.PI * 1.6]} />
        <meshStandardMaterial color="#ffffff" emissive="#9dd7ff" emissiveIntensity={0.4} transparent opacity={0.55} />
      </mesh>
    </group>
  );
};

const WindPulse = () => {
  const ringRef = useRef<THREE.Mesh>(null);
  const particlesRef = useRef<THREE.Points>(null);

  useFrame((state, delta) => {
    const t = state.clock.getElapsedTime() % 2.5;
    const expansion = 1 + t * 1.1;
    if (ringRef.current) {
      ringRef.current.position.z = 0.5 + t * 1.3;
      ringRef.current.scale.set(expansion, expansion, expansion * 0.7);
      (ringRef.current.material as THREE.MeshStandardMaterial).opacity = THREE.MathUtils.lerp(0.6, 0, t / 2.5);
    }
    if (particlesRef.current) {
      particlesRef.current.position.z = 0.7 + (t * 1.5) % 2;
      particlesRef.current.rotation.z += delta * 0.3;
    }
  });

  const particlePositions = useMemo(() => {
    const points = new Float32Array(200 * 3);
    for (let i = 0; i < 200; i++) {
      const angle = Math.random() * Math.PI * 2;
      const radius = 0.12 + Math.random() * 0.4;
      const x = Math.cos(angle) * radius;
      const y = -0.14 + Math.random() * 0.2;
      const z = Math.random() * 0.4;
      points[i * 3] = x;
      points[i * 3 + 1] = y;
      points[i * 3 + 2] = z;
    }
    return points;
  }, []);

  return (
    <group position={[-1.9, 1.02, 0.8]} rotation={[0, Math.PI * 0.4, 0]}>
      <mesh ref={ringRef} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.25, 0.03, 32, 64]} />
        <meshStandardMaterial color="#cfe8ff" emissive="#a2d4ff" transparent opacity={0.55} />
      </mesh>
      <points ref={particlesRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" count={particlePositions.length / 3} array={particlePositions} itemSize={3} />
        </bufferGeometry>
        <pointsMaterial size={0.03} sizeAttenuation color="#f5fbff" opacity={0.65} transparent depthWrite={false} />
      </points>
    </group>
  );
};

const WoodenHouse = () => {
  const logPositions = useMemo(() => {
    const positions: Array<[number, number, number]> = [];
    const layers = 5;
    for (let i = 0; i < layers; i++) {
      const y = 0.25 + i * 0.18;
      const offset = (i % 2 === 0 ? 0 : 0.14);
      for (let x = -0.56; x <= 0.56; x += 0.28) {
        positions.push([x + offset, y, 0]);
      }
    }
    return positions;
  }, []);

  return (
    <group position={[1.4, 0.35, -0.4]} rotation={[0, -Math.PI / 8, 0]}>
      {logPositions.map(([x, y, z], idx) => (
        <mesh key={idx} position={[x, y, z]}>
          <cylinderGeometry args={[0.14, 0.14, 1.2, 12]} />
          <meshStandardMaterial color="#8d5e2a" roughness={0.8} metalness={0.05} />
        </mesh>
      ))}
      <mesh position={[0, 1.2, 0]} rotation={[Math.PI / 3.6, 0, 0]}>
        <boxGeometry args={[1.8, 1.1, 0.15]} />
        <meshStandardMaterial color="#5d2f10" roughness={0.8} />
      </mesh>
      <mesh position={[0, 1.2, -0.8]} rotation={[-Math.PI / 3.6, 0, Math.PI]}>
        <boxGeometry args={[1.8, 1.1, 0.15]} />
        <meshStandardMaterial color="#67421d" roughness={0.8} />
      </mesh>
      <mesh position={[0, 0.4, 0]}>
        <boxGeometry args={[1.4, 0.1, 1]} />
        <meshStandardMaterial color="#7b4c1c" roughness={0.8} />
      </mesh>
      <mesh position={[0, 0.95, 0.46]}>
        <boxGeometry args={[0.4, 0.5, 0.05]} />
        <meshStandardMaterial color="#2d1a0b" />
      </mesh>
      <mesh position={[0, 0.9, 0.48]}>
        <boxGeometry args={[0.32, 0.32, 0.08]} />
        <meshStandardMaterial color="#3f5d86" roughness={0.35} metalness={0.6} />
      </mesh>
      <Pig />
    </group>
  );
};

const Pig = () => {
  const bodyRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (bodyRef.current) {
      bodyRef.current.position.y = 0.9 + Math.sin(state.clock.elapsedTime * 8) * 0.02;
    }
  });

  return (
    <group position={[0, 0.82, 0.42]}>
      <mesh ref={bodyRef}>
        <sphereGeometry args={[0.16, 24, 24]} />
        <meshStandardMaterial color="#f4a7b9" roughness={0.6} />
      </mesh>
      <mesh position={[0, 0.12, 0.12]}>
        <sphereGeometry args={[0.11, 24, 24]} />
        <meshStandardMaterial color="#f2b9c8" roughness={0.6} />
      </mesh>
      <mesh position={[0, 0.12, 0.23]}>
        <cylinderGeometry args={[0.05, 0.06, 0.08, 16]} />
        <meshStandardMaterial color="#f097ab" roughness={0.5} />
      </mesh>
      <mesh position={[-0.05, 0.16, 0.2]}>
        <sphereGeometry args={[0.015, 10, 10]} />
        <meshStandardMaterial color="#3c2232" />
      </mesh>
      <mesh position={[0.05, 0.16, 0.2]}>
        <sphereGeometry args={[0.015, 10, 10]} />
        <meshStandardMaterial color="#3c2232" />
      </mesh>
      <mesh position={[0, 0.07, 0.16]}>
        <torusGeometry args={[0.045, 0.014, 8, 16]} />
        <meshStandardMaterial color="#f2b9c8" />
      </mesh>
      <mesh position={[0, -0.11, 0.02]}>
        <boxGeometry args={[0.05, 0.24, 0.05]} />
        <meshStandardMaterial color="#f4a7b9" />
      </mesh>
      <Html
        position={[0, 0.12, 0.15]}
        center
        transform
        style={{
          color: '#2d1a0b',
          fontSize: '10px',
          fontWeight: 600,
          background: 'rgba(255,255,255,0.8)',
          padding: '4px 6px',
          borderRadius: '99px',
          boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
        }}
      >
        Eeeeek!
      </Html>
    </group>
  );
};

const SceneGround = () => (
  <group>
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.01, 0]}>
      <circleGeometry args={[12, 64]} />
      <meshStandardMaterial color="#8ab370" roughness={0.9} />
    </mesh>
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.02, -4]}>
      <planeGeometry args={[40, 20]} />
      <meshStandardMaterial color="#e3dfc8" roughness={1} />
    </mesh>
  </group>
);

const Fireflies = () => {
  const pointsRef = useRef<THREE.Points>(null);

  useFrame((_, delta) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y += delta * 0.02;
    }
  });

  const positions = useMemo(() => {
    const arr = new Float32Array(300 * 3);
    for (let i = 0; i < 300; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 12;
      arr[i * 3 + 1] = 0.5 + Math.random() * 2.5;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 12;
    }
    return arr;
  }, []);

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={positions.length / 3} array={positions} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial color="#ffffff" size={0.06} sizeAttenuation transparent opacity={0.35} />
    </points>
  );
};

const Scene = () => (
  <Canvas shadows camera={{ position: [-4, 2.5, 5], fov: 40 }}>
    <color attach="background" args={['#a9d9ff']} />
    <fog attach="fog" args={['#a9d9ff', 6, 18]} />
    <ambientLight intensity={0.5} />
    <directionalLight
      castShadow
      position={[6, 8, 4]}
      intensity={1.1}
      color="#fce3bb"
      shadow-mapSize-width={1024}
      shadow-mapSize-height={1024}
    />
    <spotLight position={[-6, 5, 3]} angle={0.6} penumbra={0.4} intensity={0.4} color="#f0f6ff" />
    <Float floatIntensity={1.8} rotationIntensity={0.3}>
      <Stars radius={20} depth={8} count={3000} factor={2} saturation={0.4} fade />
    </Float>
    <Sky distance={450000} sunPosition={[2, 1, -1]} inclination={0.49} azimuth={0.35} turbidity={8} />
    <SceneGround />
    <Wolf />
    <WoodenHouse />
    <WindPulse />
    <Fireflies />
    <OrbitControls minDistance={4} maxDistance={10} maxPolarAngle={Math.PI / 2.2} target={[0.8, 0.8, -0.2]} />
  </Canvas>
);

export default function Page() {
  return (
    <main className="viewport">
      <div className="hud">
        <h1>Hold Tight, Little Pig!</h1>
        <p>The Big Bad Wolf huffs and puffs, but this timber hideout stands firm… for now.</p>
      </div>
      <Scene />
    </main>
  );
}
