"use client";

import { Canvas } from "@react-three/fiber";
import {
  OrbitControls,
  Float,
  MeshDistortMaterial,
  Environment,
} from "@react-three/drei";
import Image from "next/image";

function Blob() {
  return (
    <Float speed={1} floatIntensity={1.2} rotationIntensity={0.5}>
      <mesh>
        <sphereGeometry args={[2, 64, 64]} />
        <MeshDistortMaterial
          color="#7C3AED"
          distort={0.35}
          speed={1.2}
          roughness={0.15}
          metalness={0.1}
          transparent
          opacity={0.95}
        />
      </mesh>
    </Float>
  );
}

export default function HeroCanvas() {
  return (
    <Canvas
      camera={{ position: [0, 0, 6], fov: 50 }}
      dpr={[1, 1.5]}
      gl={{ antialias: true, preserveDrawingBuffer: true }}
    >
      <ambientLight intensity={0.7} />
      <directionalLight position={[4, 4, 6]} intensity={1} />
      <Blob />
      <Environment preset="city" />
      <OrbitControls
        enableZoom={false}
        enablePan={false}
        autoRotate
        autoRotateSpeed={0.6}
      />
    </Canvas>
  );
}