"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import {
  OrbitControls,
  useGLTF,
  Sphere,
  Stars,
  Float,
  MeshDistortMaterial,
} from "@react-three/drei";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import * as THREE from "three";
import { getProject, val, types } from "@theatre/core";
import studio from "@theatre/studio";
import extension from "@theatre/r3f";
import { EffectComposer, Bloom, Glitch } from "@react-three/postprocessing";

studio.initialize();
studio.extend(extension);

const project = getProject("SciFi Cinematic Scene");
const sheet = project.sheet("Scene");
const cameraObj = sheet.object("Camera", {
  position: types.compound([0, 2, 10]),
});

const FloatingObjects = () => {
  return (
    <>
      {[...Array(10)].map((_, i) => (
        <Float key={i} speed={1} rotationIntensity={1} floatIntensity={1.5}>
          <Sphere
            args={[0.3, 32, 32]}
            position={[
              (Math.random() - 0.5) * 8,
              Math.random() * 5,
              (Math.random() - 0.5) * 8,
            ]}
          >
            <MeshDistortMaterial
              color={["#ff4081", "#00d4ff", "#ffd700"][i % 3]}
              distort={0.5}
              speed={2}
              roughness={0}
            />
          </Sphere>
        </Float>
      ))}
    </>
  );
};

const SciFiMonolith = () => {
  const monolithRef = useRef();

  useFrame(() => {
    if (monolithRef.current) {
      monolithRef.current.rotation.y += 0.005;
    }
  });

  return (
    <mesh ref={monolithRef} position={[0, 1, -3]}>
      <boxGeometry args={[1, 3, 0.5]} />
      <meshStandardMaterial
        color={"#111"}
        emissive={"#00ffff"}
        emissiveIntensity={1.5}
        roughness={0.2}
      />
    </mesh>
  );
};

export default function SciFiExperience() {
  return (
    <div className="relative w-full h-screen bg-black flex items-center justify-center overflow-hidden">
      <Canvas
        camera={{ position: val(cameraObj.props.position) }}
        theatre={sheet}
      >
        <ambientLight intensity={0.3} />
        <spotLight position={[5, 5, 5]} intensity={2} color={"#00d4ff"} />
        <Stars radius={50} depth={50} count={1000} factor={4} fade speed={2} />
        <FloatingObjects />
        <SciFiMonolith />
        <EffectComposer>
          <Bloom
            luminanceThreshold={0.3}
            luminanceSmoothing={0.5}
            intensity={1.5}
          />
          <Glitch
            delay={[1.5, 3]}
            duration={[0.5, 1]}
            strength={[0.2, 0.4]}
            mode={THREE.AdditiveBlending}
          />
        </EffectComposer>
        <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.5} />
      </Canvas>
      <div className="absolute top-10 left-10 text-white text-5xl font-extrabold drop-shadow-lg">
        <span className="text-cyan-300">The Future</span> is Now
      </div>
    </div>
  );
}
