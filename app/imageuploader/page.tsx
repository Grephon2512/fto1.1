// // "use client";

// // import { Canvas } from "@react-three/fiber";
// // import {
// //   OrbitControls,
// //   useGLTF,
// //   useTexture,
// //   Environment,
// // } from "@react-three/drei";
// // import { useRef, useState, useEffect } from "react";
// // import * as THREE from "three";

// // const Model = ({
// //   color,
// //   frontTexture,
// //   backTexture,
// //   frontOffset,
// //   backOffset,
// // }: {
// //   color: string;
// //   frontTexture: string | null;
// //   backTexture: string | null;
// //   frontOffset: { x: number; y: number };
// //   backOffset: { x: number; y: number };
// // }) => {
// //   const modelRef = useRef<THREE.Group | null>(null);
// //   const shirtMeshRef = useRef<THREE.Mesh>(null!);
// //   const { scene } = useGLTF("/shirt_baked.glb");

// //   const defaultTexture = "/BLANK.jpg";
// //   const frontFabric = useTexture(frontTexture || defaultTexture);
// //   const backFabric = useTexture(backTexture || defaultTexture);

// //   frontFabric.flipY = false;
// //   backFabric.flipY = false;

// //   useEffect(() => {
// //     scene.traverse((child) => {
// //       if (child instanceof THREE.Mesh) {
// //         if (!shirtMeshRef.current) {
// //           shirtMeshRef.current = child;
// //         }

// //         const customMaterial = new THREE.ShaderMaterial({
// //           uniforms: {
// //             frontMap: { value: frontFabric },
// //             backMap: { value: backFabric },
// //             color: { value: new THREE.Color(color) },
// //             frontOffset: {
// //               value: new THREE.Vector2(frontOffset.x, frontOffset.y),
// //             },
// //             backOffset: {
// //               value: new THREE.Vector2(backOffset.x, backOffset.y),
// //             },
// //           },
// //           vertexShader: `
// //             varying vec2 vUv;
// //             varying vec3 vNormal;
// //             void main() {
// //               vUv = uv;
// //               vNormal = normal;
// //               gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
// //             }
// //           `,
// //           fragmentShader: `
// //             uniform sampler2D frontMap;
// //             uniform sampler2D backMap;
// //             uniform vec3 color;
// //             uniform vec2 frontOffset;
// //             uniform vec2 backOffset;

// //             varying vec2 vUv;
// //             varying vec3 vNormal;

// //             void main() {
// //               vec2 adjustedUV = vUv;

// //               vec4 frontTex = texture2D(frontMap, adjustedUV + frontOffset);
// //               vec4 backTex = texture2D(backMap, adjustedUV + backOffset);

// //               vec4 finalColor = (vNormal.z > 0.0) ? frontTex : backTex;
// //               gl_FragColor = vec4(finalColor.rgb * color, finalColor.a);
// //             }
// //           `,
// //         });

// //         child.material = customMaterial;
// //       }
// //     });
// //   }, [scene, frontFabric, backFabric, color, frontOffset, backOffset]);

// //   return (
// //     <group ref={modelRef} scale={0.7}>
// //       <primitive object={scene} />
// //     </group>
// //   );
// // };

// // export default function TShirtCustomizer() {
// //   const [color, setColor] = useState<string>("#ffffff");
// //   const [frontTexture, setFrontTexture] = useState<string | null>(null);
// //   const [backTexture, setBackTexture] = useState<string | null>(null);
// //   const [frontOffset, setFrontOffset] = useState({ x: 0, y: 0 });
// //   const [backOffset, setBackOffset] = useState({ x: 0, y: 0 });

// //   const handleImageUpload = (
// //     event: React.ChangeEvent<HTMLInputElement>,
// //     type: "front" | "back"
// //   ) => {
// //     const file = event.target.files?.[0];
// //     if (file) {
// //       const reader = new FileReader();
// //       reader.onload = () => {
// //         const result = reader.result as string;
// //         if (type === "front") setFrontTexture(result);
// //         if (type === "back") setBackTexture(result);
// //       };
// //       reader.readAsDataURL(file);
// //     }
// //   };

// //   return (
// // <div className="relative w-full h-screen bg-gradient-to-r from-blue-900 via-cyan-600 to-white flex items-center justify-center">
// //   <Canvas
// //     camera={{ position: [0, 2, 5], fov: 8 }}
// //     className="absolute inset-0 w-full h-full"
// //   >
// //     <ambientLight intensity={0.8} />
// //     <directionalLight position={[5, 5, 5]} intensity={4} castShadow />
// //     <Environment preset="city" />
// //     <OrbitControls enableZoom enablePan enableRotate autoRotate />
// //     <Model
// //       color={color}
// //       frontTexture={frontTexture}
// //       backTexture={backTexture}
// //       frontOffset={frontOffset}
// //       backOffset={backOffset}
// //     />
// //   </Canvas>

// //   {/* Control Panel */}
// //   <div className="absolute top-5 left-5 bg-white/10 p-6 rounded-xl backdrop-blur-lg shadow-lg space-y-4 border border-purple-500">
// //     <h2 className="text-xl font-bold text-white">Customize T-Shirt</h2>

