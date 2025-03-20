// // // import React, { useState } from "react";
// // // import { Canvas } from "@react-three/fiber";
// // // import { Environment, Center } from "@react-three/drei";
// // // import { useSnapshot } from "valtio";
// // // import state from "../store"; // Ensure the correct import path
// // // import TshirtScene from "@/components/shirt";
// // // import FilePicker from "@/components/FilePicker";
// // // import ColorPicker from "@/components/ColorPicker";

// // // const TShirtCustomizer: React.FC = () => {
// // //   const snap = useSnapshot(state);
// // //   const [file, setFile] = useState<File | null>(null);

// // //   const readFile = (type: "logo" | "full", file: File) => {
// // //     const reader = new FileReader();
// // //     reader.readAsDataURL(file);

// // //     reader.onloadend = () => {
// // //       if (reader.result && typeof reader.result === "string") {
// // //         if (type === "logo") {
// // //           state.logoDecal = reader.result;
// // //           state.isLogoTexture = true;
// // //         } else {
// // //           state.fullDecal = reader.result;
// // //           state.isFullTexture = true;
// // //         }
// // //       }
// // //     };
// // //   };

// // //   return (
// // //     <div className="flex w-full h-screen">
// // //       {/* Left Sidebar */}
// // //       <div className="w-1/4 p-4 bg-gray-100">
// // //         <h2 className="text-lg font-semibold mb-2">Customize T-Shirt</h2>
// // //         <ColorPicker />
// // //         <FilePicker file={file} setFile={setFile} readFile={readFile} />
// // //       </div>

// // //       {/* 3D T-Shirt Viewer */}
// // //       <div className="flex-1 bg-gray-200">
// // //         <Canvas camera={{ position: [0, 0, 2], fov: 25 }}>
// // //           <ambientLight intensity={0.5} />
// // //           <Environment preset="city" />
// // //           <Center>
// // //             <TshirtScene />
// // //           </Center>
// // //         </Canvas>
// // //       </div>
// // //     </div>
// // //   );
// // // };

// // // export default TShirtCustomizer;

// // // "use client";

// // // import React, { useState, useEffect } from "react";
// // // import dynamic from "next/dynamic";
// // // import { useSnapshot } from "valtio";
// // // import state from "@/store/state";
// // // import FilePicker from "@/components/FilePicker";
// // // import ColorPicker from "@/components/ColorPicker";

// // // // Dynamically import components (disable SSR)
// // // const Canvas = dynamic(
// // //   () => import("@react-three/fiber").then((mod) => mod.Canvas),
// // //   { ssr: false }
// // // );
// // // const Environment = dynamic(
// // //   () => import("@react-three/drei").then((mod) => mod.Environment),
// // //   { ssr: false }
// // // );
// // // const Center = dynamic(
// // //   () => import("@react-three/drei").then((mod) => mod.Center),
// // //   { ssr: false }
// // // );
// // // const TshirtScene = dynamic(() => import("@/components/shirt"), { ssr: false });

// // // const TShirtCustomizer: React.FC = () => {
// // //   const snap = useSnapshot(state);
// // //   const [file, setFile] = useState<File | null>(null);
// // //   const [mounted, setMounted] = useState(false);

// // //   useEffect(() => {
// // //     setMounted(true);
// // //   }, []);

// // //   const readFile = (type: "logo" | "full", file?: File) => {
// // //     if (!file) return;

// // //     const reader = new FileReader();
// // //     reader.readAsDataURL(file);
// // //     reader.onloadend = () => {
// // //       if (reader.result && typeof reader.result === "string") {
// // //         if (type === "logo") {
// // //           state.logoDecal = reader.result;
// // //           state.isLogoTexture = true;
// // //         } else {
// // //           state.fullDecal = reader.result;
// // //           state.isFullTexture = true;
// // //         }
// // //       }
// // //     };
// // //   };

// // //   if (!mounted) return null; // Prevents SSR hydration errors

// // //   return (
// // //     <div className="flex w-full h-screen">
// // //       {/* Left Sidebar */}
// // //       <div className="w-1/4 p-4 bg-gray-100">
// // //         <h2 className="text-lg font-semibold mb-2">Customize T-Shirt</h2>
// // //         <ColorPicker />
// // //         <FilePicker file={file} setFile={setFile} readFile={readFile} />
// // //       </div>

// // //       {/* 3D T-Shirt Viewer */}
// // //       <div className="flex-1 bg-gray-200">
// // //         <Canvas camera={{ position: [0, 0, 2], fov: 25 }}>
// // //           <ambientLight intensity={0.5} />
// // //           <Environment preset="city" />
// // //           <Center>
// // //             <TshirtScene />
// // //           </Center>
// // //         </Canvas>
// // //       </div>
// // //     </div>
// // //   );
// // // };

