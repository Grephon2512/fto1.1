"use client";

import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF, Environment, Stars } from "@react-three/drei";
import { HexColorPicker } from "react-colorful";
import { useRef, useState } from "react";
import * as THREE from "three";

const Model = ({ color, materialType }: any) => {
  const modelRef = useRef<THREE.Mesh | null>(null);
  const { scene } = useGLTF("/hoodie_copy.glb");

  scene.traverse((child) => {
    if (child instanceof THREE.Mesh) {
      child.material = new THREE.MeshStandardMaterial({ color });

      switch (materialType) {
        case "Leather":
          child.material.roughness = 0.3;
          child.material.metalness = 0.8;
          break;
        case "Metallic":
          child.material.roughness = 0.1;
          child.material.metalness = 1;
          break;
        case "Glowing":
          child.material.emissive = new THREE.Color(color);
          child.material.emissiveIntensity = 1;
          break;
        default:
          child.material.roughness = 1;
          child.material.metalness = 0;
      }
    }
  });

  return <primitive ref={modelRef} object={scene} scale={0.7} />;
};
const StarField = () => {
  return (
    <Stars
      radius={50} // Spread out stars in a large sphere
      depth={50} // Adds depth to the starfield
      count={1000} // Number of stars
      factor={5} // Controls the density
      saturation={0} // Make sure they stay white
      fade // Enables smooth fading at edges
    />
  );
};

export default function MaterialColorPage() {
  const [color, setColor] = useState("#ffffff");
  const [materialType, setMaterialType] = useState("Cotton");

  return (
    <div className="relative w-full h-screen bg-gradient-to-br from-black via-cyan-900 to-blue-900 flex items-center justify-center">
      <Canvas
        camera={{ position: [0, 2, 5], fov: 50 }}
        className="absolute inset-0 w-full h-full"
      >
        <ambientLight intensity={0.8} />
        <directionalLight position={[5, 5, 5]} intensity={4} castShadow />
        <Environment preset="night" />
        <OrbitControls enableZoom enablePan enableRotate autoRotate />
        <Model color={color} materialType={materialType} />
        <StarField />
      </Canvas>

      {/* Control Panel */}
      <div className="absolute top-5 left-5 bg-white/10 p-6 rounded-xl backdrop-blur-lg shadow-lg space-y-4 border border-purple-500">
        <h2 className="text-xl font-bold text-white">Customize Your T-Shirt</h2>

        {/* Color Picker */}
        <div>
          <p className="text-white text-sm">Pick a Color:</p>
          <HexColorPicker
            color={color}
            onChange={setColor}
            className="w-full h-20 mt-2 rounded-lg shadow-xl"
          />
        </div>

        {/* Material Selector */}
        <div>
          <p className="text-white text-sm">Material Type:</p>
          <select
            className="w-full p-2 mt-2 rounded bg-gray-800 text-white border border-cyan-500 hover:shadow-md transition-all"
            value={materialType}
            onChange={(e) => setMaterialType(e.target.value)}
          >
            <option value="Cotton">Cotton</option>
            <option value="Leather">Leather</option>
            <option value="Metallic">Metallic</option>
            <option value="Glowing">Glowing</option>
          </select>
        </div>
      </div>
    </div>
  );
}