// //         {/* Upload Front Texture */}
// //         <div>
// //           <p className="text-white text-sm">Upload Front Texture:</p>
// //           <input
// //             type="file"
// //             accept="image/*"
// //             onChange={(e) => handleImageUpload(e, "front")}
// //             className="text-white text-xs mt-2"
// //           />
// //         </div>

// //         {/* Upload Back Texture */}
// //         <div>
// //           <p className="text-white text-sm">Upload Back Texture:</p>
// //           <input
// //             type="file"
// //             accept="image/*"
// //             onChange={(e) => handleImageUpload(e, "back")}
// //             className="text-white text-xs mt-2"
// //           />
// //         </div>

// //         {/* Adjust Front Texture */}
// //         <div>
// //           <p className="text-white text-sm">Move Front Texture:</p>
// //           <label className="text-white text-xs">X: </label>
// //           <input
// //             type="range"
// //             min="-1"
// //             max="1"
// //             step="0.01"
// //             value={frontOffset.x}
// //             onChange={(e) =>
// //               setFrontOffset({ ...frontOffset, x: parseFloat(e.target.value) })
// //             }
// //           />
// //           <label className="text-white text-xs">Y: </label>
// //           <input
// //             type="range"
// //             min="-1"
// //             max="1"
// //             step="0.01"
// //             value={frontOffset.y}
// //             onChange={(e) =>
// //               setFrontOffset({ ...frontOffset, y: parseFloat(e.target.value) })
// //             }
// //           />
// //         </div>

// //         {/* Adjust Back Texture */}
// //         <div>
// //           <p className="text-white text-sm">Move Back Texture:</p>
// //           <label className="text-white text-xs">X: </label>
// //           <input
// //             type="range"
// //             min="-1"
// //             max="1"
// //             step="0.01"
// //             value={backOffset.x}
// //             onChange={(e) =>
// //               setBackOffset({ ...backOffset, x: parseFloat(e.target.value) })
// //             }
// //           />
// //           <label className="text-white text-xs">Y: </label>
// //           <input
// //             type="range"
// //             min="-1"
// //             max="1"
// //             step="0.01"
// //             value={backOffset.y}
// //             onChange={(e) =>
// //               setBackOffset({ ...backOffset, y: parseFloat(e.target.value) })
// //             }
// //           />
// //         </div>
// //       </div>
// //     </div>
// //   );
// // }

// // "use client";

// // import { Canvas } from "@react-three/fiber";
// // import {
// //   OrbitControls,
// //   useGLTF,
// //   useTexture,
// //   Environment,
// // } from "@react-three/drei";
// // import { useRef, useState, useEffect } from "react";
// // import * as THREE from "three";
// // import { div } from "framer-motion/client";

// // const Model = ({
// //   color,
// //   frontTexture,
// //   backTexture,
// //   frontOffset,
// //   backOffset,
// // }: {
// //   color: string;
// //   frontTexture: string | null;
// //   backTexture: string | null;
// //   frontOffset: { x: number; y: number };
// //   backOffset: { x: number; y: number };
// // }) => {
// //   const modelRef = useRef<THREE.Group | null>(null);
// //   const shirtMeshRef = useRef<THREE.Mesh>(null!);
// //   const { scene } = useGLTF("/shirt_baked.glb");

// //   const defaultTexture = "/BLANK.jpg";
// //   const frontFabric = useTexture(frontTexture || defaultTexture);
// //   const backFabric = useTexture(backTexture || defaultTexture);

// //   frontFabric.flipY = false;
// //   backFabric.flipY = false;

// //   useEffect(() => {
// //     scene.traverse((child) => {
// //       if (child instanceof THREE.Mesh) {
// //         if (!shirtMeshRef.current) {
// //           shirtMeshRef.current = child;
// //         }

// //         const customMaterial = new THREE.ShaderMaterial({
// //           uniforms: {
// //             frontMap: { value: frontFabric },
// //             backMap: { value: backFabric },
// //             color: { value: new THREE.Color(color) },
// //             frontOffset: {
// //               value: new THREE.Vector2(frontOffset.x, frontOffset.y),
// //             },
// //             backOffset: {
// //               value: new THREE.Vector2(backOffset.x, backOffset.y),
// //             },
// //           },
// //           vertexShader: `
// //             varying vec2 vUv;
// //             varying vec3 vNormal;
// //             void main() {
// //               vUv = uv;
// //               vNormal = normal;
// //               gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
// //             }
// //           `,
// //           fragmentShader: `
// //             uniform sampler2D frontMap;
// //             uniform sampler2D backMap;
// //             uniform vec3 color;
// //             uniform vec2 frontOffset;
// //             uniform vec2 backOffset;

// //             varying vec2 vUv;
// //             varying vec3 vNormal;

// //             void main() {
// //               vec2 adjustedUV = vUv;

// //               vec4 frontTex = texture2D(frontMap, adjustedUV + frontOffset);
// //               vec4 backTex = texture2D(backMap, adjustedUV + backOffset);

