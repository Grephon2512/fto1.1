"use client";

import { Canvas } from "@react-three/fiber";
import {
  OrbitControls,
  useGLTF,
  useTexture,
  Decal,
  Environment,
} from "@react-three/drei";
import { useRef, useEffect } from "react";
import * as THREE from "three";

interface ModelProps {
  color: string;
  logoTexture: string | null;
  fullTexture: string | null;
  logoPosition: [number, number, number];
  logoScale: [number, number, number];
}

const Model: React.FC<ModelProps> = ({
  color,
  logoTexture,
  fullTexture,
  logoPosition,
  logoScale,
}) => {
  const modelRef = useRef<THREE.Group | null>(null);
  const shirtMeshRef = useRef<THREE.Mesh>(null); // ✅ FIXED: Use useRef correctly
  const { scene } = useGLTF("/shirt_baked.glb");

  console.log("GLB Model Loaded:", scene); // ✅ Check if model is being loaded

  const defaultTexture = "/BLANK.jpg";

  // Ensure textures are handled correctly
  const [fabricTexture] = useTexture([fullTexture || defaultTexture]) as [
    THREE.Texture
  ];
  const [logoDecal] = useTexture([logoTexture || defaultTexture]) as [
    THREE.Texture
  ];

  fabricTexture.flipY = false;
  fabricTexture.wrapS = THREE.RepeatWrapping;
  fabricTexture.wrapT = THREE.RepeatWrapping;

  logoDecal.flipY = true;

  useEffect(() => {
    scene.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        if (!shirtMeshRef.current) {
          shirtMeshRef.current = child;
        }
        child.material = new THREE.MeshStandardMaterial({
          color: new THREE.Color("white"), // Ensure a base color is applied
          metalness: 0.5,
          roughness: 0.8,
        });
      }
    });
  }, [scene, fabricTexture, color]);

  return (
    <group ref={modelRef} scale={1.5}>
      <primitive object={scene} />
      {logoTexture &&
        logoTexture !== defaultTexture &&
        shirtMeshRef.current && (
          <Decal
            mesh={shirtMeshRef as React.MutableRefObject<THREE.Mesh>} // ✅ FIX: Explicitly cast to MutableRefObject
            position={logoPosition}
            rotation={[0, 0, 0]}
            scale={logoScale}
            map={logoDecal}
          />
        )}
    </group>
  );
};

export default function TshirtCustomizer() {
  return (
    <Canvas
      camera={{ position: [0, 1, 3], fov: 50 }}
      className="absolute inset-0 w-full h-full"
    >
      <ambientLight intensity={0.8} />
      <directionalLight position={[5, 5, 5]} intensity={4} castShadow />
      <Environment preset="city" />
      <OrbitControls enableZoom enablePan enableRotate autoRotate />
    </Canvas>
  );
}