// // // export default TShirtCustomizer;

// // "use client";

// // import { useState } from "react";
// // import { Canvas } from "@react-three/fiber";
// // import { OrbitControls, Environment, useGLTF } from "@react-three/drei";
// // import * as THREE from "three";

// // // T-Shirt Model Component
// // const TShirtModel = ({
// //   color,
// //   texture,
// //   logo,
// // }: {
// //   color: string;
// //   texture: THREE.Texture | null;
// //   logo: THREE.Texture | null;
// // }) => {
// //   const { scene } = useGLTF("/t_shirt_body_male_dark_copy.glb"); // Load the .glb model

// //   return (
// //     <mesh>
// //       <primitive object={scene} />
// //       {scene.traverse((child) => {
// //         if ((child as THREE.Mesh).isMesh) {
// //           const mesh = child as THREE.Mesh;
// //           mesh.material = new THREE.MeshStandardMaterial({
// //             color: color, // Apply color
// //             map: texture || null, // Apply texture
// //             roughness: 0.5,
// //             metalness: 0.3,
// //           });
// //         }
// //       })}

// //       {/* Apply Logo */}
// //       {logo && (
// //         <mesh position={[0, 1, 0.5]}>
// //           <planeGeometry args={[1, 1]} />
// //           <meshStandardMaterial map={logo} transparent />
// //         </mesh>
// //       )}
// //     </mesh>
// //   );
// // };

// // export default function CustomizeTShirt() {
// //   const [color, setColor] = useState<string>("#ffffff");
// //   const [texture, setTexture] = useState<THREE.Texture | null>(null);
// //   const [logo, setLogo] = useState<THREE.Texture | null>(null);

// //   // Handle Color Change
// //   const handleColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
// //     setColor(e.target.value);
// //   };

// //   // Handle Texture Upload
// //   const handleTextureUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
// //     const file = e.target.files?.[0];
// //     if (!file) return;

// //     const reader = new FileReader();
// //     reader.onload = () => {
// //       new THREE.TextureLoader().load(
// //         reader.result as string,
// //         (loadedTexture) => {
// //           loadedTexture.wrapS = THREE.RepeatWrapping;
// //           loadedTexture.wrapT = THREE.RepeatWrapping;
// //           setTexture(loadedTexture);
// //         }
// //       );
// //     };
// //     reader.readAsDataURL(file);
// //   };

// //   // Handle Logo Upload
// //   const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
// //     const file = e.target.files?.[0];
// //     if (!file) return;

// //     const reader = new FileReader();
// //     reader.onload = () => {
// //       new THREE.TextureLoader().load(reader.result as string, (logoTexture) => {
// //         logoTexture.wrapS = THREE.ClampToEdgeWrapping;
// //         logoTexture.wrapT = THREE.ClampToEdgeWrapping;
// //         setLogo(logoTexture);
// //       });
// //     };
// //     reader.readAsDataURL(file);
// //   };

// //   return (
// //     <div className="h-screen w-full bg-gray-900 text-white flex flex-col items-center justify-center">
// //       <h1 className="text-3xl font-bold mb-4">Customize Your T-Shirt</h1>

// //       {/* UI Controls */}
// //       <div className="flex flex-col items-center gap-4 mb-6">
// //         <input
// //           type="color"
// //           value={color}
// //           onChange={handleColorChange}
// //           className="w-16 h-16"
// //         />
// //         <input
// //           type="file"
// //           accept="image/*"
// //           onChange={handleTextureUpload}
// //           className="file:bg-blue-500 file:px-3 file:py-2 file:rounded-lg"
// //         />
// //         <input
// //           type="file"
// //           accept="image/*"
// //           onChange={handleLogoUpload}
// //           className="file:bg-green-500 file:px-3 file:py-2 file:rounded-lg"
// //         />
// //       </div>

// //       {/* 3D Canvas */}
// //       <Canvas camera={{ position: [0, 0, 5] }}>
// //         <ambientLight intensity={0.8} />
// //         <directionalLight position={[2, 2, 2]} intensity={1} />
// //         <OrbitControls />
// //         <Environment preset="city" />
// //         <TShirtModel color={color} texture={texture} logo={logo} />
// //       </Canvas>
// //     </div>
// //   );
// // }

// "use client";

// import { Canvas } from "@react-three/fiber";
// import { OrbitControls, useGLTF, Environment } from "@react-three/drei";
// import { HexColorPicker } from "react-colorful";
// import { useRef, useState } from "react";
// import * as THREE from "three";