// //               vec4 finalColor = (vNormal.z > 0.0) ? frontTex : backTex;
// //               gl_FragColor = vec4(finalColor.rgb * color, finalColor.a);
// //             }
// //           `,
// //         });

// //         child.material = customMaterial;
// //       }
// //     });
// //   }, [scene, frontFabric, backFabric, color, frontOffset, backOffset]);

// //   return (
// //     <group ref={modelRef} scale={0.7}>
// //       <primitive object={scene} />
// //     </group>
// //   );
// // };

// // export default function TShirtCustomizer() {
// //   const [color, setColor] = useState<string>("#ffffff");
// //   const [frontTexture, setFrontTexture] = useState<string | null>(null);
// //   const [backTexture, setBackTexture] = useState<string | null>(null);
// //   const [frontOffset, setFrontOffset] = useState({ x: 0, y: 0 });
// //   const [backOffset, setBackOffset] = useState({ x: 0, y: 0 });

// //   const [showLogo, setShowLogo] = useState(true);
// //   const [showFullTexture, setShowFullTexture] = useState(true);

// //   const handleImageUpload = (
// //     event: React.ChangeEvent<HTMLInputElement>,
// //     type: "front" | "back"
// //   ) => {
// //     const file = event.target.files?.[0];
// //     if (file) {
// //       const reader = new FileReader();
// //       reader.onload = () => {
// //         const result = reader.result as string;
// //         if (type === "front") setFrontTexture(result);
// //         if (type === "back") setBackTexture(result);
// //       };
// //       reader.readAsDataURL(file);
// //     }
// //   };

// //   return (
// //     <div className="relative w-full h-screen bg-gradient-to-r from-blue-900 via-cyan-500 to-white flex items-center justify-center">
// //       <Canvas
// //         camera={{ position: [0, 2, 5], fov: 6 }}
// //         className="absolute inset-0 w-full h-full"
// //       >
// //         <ambientLight intensity={0.8} />
// //         <directionalLight position={[5, 5, 5]} intensity={4} castShadow />
// //         <Environment preset="city" />
// //         <OrbitControls enableZoom enablePan enableRotate autoRotate />
// //         {/* <Model
// //           color={color}
// //           frontTexture={frontTexture}
// //           backTexture={backTexture}
// //           frontOffset={frontOffset}
// //           backOffset={backOffset}
// //         /> */}

// //         <Model
// //           color={color}
// //           frontTexture={showFullTexture ? frontTexture : null}
// //           backTexture={showFullTexture ? backTexture : null}
// //           frontOffset={frontOffset}
// //           backOffset={backOffset}
// //         />
// //       </Canvas>

// //       {/* Toggle Logo Display */}
// //       <div className="flex items-center justify-between">
// //         <p className="text-white text-sm">Show Logo:</p>
// //         <button
// //           onClick={() => setShowLogo(!showLogo)}
// //           className={`px-4 py-2 rounded-lg font-semibold transition-all duration-300 ${
// //             showLogo
// //               ? "bg-green-500 hover:bg-green-600"
// //               : "bg-red-500 hover:bg-red-600"
// //           } text-white shadow-md`}
// //         >
// //           {showLogo ? "ON" : "OFF"}
// //         </button>
// //       </div>

// //       {/* Toggle Full Texture Display */}
// //       <div className="flex items-center justify-between">
// //         <p className="text-white text-sm">Show Full Texture:</p>
// //         <button
// //           onClick={() => setShowFullTexture(!showFullTexture)}
// //           className={`px-4 py-2 rounded-lg font-semibold transition-all duration-300 ${
// //             showFullTexture
// //               ? "bg-green-500 hover:bg-green-600"
// //               : "bg-red-500 hover:bg-red-600"
// //           } text-white shadow-md`}
// //         >
// //           {showFullTexture ? "ON" : "OFF"}
// //         </button>
// //       </div>

// //       {/* Control Panel */}
// //       <div className="absolute top-5 left-5 bg-white/10 p-6 rounded-xl backdrop-blur-lg shadow-xl space-y-6 border border-lime-500">
// //         <h2 className="text-2xl font-bold text-white text-center">
// //           🛠 Customize Your T-Shirt
// //         </h2>

// //         {/* Upload Front Texture */}
// //         <div className="flex flex-col space-y-2">
// //           <p className="text-white text-sm">Upload Front Texture:</p>
// //           <label className="relative cursor-pointer bg-gradient-to-r from-purple-500 via-blue-500 to-cyan-500 text-white px-4 py-2 rounded-lg shadow-lg font-semibold transition-all duration-300 ease-in-out hover:shadow-xl hover:scale-105 active:scale-95">
// //             <input
// //               type="file"
// //               accept="image/*"
// //               onChange={(e) => handleImageUpload(e, "front")}
// //               className="hidden"
// //             />
// //             📷 Upload Front
// //           </label>
// //         </div>

