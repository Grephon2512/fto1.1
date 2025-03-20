"use client";

import { Canvas } from "@react-three/fiber";
import {
  OrbitControls,
  useGLTF,
  Decal,
  useTexture,
  Environment,
} from "@react-three/drei";
import { useRef, useState, useEffect } from "react";
import * as THREE from "three";

const TshirtCustomizer = () => {
  const [color, setColor] = useState("#ffffff");
  const [logoTexture, setLogoTexture] = useState<string | null>(null);
  const [fullTexture, setFullTexture] = useState<string | null>(null);

  // State for positioning and scaling
  const [logoPosition, setLogoPosition] = useState([0, 0.05, 0.12]);
  const [logoScale, setLogoScale] = useState([0.2, 0.2, 0.2]);
  const [fullTextureScale, setFullTextureScale] = useState(1);

  const handleImageUpload = (
    event: React.ChangeEvent<HTMLInputElement>,
    type: "full" | "logo"
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const result = reader.result as string;
        if (type === "full") setFullTexture(result);
        if (type === "logo") setLogoTexture(result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="w-full h-screen flex flex-col items-center justify-center bg-gray-900">
      <Canvas
        camera={{ position: [0, 2, 5], fov: 8 }}
        className="w-full h-full"
      >
        <ambientLight intensity={0.8} />
        <directionalLight position={[5, 5, 5]} intensity={4} castShadow />
        <Environment preset="city" />
        <OrbitControls enableZoom enablePan enableRotate autoRotate />
        <Model
          color={color}
          fullTexture={fullTexture}
          fullTextureScale={fullTextureScale}
          logoTexture={logoTexture}
          logoPosition={logoPosition}
          logoScale={logoScale}
        />
      </Canvas>

      <div className="absolute bottom-5 left-5 bg-white/10 p-6 rounded-xl backdrop-blur-lg shadow-lg space-y-4 border border-purple-500">
        <h2 className="text-xl font-bold text-white">
          Texture & Logo Controls
        </h2>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => handleImageUpload(e, "full")}
          className="text-white"
        />
        <input
          type="file"
          accept="image/*"
          onChange={(e) => handleImageUpload(e, "logo")}
          className="text-white"
        />
        <label className="text-white">Full Texture Scale</label>
        <input
          type="range"
          min="0.5"
          max="2"
          step="0.1"
          value={fullTextureScale}
          onChange={(e) => setFullTextureScale(parseFloat(e.target.value))}
        />
        <label className="text-white">Logo Position (Y-Axis)</label>
        <input
          type="range"
          min="-0.1"
          max="0.2"
          step="0.01"
          value={logoPosition[1]}
          onChange={(e) =>
            setLogoPosition([0, parseFloat(e.target.value), 0.12])
          }
        />
        <label className="text-white">Logo Scale</label>
        <input
          type="range"
          min="0.1"
          max="0.5"
          step="0.01"
          value={logoScale[0]}
          onChange={(e) =>
            setLogoScale([
              parseFloat(e.target.value),
              parseFloat(e.target.value),
              parseFloat(e.target.value),
            ])
          }
        />
      </div>
    </div>
  );
};

const Model = ({
  color,
  fullTexture,
  fullTextureScale,
  logoTexture,
  logoPosition,
  logoScale,
}) => {
  const modelRef = useRef<THREE.Group | null>(null);
  const shirtMeshRef = useRef<THREE.Mesh>(null!);
  const { scene } = useGLTF("/shirt_baked.glb");

  const defaultTexture = "/BLANK.jpg";
  const fabricTexture = useTexture(fullTexture || defaultTexture);
  const logoDecal = useTexture(logoTexture || defaultTexture);

  fabricTexture.flipY = false;
  logoDecal.flipY = true;

  useEffect(() => {
    scene.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        if (!shirtMeshRef.current) {
          shirtMeshRef.current = child;
        }
        child.material = new THREE.MeshStandardMaterial({
          color,
          map: fabricTexture instanceof THREE.Texture ? fabricTexture : null,
          transparent: true,
          opacity: fabricTexture ? 1 : 0.9,
          side: THREE.DoubleSide,
        });

        if (fabricTexture) {
          fabricTexture.wrapS = THREE.RepeatWrapping;
          fabricTexture.wrapT = THREE.RepeatWrapping;
          fabricTexture.repeat.set(fullTextureScale, fullTextureScale);
          fabricTexture.offset.set(0.05, 0.05);
        }
      }
    });
  }, [scene, fabricTexture, color, fullTextureScale]);

  return (
    <group ref={modelRef} scale={0.7}>
      <primitive object={scene} />
      {logoTexture &&
        logoTexture !== defaultTexture &&
        shirtMeshRef.current && (
          <Decal
            mesh={shirtMeshRef}
            position={logoPosition}
            rotation={[0, 0, 0]}
            scale={logoScale}
            map={logoDecal instanceof THREE.Texture ? logoDecal : undefined}
          />
        )}
    </group>
  );
};

export default TshirtCustomizer;
