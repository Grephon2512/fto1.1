// import React from "react";
// import state from "@/store/state";
// import { useSnapshot } from "valtio";
// import { getContrastingColor } from "@/config/helper";

// interface CustomButtonProps {
//   title: string;
//   type: "filled" | "outline";
//   customStyles?: string;
//   handleClick: () => void;
// }

// const CustomButton: React.FC<CustomButtonProps> = ({
//   title,
//   type,
//   customStyles = "",
//   handleClick,
// }) => {
//   const snap = useSnapshot(state);

//   const generateStyle = (
//     buttonType: "filled" | "outline"
//   ): React.CSSProperties => {
//     if (buttonType === "filled") {
//       return {
//         backgroundColor: snap.color,
//         color: getContrastingColor(snap.color),
//       };
//     } else {
//       return {
//         borderWidth: "1px",
//         borderColor: snap.color,
//         color: snap.color,
//       };
//     }
//   };

//   return (
//     <button
//       className={`px-2 py-1.5 flex-1 rounded-md ${customStyles}`}
//       style={generateStyle(type)}
//       onClick={handleClick}
//     >
//       {title}
//     </button>
//   );
// };

// export default CustomButton;

"use client";

import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF, Environment } from "@react-three/drei";
import { HexColorPicker } from "react-colorful";
import { useRef, useState } from "react";
import * as THREE from "three";

// Load GLB Model
const Model = ({ color, texture, materialType }: any) => {
  const modelRef = useRef<THREE.Mesh | null>(null);
  const { scene } = useGLTF("/t_shirt_body_male_copy.glb"); // Ensure this file is in /public

  // Apply Color & Texture
  scene.traverse((child) => {
    if (child instanceof THREE.Mesh) {
      if (texture) {
        child.material = new THREE.MeshStandardMaterial({
          map: new THREE.TextureLoader().load(texture),
        });
      } else {
        child.material = new THREE.MeshStandardMaterial({ color });
      }

      // Apply Material Type
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
        default: // Cotton
          child.material.roughness = 1;
          child.material.metalness = 0;
      }
    }
  });

  return <primitive ref={modelRef} object={scene} scale={0.7} />;
};

// Main Component
export default function TShirtCustomizer() {
  const [color, setColor] = useState("#ffffff");
  const [texture, setTexture] = useState<string | null>(null);
  const [materialType, setMaterialType] = useState("Cotton");

  // Handle Image Upload for Texture
  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setTexture(url);
    }
  };

  return (
    <div className="relative w-full h-screen bg-gradient-to-r from-purple-900 via-indigo-900 to-black flex items-center justify-center">
      {/* Three.js Canvas */}
      <Canvas
        camera={{ position: [0, 2, 5], fov: 50 }}
        className="absolute inset-0 w-full h-full"
      >
        <ambientLight intensity={0.8} />
        <directionalLight position={[5, 5, 5]} intensity={4} castShadow />
        <Environment preset="city" />
        <OrbitControls enableZoom enablePan enableRotate autoRotate />
        <Model color={color} texture={texture} materialType={materialType} />
      </Canvas>

      {/* Control Panel */}
      <div className="absolute top-5 left-5 bg-white/10 p-4 rounded-lg backdrop-blur-lg shadow-lg space-y-4">
        <h2 className="text-xl font-bold text-white">T-Shirt Customizer</h2>

        {/* Color Picker */}
        <div>
          <p className="text-white text-sm">Pick a Color:</p>
          <HexColorPicker
            color={color}
            onChange={setColor}
            className="w-full h-20 mt-2 rounded-lg shadow-lg"
          />
        </div>

        {/* Texture Upload */}
        <div>
          <p className="text-white text-sm">Upload Texture/Logo:</p>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="text-white text-xs mt-2"
          />
        </div>

        {/* Material Selector */}
        <div>
          <p className="text-white text-sm">Material Type:</p>
          <select
            className="w-full p-2 mt-2 rounded bg-gray-800 text-white"
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