// //         {/* Upload Back Texture */}
// //         <div className="flex flex-col space-y-2">
// //           <p className="text-white text-sm">Upload Back Texture:</p>
// //           <label className="relative cursor-pointer bg-gradient-to-r from-red-500 via-pink-500 to-yellow-500 text-white px-4 py-2 rounded-lg shadow-lg font-semibold transition-all duration-300 ease-in-out hover:shadow-xl hover:scale-105 active:scale-95">
// //             <input
// //               type="file"
// //               accept="image/*"
// //               onChange={(e) => handleImageUpload(e, "back")}
// //               className="hidden"
// //             />
// //             🎨 Upload Back
// //           </label>
// //         </div>

// //         {/* Adjust Front Texture */}
// //         <div className="flex flex-col space-y-2">
// //           <p className="text-white text-sm">Move Front Texture:</p>
// //           <div className="flex items-center space-x-2">
// //             <span className="text-white text-xs">X:</span>
// //             <input
// //               type="range"
// //               min="-1"
// //               max="1"
// //               step="0.01"
// //               value={frontOffset.x}
// //               onChange={(e) =>
// //                 setFrontOffset({
// //                   ...frontOffset,
// //                   x: parseFloat(e.target.value),
// //                 })
// //               }
// //               className="w-28 h-2 bg-gray-400 rounded-lg appearance-none cursor-pointer transition-all duration-300 hover:bg-purple-500"
// //             />
// //           </div>
// //           <div className="flex items-center space-x-2">
// //             <span className="text-white text-xs">Y:</span>
// //             <input
// //               type="range"
// //               min="-1"
// //               max="1"
// //               step="0.01"
// //               value={frontOffset.y}
// //               onChange={(e) =>
// //                 setFrontOffset({
// //                   ...frontOffset,
// //                   y: parseFloat(e.target.value),
// //                 })
// //               }
// //               className="w-28 h-2 bg-gray-400 rounded-lg appearance-none cursor-pointer transition-all duration-300 hover:bg-purple-500"
// //             />
// //           </div>
// //         </div>

// //         {/* Adjust Back Texture */}
// //         <div className="flex flex-col space-y-2">
// //           <p className="text-white text-sm">Move Back Texture:</p>
// //           <div className="flex items-center space-x-2">
// //             <span className="text-white text-xs">X:</span>
// //             <input
// //               type="range"
// //               min="-1"
// //               max="1"
// //               step="0.01"
// //               value={backOffset.x}
// //               onChange={(e) =>
// //                 setBackOffset({ ...backOffset, x: parseFloat(e.target.value) })
// //               }
// //               className="w-28 h-2 bg-gray-400 rounded-lg appearance-none cursor-pointer transition-all duration-300 hover:bg-red-500"
// //             />
// //           </div>
// //           <div className="flex items-center space-x-2">
// //             <span className="text-white text-xs">Y:</span>
// //             <input
// //               type="range"
// //               min="-1"
// //               max="1"
// //               step="0.01"
// //               value={backOffset.y}
// //               onChange={(e) =>
// //                 setBackOffset({ ...backOffset, y: parseFloat(e.target.value) })
// //               }
// //               className="w-28 h-2 bg-gray-400 rounded-lg appearance-none cursor-pointer transition-all duration-300 hover:bg-red-500"
// //             />
// //           </div>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // }

// "use client";

// import { Canvas } from "@react-three/fiber";
// import {
//   OrbitControls,
//   useGLTF,
//   useTexture,
//   Environment,
//   Stars,
// } from "@react-three/drei";
// import { useRef, useState, useEffect } from "react";
// import * as THREE from "three";
// import { div } from "framer-motion/client";
// import { HexColorPicker } from "react-colorful";

// const StarField = () => {
//   return (
//     <Stars
//       radius={50} // Spread out stars in a large sphere
//       depth={50} // Adds depth to the starfield
//       count={2000} // Number of stars
//       factor={5} // Controls the density
//       saturation={0} // Make sure they stay white
//       fade // Enables smooth fading at edges
//     />
//   );
// };

// const Model = ({
//   color,
//   frontTexture,
//   backTexture,
//   frontOffset,
//   backOffset,
// }: {
//   color: string;
//   frontTexture: string | null;
//   backTexture: string | null;
//   frontOffset: { x: number; y: number };
//   backOffset: { x: number; y: number };
// }) => {
//   const modelRef = useRef<THREE.Group | null>(null);
//   const shirtMeshRef = useRef<THREE.Mesh>(null!);
//   const { scene } = useGLTF("/shirt_baked.glb");

//   const defaultTexture = "/BLANK.jpg";
//   const frontFabric = useTexture(frontTexture || defaultTexture);
//   const backFabric = useTexture(backTexture || defaultTexture);

//   frontFabric.flipY = false;
//   backFabric.flipY = false;

//   useEffect(() => {
//     scene.traverse((child) => {
//       if (child instanceof THREE.Mesh) {
//         if (!shirtMeshRef.current) {
//           shirtMeshRef.current = child;
//         }

