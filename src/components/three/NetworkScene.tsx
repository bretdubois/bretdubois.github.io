"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Sphere, MeshDistortMaterial, Stars } from "@react-three/drei";
import * as THREE from "three";

function NetworkNodes() {
  const groupRef = useRef<THREE.Group>(null!);

  const nodes = useMemo(() => {
    const pts: THREE.Vector3[] = [];
    const count = 22;
    for (let i = 0; i < count; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);
      const r = 1.8 + Math.random() * 1.6;
      pts.push(
        new THREE.Vector3(
          r * Math.sin(phi) * Math.cos(theta),
          r * Math.sin(phi) * Math.sin(theta),
          r * Math.cos(phi)
        )
      );
    }
    return pts;
  }, []);

  const linePositions = useMemo(() => {
    const positions: number[] = [];
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        if (nodes[i].distanceTo(nodes[j]) < 1.8) {
          positions.push(
            nodes[i].x, nodes[i].y, nodes[i].z,
            nodes[j].x, nodes[j].y, nodes[j].z
          );
        }
      }
    }
    return new Float32Array(positions);
  }, [nodes]);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.1;
      groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.06) * 0.12;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Glowing connection lines — amber on dark background */}
      <lineSegments>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[linePositions, 3]} />
        </bufferGeometry>
        <lineBasicMaterial color="#D97706" opacity={0.35} transparent />
      </lineSegments>

      {nodes.map((pos, i) => (
        <mesh key={i} position={pos}>
          <sphereGeometry args={[0.06 + (i % 3) * 0.03, 10, 10]} />
          <meshStandardMaterial
            color={i % 4 === 0 ? "#EA580C" : i % 4 === 1 ? "#F59E0B" : i % 4 === 2 ? "#C2410C" : "#FBBF24"}
            emissive={i % 4 === 0 ? "#EA580C" : "#D97706"}
            emissiveIntensity={0.7}
            roughness={0.2}
            metalness={0.05}
          />
        </mesh>
      ))}
    </group>
  );
}

function CentralOrb() {
  return (
    <Float speed={1.6} rotationIntensity={0.5} floatIntensity={0.8}>
      <Sphere args={[0.75, 64, 64]}>
        <MeshDistortMaterial
          color="#C2410C"
          emissive="#9A3412"
          emissiveIntensity={0.6}
          distort={0.38}
          speed={2.2}
          roughness={0.15}
          metalness={0.1}
        />
      </Sphere>
    </Float>
  );
}

export default function NetworkScene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 6], fov: 52 }}
      style={{ background: "transparent", width: "100%", height: "100%" }}
      gl={{ antialias: true, alpha: true }}
      dpr={[1, 1.5]}
    >
      <ambientLight intensity={0.25} />
      <pointLight position={[5, 5, 5]} intensity={1.8} color="#FDE68A" />
      <pointLight position={[-5, -3, -5]} intensity={0.9} color="#EA580C" />
      <pointLight position={[0, 0, 3]} intensity={0.5} color="#FBBF24" />
      {/* Stars only visible on dark backgrounds */}
      <Stars
        radius={80}
        depth={40}
        count={1200}
        factor={2.5}
        saturation={0.1}
        fade
        speed={0.2}
      />
      <CentralOrb />
      <NetworkNodes />
    </Canvas>
  );
}