// // Load GLB Model
// const Model = ({ color, texture, materialType }: any) => {
//   const modelRef = useRef<THREE.Mesh | null>(null);
//   const { scene } = useGLTF("/t_shirt_body_male_copy.glb"); // Ensure this file is in /public

//   // Apply Color & Texture
//   scene.traverse((child) => {
//     if (child instanceof THREE.Mesh) {
//       if (texture) {
//         child.material = new THREE.MeshStandardMaterial({
//           map: new THREE.TextureLoader().load(texture),
//         });
//       } else {
//         child.material = new THREE.MeshStandardMaterial({ color });
//       }

//       // Apply Material Type
//       switch (materialType) {
//         case "Leather":
//           child.material.roughness = 0.3;
//           child.material.metalness = 0.8;
//           break;
//         case "Metallic":
//           child.material.roughness = 0.1;
//           child.material.metalness = 1;
//           break;
//         case "Glowing":
//           child.material.emissive = new THREE.Color(color);
//           child.material.emissiveIntensity = 1;
//           break;
//         default: // Cotton
//           child.material.roughness = 1;
//           child.material.metalness = 0;
//       }
//     }
//   });

//   return <primitive ref={modelRef} object={scene} scale={0.7} />;
// };

// // Main Component
// export default function TShirtCustomizer() {
//   const [color, setColor] = useState("#ffffff");
//   const [texture, setTexture] = useState<string | null>(null);
//   const [materialType, setMaterialType] = useState("Cotton");

//   // Handle Image Upload for Texture
//   const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
//     const file = event.target.files?.[0];
//     if (file) {
//       const url = URL.createObjectURL(file);
//       setTexture(url);
//     }
//   };

//   return (
//     <div className="relative w-full h-screen bg-gradient-to-r from-purple-900 via-indigo-900 to-black flex items-center justify-center">
//       {/* Three.js Canvas */}
//       <Canvas
//         camera={{ position: [0, 2, 5], fov: 50 }}
//         className="absolute inset-0 w-full h-full"
//       >
//         <ambientLight intensity={0.8} />
//         <directionalLight position={[5, 5, 5]} intensity={4} castShadow />
//         <Environment preset="city" />
//         <OrbitControls enableZoom enablePan enableRotate autoRotate />
//         <Model color={color} texture={texture} materialType={materialType} />
//       </Canvas>

//       {/* Control Panel */}
//       <div className="absolute top-5 left-5 bg-white/10 p-4 rounded-lg backdrop-blur-lg shadow-lg space-y-4">
//         <h2 className="text-xl font-bold text-white">T-Shirt Customizer</h2>

//         {/* Color Picker */}
//         <div>
//           <p className="text-white text-sm">Pick a Color:</p>
//           <HexColorPicker
//             color={color}
//             onChange={setColor}
//             className="w-full h-20 mt-2 rounded-lg shadow-lg"
//           />
//         </div>

//         {/* Texture Upload */}
//         <div>
//           <p className="text-white text-sm">Upload Texture/Logo:</p>
//           <input
//             type="file"
//             accept="image/*"
//             onChange={handleImageUpload}
//             className="text-white text-xs mt-2"
//           />
//         </div>

//         {/* Material Selector */}
//         <div>
//           <p className="text-white text-sm">Material Type:</p>
//           <select
//             className="w-full p-2 mt-2 rounded bg-gray-800 text-white"
//             value={materialType}
//             onChange={(e) => setMaterialType(e.target.value)}
//           >
//             <option value="Cotton">Cotton</option>
//             <option value="Leather">Leather</option>
//             <option value="Metallic">Metallic</option>
//             <option value="Glowing">Glowing</option>
//           </select>
//         </div>
//       </div>
//     </div>
//   );
// }

"use client";

import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF, Environment } from "@react-three/drei";
import { HexColorPicker } from "react-colorful";
import { useRef, useState } from "react";
import * as THREE from "three";

const Model = ({ color, materialType }: any) => {
  const modelRef = useRef<THREE.Mesh | null>(null);
  const { scene } = useGLTF("/t_shirt_body_male_copy.glb");

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

export default function MaterialColorPage() {
  const [color, setColor] = useState("#ffffff");
  const [materialType, setMaterialType] = useState("Cotton");

  return (
    <div className="relative w-full h-screen bg-gradient-to-br from-black via-purple-900 to-blue-900 flex items-center justify-center">
      <Canvas
        camera={{ position: [0, 2, 5], fov: 50 }}
        className="absolute inset-0 w-full h-full"
      >
        <ambientLight intensity={0.8} />
        <directionalLight position={[5, 5, 5]} intensity={4} castShadow />
        <Environment preset="night" />
        <OrbitControls enableZoom enablePan enableRotate autoRotate />
        <Model color={color} materialType={materialType} />
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