//         const customMaterial = new THREE.ShaderMaterial({
//           uniforms: {
//             frontMap: { value: frontFabric },
//             backMap: { value: backFabric },
//             color: { value: new THREE.Color(color) },
//             frontOffset: {
//               value: new THREE.Vector2(frontOffset.x, frontOffset.y),
//             },
//             backOffset: {
//               value: new THREE.Vector2(backOffset.x, backOffset.y),
//             },
//           },
//           vertexShader:
//             varying vec2 vUv;
//             varying vec3 vNormal;
//             void main() {
//               vUv = uv;
//               vNormal = normal;
//               gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
//             }
//           ,
//           fragmentShader:
//             uniform sampler2D frontMap;
//             uniform sampler2D backMap;
//             uniform vec3 color;
//             uniform vec2 frontOffset;
//             uniform vec2 backOffset;

//             varying vec2 vUv;
//             varying vec3 vNormal;

//             void main() {
//               vec2 adjustedUV = vUv;

//               vec4 frontTex = texture2D(frontMap, adjustedUV + frontOffset);
//               vec4 backTex = texture2D(backMap, adjustedUV + backOffset);

//               vec4 finalColor = (vNormal.z > 0.0) ? frontTex : backTex;
//               gl_FragColor = vec4(finalColor.rgb * color, finalColor.a);
//             }
//           ,
//         });

//         child.material = customMaterial;
//       }
//     });
//   }, [scene, frontFabric, backFabric, color, frontOffset, backOffset]);

//   return (
//     <group ref={modelRef} scale={0.7}>
//       <primitive object={scene} />
//     </group>
//   );
// };

// export default function TShirtCustomizer() {
//   const [color, setColor] = useState<string>("#ffffff");
//   const [frontTexture, setFrontTexture] = useState<string | null>(null);
//   const [backTexture, setBackTexture] = useState<string | null>(null);
//   const [frontOffset, setFrontOffset] = useState({ x: 0, y: 0 });
//   const [backOffset, setBackOffset] = useState({ x: 0, y: 0 });

//   const [showLogo, setShowLogo] = useState(true);
//   const [showFullTexture, setShowFullTexture] = useState(true);

//   const handleImageUpload = (
//     event: React.ChangeEvent<HTMLInputElement>,
//     type: "front" | "back"
//   ) => {
//     const file = event.target.files?.[0];
//     if (file) {
//       const reader = new FileReader();
//       reader.onload = () => {
//         const result = reader.result as string;
//         if (type === "front") setFrontTexture(result);
//         if (type === "back") setBackTexture(result);
//       };
//       reader.readAsDataURL(file);
//     }
//   };

//   return (
//     <div className="relative w-full h-screen bg-gradient-to-r  from-blue-900 via-cyan-600 to-slate-400  flex items-center justify-center">
//       <Canvas
//         camera={{ position: [0, 2, 5], fov: 6 }}
//         className="absolute inset-0 w-full h-full"
//       >
//         <ambientLight intensity={0.8} />
//         <directionalLight position={[5, 5, 5]} intensity={4} castShadow />
//         <Environment preset="city" />
//         <OrbitControls enableZoom enablePan enableRotate autoRotate />

//         <Model
//           color={color}
//           frontTexture={showFullTexture ? frontTexture : null}
//           backTexture={showFullTexture ? backTexture : null}
//           frontOffset={frontOffset}
//           backOffset={backOffset}
//         />
//         <StarField />
//       </Canvas>

//       {/* Color Picker & Toggles */}
//       <div className="relative flex flex-col items-center space-y-4 p-6 rounded-2xl border border-lime-500 bg-white/10 backdrop-blur-xl shadow-2xl transition-all duration-300 hover:shadow-cyan-500/50 w-72">
//         {/* Header */}
//         <h2 className="text-black text-xl font-bold tracking-wider flex items-center gap-2">
//           🎨 Pick a Color:
//         </h2>

//         {/* Color Picker Section with Glow Effect */}
//         <div className="relative flex justify-center items-center p-3 rounded-xl bg-gradient-to-r from-purple-500 via-blue-500 to-cyan-500 shadow-lg">
//           {/* Outer Glow Effect */}
//           <div className="absolute inset-0 rounded-xl blur-2xl opacity-60"></div>
//           {/* Color Picker */}
//           <HexColorPicker
//             color={color}
//             onChange={setColor}
//             className="relative w-28 h-28 p-3 bg-white/20 rounded-xl shadow-xl transform transition-transform duration-300 hover:scale-110"
//           />
//         </div>

//         {/* Toggle Full Texture Display */}
//         <div className="flex items-center justify-between w-full px-3 py-2 rounded-lg bg-white/20 backdrop-blur-md shadow-md transition-all duration-300 hover:shadow-blue-500/50">
//           <p className="text-black text-sm font-medium">
//             🌆 Show Full Texture:
//           </p>
//           <button
//             onClick={() => setShowFullTexture(!showFullTexture)}
//             className={px-4 py-2 rounded-lg font-semibold transition-all duration-300 ${
//               showFullTexture
//                 ? "bg-green-500 hover:bg-green-600"
//                 : "bg-red-500 hover:bg-red-600"
//             } text-white shadow-md}
//           >
//             {showFullTexture ? "ON" : "OFF"}
//           </button>
//         </div>
//       </div>

//       {/* Control Panel */}
//       <div className="absolute top-5 left-5 bg-white/10 p-6 rounded-xl backdrop-blur-lg shadow-xl space-y-6 border border-lime-500">
//         <h2 className="text-2xl font-bold text-white text-center">
//           🛠 Customize Your T-Shirt
//         </h2>

//         {/* Upload Front Texture */}
//         <div className="flex flex-col space-y-2">
//           <p className="text-white text-sm">Upload Front Texture:</p>
//           <label className="relative cursor-pointer bg-gradient-to-r from-purple-500 via-blue-500 to-cyan-500 text-white px-4 py-2 rounded-lg shadow-lg font-semibold transition-all duration-300 ease-in-out hover:shadow-xl hover:scale-105 active:scale-95">
//             <input
//               type="file"
//               accept="image/*"
//               onChange={(e) => handleImageUpload(e, "front")}
//               className="hidden"
//             />
//             📷 Upload Front
//           </label>
//         </div>

//         {/* Upload Back Texture */}
//         <div className="flex flex-col space-y-2">
//           <p className="text-white text-sm">Upload Back Texture:</p>
//           <label className="relative cursor-pointer bg-gradient-to-r from-red-500 via-pink-500 to-yellow-500 text-white px-4 py-2 rounded-lg shadow-lg font-semibold transition-all duration-300 ease-in-out hover:shadow-xl hover:scale-105 active:scale-95">
//             <input
//               type="file"
//               accept="image/*"
//               onChange={(e) => handleImageUpload(e, "back")}
//               className="hidden"
//             />
//             🎨 Upload Back
//           </label>
//         </div>

//         {/* Adjust Front Texture */}
//         <div className="flex flex-col space-y-2">
//           <p className="text-white text-sm">Move Front Texture:</p>
//           <div className="flex items-center space-x-2">
//             <span className="text-white text-xs">X:</span>
//             <input
//               type="range"
//               min="-1"
//               max="1"
//               step="0.01"
//               value={frontOffset.x}
//               onChange={(e) =>
//                 setFrontOffset({
//                   ...frontOffset,
//                   x: parseFloat(e.target.value),
//                 })
//               }
//               className="w-28 h-2 bg-gray-400 rounded-lg appearance-none cursor-pointer transition-all duration-300 hover:bg-purple-500"
//             />
//           </div>
//           <div className="flex items-center space-x-2">
//             <span className="text-white text-xs">Y:</span>
//             <input
//               type="range"
//               min="-1"
//               max="1"
//               step="0.01"
//               value={frontOffset.y}
//               onChange={(e) =>
//                 setFrontOffset({
//                   ...frontOffset,
//                   y: parseFloat(e.target.value),
//                 })
//               }
//               className="w-28 h-2 bg-gray-400 rounded-lg appearance-none cursor-pointer transition-all duration-300 hover:bg-purple-500"
//             />
//           </div>
//         </div>

//         {/* Adjust Back Texture */}
//         <div className="flex flex-col space-y-2">
//           <p className="text-white text-sm">Move Back Texture:</p>
//           <div className="flex items-center space-x-2">
//             <span className="text-white text-xs">X:</span>
//             <input
//               type="range"
//               min="-1"
//               max="1"
//               step="0.01"
//               value={backOffset.x}
//               onChange={(e) =>
//                 setBackOffset({ ...backOffset, x: parseFloat(e.target.value) })
//               }
//               className="w-28 h-2 bg-gray-400 rounded-lg appearance-none cursor-pointer transition-all duration-300 hover:bg-red-500"
//             />
//           </div>
//           <div className="flex items-center space-x-2">
//             <span className="text-white text-xs">Y:</span>
//             <input
//               type="range"
//               min="-1"
//               max="1"
//               step="0.01"
//               value={backOffset.y}
//               onChange={(e) =>
//                 setBackOffset({ ...backOffset, y: parseFloat(e.target.value) })
//               }
//               className="w-28 h-2 bg-gray-400 rounded-lg appearance-none cursor-pointer transition-all duration-300 hover:bg-red-500"
//             />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

"use client";
import { Canvas } from "@react-three/fiber";
import {
  OrbitControls,
  useGLTF,
  useTexture,
  Environment,
  Stars,
} from "@react-three/drei";
import { useRef, useEffect, useMemo, forwardRef, useState } from "react";
import * as THREE from "three";
import { HexColorPicker } from "react-colorful";
import DownloadGLBButton from "@/components/Download";
import ProceedToBuyButton from "@/components/Shopping";
import { useTShirt } from "@/app/context/TShirtContext";
import { useRouter } from "next/navigation";
import VirtualTryOnButton from "@/components/vrtryon";

// Define the expected prop types
interface ModelProps {
  color: string;
  frontTexture?: string;
  backTexture?: string;
  frontOffset?: { x: number; y: number };
  backOffset?: { x: number; y: number };
}

const StarField = () => {
  return (
    <Stars radius={50} depth={50} count={2000} factor={5} saturation={0} fade />
  );
};

const Model = forwardRef<THREE.Group, ModelProps>(function Model(
  {
    color,
    frontTexture = "/BLANK.jpg",
    backTexture = "/BLANK.jpg",
    frontOffset = { x: 0, y: 0 },
    backOffset = { x: 0, y: 0 },
  },
  modelRef
) {
  const shirtMeshRef = useRef<THREE.Mesh>(null);
  const { scene } = useGLTF("/shirt_baked.glb");

  const frontFabric = useTexture(frontTexture);
  const backFabric = useTexture(backTexture);

  frontFabric.flipY = false;
  backFabric.flipY = false;

  const customMaterial = useMemo(
    () =>
      new THREE.ShaderMaterial({
        uniforms: {
          frontMap: { value: frontFabric },
          backMap: { value: backFabric },
          color: { value: new THREE.Color(color) },
          frontOffset: {
            value: new THREE.Vector2(frontOffset.x, frontOffset.y),
          },
          backOffset: { value: new THREE.Vector2(backOffset.x, backOffset.y) },
        },
        vertexShader: `
          varying vec2 vUv;
          varying vec3 vNormal;
          void main() {
            vUv = uv;
            vNormal = normal;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          }
        `,
        fragmentShader: `
          uniform sampler2D frontMap;
          uniform sampler2D backMap;
          uniform vec3 color;
          uniform vec2 frontOffset;
          uniform vec2 backOffset;

          varying vec2 vUv;
          varying vec3 vNormal;

          void main() {
            vec2 adjustedUV = vUv;

            vec4 frontTex = texture2D(frontMap, adjustedUV + frontOffset);
            vec4 backTex = texture2D(backMap, adjustedUV + backOffset);

            vec4 finalColor = (vNormal.z > 0.0) ? frontTex : backTex;
            gl_FragColor = vec4(finalColor.rgb * color, finalColor.a);
          }
        `,
      }),
    [color, frontFabric, backFabric, frontOffset, backOffset]
  );

  useEffect(() => {
    scene.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        if (!shirtMeshRef.current) {
          shirtMeshRef.current = child;
        }
        child.material = customMaterial;
      }
    });
  }, [scene, customMaterial]);

  return (
    <group ref={modelRef} scale={0.7}>
      <primitive object={scene} />
    </group>
  );
});

export default function TShirtCustomizer() {
  const { setTShirtData } = useTShirt();

  const router = useRouter();

  const [color, setColor] = useState<string>("#ffffff");
  const [frontTexture, setFrontTexture] = useState<string | null>(null);
  const [backTexture, setBackTexture] = useState<string | null>(null);
  const [frontOffset, setFrontOffset] = useState({ x: 0, y: 0 });
  const [backOffset, setBackOffset] = useState({ x: 0, y: 0 });

  const [showLogo, setShowLogo] = useState(true);
  const [showFullTexture, setShowFullTexture] = useState(true);

  const modelRef = useRef<THREE.Group>(null!);

  const handleImageUpload = (
    event: React.ChangeEvent<HTMLInputElement>,
    type: "front" | "back"
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const result = reader.result as string;
        if (type === "front") setFrontTexture(result);
        if (type === "back") setBackTexture(result);
      };
      reader.readAsDataURL(file);
    }
  };
  // Function to proceed to Checkout and store data
  const handleProceedToCheckout = () => {
    setTShirtData({ color, frontTexture, backTexture, material: "Cotton" });
    router.push("/checkout"); // Redirect to checkout page
  };

  return (
    <div className="relative w-full h-screen bg-gradient-to-r  from-blue-900 via-cyan-600 to-slate-400  flex items-center justify-center">
      <Canvas
        camera={{ position: [0, 2, 5], fov: 6 }}
        className="absolute inset-0 w-full h-full"
      >
        <ambientLight intensity={0.8} />
        <directionalLight position={[5, 5, 5]} intensity={4} castShadow />
        <Environment preset="city" />
        <OrbitControls enableZoom enablePan enableRotate />

        <Model
          ref={modelRef}
          color={color}
          frontTexture={
            showFullTexture && frontTexture ? frontTexture : undefined
          }
          backTexture={showFullTexture && backTexture ? backTexture : undefined}
          frontOffset={frontOffset}
          backOffset={backOffset}
        />

        <StarField />
      </Canvas>

      {/* Color Picker & Toggles */}
      <div className="relative flex flex-col items-center space-y-4 p-6 rounded-2xl border border-lime-500 bg-white/10 backdrop-blur-xl shadow-2xl transition-all duration-300 hover:shadow-cyan-500/50 w-72">
        {/* Header */}
        <h2 className="text-black text-xl font-bold tracking-wider flex items-center gap-2">
          🎨 Pick a Color:
        </h2>

        {/* Color Picker Section with Glow Effect */}
        <div className="relative flex justify-center items-center p-3 rounded-xl bg-gradient-to-r from-purple-500 via-blue-500 to-cyan-500 shadow-lg">
          {/* Outer Glow Effect */}
          <div className="absolute inset-0 rounded-xl blur-2xl opacity-60"></div>
          {/* Color Picker */}
          <HexColorPicker
            color={color}
            onChange={setColor}
            className="relative w-28 h-28 p-3 bg-white/20 rounded-xl shadow-xl transform transition-transform duration-300 hover:scale-110"
          />
        </div>

        {/* Toggle Full Texture Display */}
        <div className="flex items-center justify-between w-full px-3 py-2 rounded-lg bg-white/20 backdrop-blur-md shadow-md transition-all duration-300 hover:shadow-blue-500/50">
          <p className="text-black text-sm font-medium">
            🌆 Show Full Texture:
          </p>
          <button
            onClick={() => setShowFullTexture(!showFullTexture)}
            className={`px-4 py-2 rounded-lg font-semibold transition-all duration-300 ${
              showFullTexture
                ? "bg-green-500 hover:bg-green-600"
                : "bg-red-500 hover:bg-red-600"
            } text-white shadow-md`}
          >
            {showFullTexture ? "ON" : "OFF"}
          </button>
          <VirtualTryOnButton />
        </div>
        <DownloadGLBButton modelRef={modelRef} />
        <ProceedToBuyButton
          customizationData={{
            color,
            frontTexture,
            backTexture,
            material: "cotton", // You can change this dynamically if needed
          }}
          handleProceedToCheckout={handleProceedToCheckout}
        />
      </div>

      {/* Control Panel */}
      <div className="absolute top-5 left-5 bg-white/10 p-6 rounded-xl backdrop-blur-lg shadow-xl space-y-6 border border-lime-500">
        <h2 className="text-2xl font-bold text-white text-center">
          🛠 Customize Your T-Shirt
        </h2>

        {/* Upload Front Texture */}
        <div className="flex flex-col space-y-2">
          <p className="text-white text-sm">Upload Front Texture:</p>
          <label className="relative cursor-pointer bg-gradient-to-r from-purple-500 via-blue-500 to-cyan-500 text-white px-4 py-2 rounded-lg shadow-lg font-semibold transition-all duration-300 ease-in-out hover:shadow-xl hover:scale-105 active:scale-95">
            <input
              type="file"
              accept="image/*"
              onChange={(e) => handleImageUpload(e, "front")}
              className="hidden"
            />
            📷 Upload Front
          </label>
        </div>

        {/* Upload Back Texture */}
        <div className="flex flex-col space-y-2">
          <p className="text-white text-sm">Upload Back Texture:</p>
          <label className="relative cursor-pointer bg-gradient-to-r from-red-500 via-pink-500 to-yellow-500 text-white px-4 py-2 rounded-lg shadow-lg font-semibold transition-all duration-300 ease-in-out hover:shadow-xl hover:scale-105 active:scale-95">
            <input
              type="file"
              accept="image/*"
              onChange={(e) => handleImageUpload(e, "back")}
              className="hidden"
            />
            🎨 Upload Back
          </label>
        </div>

        {/* Adjust Front Texture */}
        <div className="flex flex-col space-y-2">
          <p className="text-white text-sm">Move Front Texture:</p>
          <div className="flex items-center space-x-2">
            <span className="text-white text-xs">X:</span>
            <input
              type="range"
              min="-1"
              max="1"
              step="0.01"
              value={frontOffset.x}
              onChange={(e) =>
                setFrontOffset({
                  ...frontOffset,
                  x: parseFloat(e.target.value),
                })
              }
              className="w-28 h-2 bg-gray-400 rounded-lg appearance-none cursor-pointer transition-all duration-300 hover:bg-purple-500"
            />
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-white text-xs">Y:</span>
            <input
              type="range"
              min="-1"
              max="1"
              step="0.01"
              value={frontOffset.y}
              onChange={(e) =>
                setFrontOffset({
                  ...frontOffset,
                  y: parseFloat(e.target.value),
                })
              }
              className="w-28 h-2 bg-gray-400 rounded-lg appearance-none cursor-pointer transition-all duration-300 hover:bg-purple-500"
            />
          </div>
        </div>

        {/* Adjust Back Texture */}
        <div className="flex flex-col space-y-2">
          <p className="text-white text-sm">Move Back Texture:</p>
          <div className="flex items-center space-x-2">
            <span className="text-white text-xs">X:</span>
            <input
              type="range"
              min="-1"
              max="1"
              step="0.01"
              value={backOffset.x}
              onChange={(e) =>
                setBackOffset({ ...backOffset, x: parseFloat(e.target.value) })
              }
              className="w-28 h-2 bg-gray-400 rounded-lg appearance-none cursor-pointer transition-all duration-300 hover:bg-red-500"
            />
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-white text-xs">Y:</span>
            <input
              type="range"
              min="-1"
              max="1"
              step="0.01"
              value={backOffset.y}
              onChange={(e) =>
                setBackOffset({ ...backOffset, y: parseFloat(e.target.value) })
              }
              className="w-28 h-2 bg-gray-400 rounded-lg appearance-none cursor-pointer transition-all duration-300 hover:bg-red-500"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
