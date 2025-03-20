// // // "use client";

// // // import { Canvas } from "@react-three/fiber";
// // // import {
// // //   OrbitControls,
// // //   useGLTF,
// // //   Decal,
// // //   useTexture,
// // //   Environment,
// // // } from "@react-three/drei";
// // // import { useRef, useState, useEffect } from "react";
// // // import * as THREE from "three";

// // // // Model component loads the T-shirt model and applies decals/textures
// // // const Model = ({
// // //   color,
// // //   logoTexture,
// // //   fullTexture,
// // // }: {
// // //   color: string;
// // //   logoTexture: string | null;
// // //   fullTexture: string | null;
// // // }) => {
// // //   const modelRef = useRef<THREE.Group | null>(null);
// // //   // Use non-null assertion so that shirtMeshRef is typed as RefObject<THREE.Mesh>
// // //   const shirtMeshRef = useRef<THREE.Mesh>(null!);
// // //   const { scene } = useGLTF("/shirt_baked.glb");

// // //   // Use a default texture as fallback
// // //   const defaultTexture = "/BLANK.jpg";
// // //   const fabricTexture = useTexture(fullTexture || defaultTexture);
// // //   const logoDecal = useTexture(logoTexture || defaultTexture);

// // //   useEffect(() => {
// // //     scene.traverse((child) => {
// // //       if (child instanceof THREE.Mesh) {
// // //         // Save the first encountered mesh as the shirt mesh
// // //         if (!shirtMeshRef.current) {
// // //           shirtMeshRef.current = child;
// // //         }
// // //         child.material = new THREE.MeshStandardMaterial({
// // //           color,
// // //           map: fabricTexture instanceof THREE.Texture ? fabricTexture : null,
// // //           transparent: !fabricTexture,
// // //           opacity: fabricTexture ? 1 : 0.8,
// // //         });
// // //       }
// // //     });
// // //   }, [scene, fabricTexture, color]);

// // //   return (
// // //     <group ref={modelRef} scale={0.7}>
// // //       <primitive object={scene} />
// // //       {logoTexture &&
// // //         logoTexture !== defaultTexture &&
// // //         shirtMeshRef.current && (
// // //           <Decal
// // //             mesh={shirtMeshRef}
// // //             position={[0, 0.04, 0.15]}
// // //             scale={0.5}
// // //             map={logoDecal instanceof THREE.Texture ? logoDecal : undefined}
// // //           />
// // //         )}
// // //     </group>
// // //   );
// // // };

// // // export default function FileUploaderPage() {
// // //   const [color, setColor] = useState<string>("#ffffff");
// // //   const [fullTexture, setFullTexture] = useState<string | null>(null);
// // //   const [logoTexture, setLogoTexture] = useState<string | null>(null);

// // //   // Convert uploaded image to Base64 string
// // //   const handleImageUpload = (
// // //     event: React.ChangeEvent<HTMLInputElement>,
// // //     type: "full" | "logo"
// // //   ) => {
// // //     const file = event.target.files?.[0];
// // //     if (file) {
// // //       const reader = new FileReader();
// // //       reader.onload = () => {
// // //         const result = reader.result as string;
// // //         if (type === "full") setFullTexture(result);
// // //         if (type === "logo") setLogoTexture(result);
// // //       };
// // //       reader.readAsDataURL(file);
// // //     }
// // //   };

// // //   return (
// // //     <div className="relative w-full h-screen bg-gradient-to-r from-gray-900 via-purple-900 to-black flex items-center justify-center">
// // //       <Canvas
// // //         camera={{ position: [0, 2, 5], fov: 50 }}
// // //         className="absolute inset-0 w-full h-full"
// // //       >
// // //         <ambientLight intensity={0.8} />
// // //         <directionalLight position={[5, 5, 5]} intensity={4} castShadow />
// // //         <Environment preset="city" />
// // //         <OrbitControls enableZoom enablePan enableRotate autoRotate />
// // //         <Model
// // //           color={color}
// // //           fullTexture={fullTexture}
// // //           logoTexture={logoTexture}
// // //         />
// // //       </Canvas>

// // //       {/* Control Panel */}
// // //       <div className="absolute top-5 left-5 bg-white/10 p-6 rounded-xl backdrop-blur-lg shadow-lg space-y-4 border border-purple-500">
// // //         <h2 className="text-xl font-bold text-white">Upload Texture & Logo</h2>
// // //         {/* Full Texture Upload */}
// // //         <div>
// // //           <p className="text-white text-sm">Upload Full Texture:</p>
// // //           <input
// // //             type="file"
// // //             accept="image/*"
// // //             onChange={(e) => handleImageUpload(e, "full")}
// // //             className="text-white text-xs mt-2"
// // //           />
// // //         </div>
// // //         {/* Logo Upload */}
// // //         <div>
// // //           <p className="text-white text-sm">Upload Logo:</p>
// // //           <input
// // //             type="file"
// // //             accept="image/*"
// // //             onChange={(e) => handleImageUpload(e, "logo")}
// // //             className="text-white text-xs mt-2"
// // //           />
// // //         </div>
// // //       </div>
// // //     </div>
// // //   );
// // // }

// "use client";

// import { Canvas } from "@react-three/fiber";
// import {
//   OrbitControls,
//   useGLTF,
//   Decal,
//   useTexture,
//   Environment,
// } from "@react-three/drei";
// import { useRef, useState, useEffect } from "react";
// import * as THREE from "three";

// // Model component loads the T-shirt model and applies decals/textures
// const Model = ({
//   color,
//   logoTexture,
//   fullTexture,
// }: {
//   color: string;
//   logoTexture: string | null;
//   fullTexture: string | null;
// }) => {
//   const modelRef = useRef<THREE.Group | null>(null);
//   // Use non-null assertion so that shirtMeshRef is typed as RefObject<THREE.Mesh>
//   const shirtMeshRef = useRef<THREE.Mesh>(null!);
//   const { scene } = useGLTF("/shirt_baked.glb");

//   // Use a default texture as fallback
//   const defaultTexture = "/BLANK.jpg";
//   const fabricTexture = useTexture(fullTexture || defaultTexture);
//   const logoDecal = useTexture(logoTexture || defaultTexture);

//   // Flip textures vertically to correct orientation
//   fabricTexture.flipY = false;
//   logoDecal.flipY = true;

//   //   useEffect(() => {
//   //     scene.traverse((child) => {
//   //       if (child instanceof THREE.Mesh) {
//   //         // Save the first encountered mesh as the shirt mesh
//   //         if (!shirtMeshRef.current) {
//   //           shirtMeshRef.current = child;
//   //         }
//   //         // child.material = new THREE.MeshStandardMaterial({
//   //         //   color,
//   //         //   map: fabricTexture instanceof THREE.Texture ? fabricTexture : null,
//   //         //   transparent: !fabricTexture,
//   //         //   opacity: fabricTexture ? 1 : 0.8,
//   //         // });

//   //         child.material = new THREE.MeshStandardMaterial({
//   //           color,
//   //           map: fabricTexture instanceof THREE.Texture ? fabricTexture : null,
//   //           transparent: true,
//   //           opacity: fabricTexture ? 1 : 0.9,
//   //           side: THREE.DoubleSide, // Ensures both sides of the T-shirt are textured
//   //         });
//   //       }
//   //     });
//   //   }, [scene, fabricTexture, color]);

//   useEffect(() => {
//     scene.traverse((child) => {
//       if (child instanceof THREE.Mesh) {
//         // Assign the first encountered mesh as the T-shirt mesh
//         if (!shirtMeshRef.current) {
//           shirtMeshRef.current = child;
//         }

//         // Apply full texture with proper alignment
//         child.material = new THREE.MeshStandardMaterial({
//           color,
//           map: fabricTexture instanceof THREE.Texture ? fabricTexture : null,
//           transparent: true,
//           opacity: fabricTexture ? 1 : 0.9,
//           side: THREE.DoubleSide,
//         });

//         // Adjust the texture coordinates
//         if (fabricTexture) {
//           fabricTexture.wrapS = THREE.RepeatWrapping;
//           fabricTexture.wrapT = THREE.RepeatWrapping;
//           fabricTexture.repeat.set(1.2, 1.2); // Scale texture to fit
//           fabricTexture.offset.set(0.05, 0.05); // Adjust positioning
//         }
//       }
//     });
//   }, [scene, fabricTexture, color]);

//   return (
//     <group ref={modelRef} scale={0.7}>
//       <primitive object={scene} />
//       {logoTexture &&
//         logoTexture !== defaultTexture &&
//         shirtMeshRef.current && (
//           //   <Decal
//           //     mesh={shirtMeshRef}
//           //     position={[0, 0.04, 0.15]}
//           //     scale={0.5}
//           //     map={logoDecal instanceof THREE.Texture ? logoDecal : undefined}
//           //   />

//           <Decal
//             mesh={shirtMeshRef}
//             position={[0, 0.05, 0.12]} // Centered on chest
//             rotation={[0, 0, 0]} // Flat on the surface
//             scale={[0.2, 0.2, 0.2]} // Adjust size as needed
//             map={logoDecal instanceof THREE.Texture ? logoDecal : undefined}
//           />
//         )}
//     </group>
//   );
// };

// export default function FileUploaderPage() {
//   const [color, setColor] = useState<string>("#ffffff");
//   const [fullTexture, setFullTexture] = useState<string | null>(null);
//   const [logoTexture, setLogoTexture] = useState<string | null>(null);

//   // Convert uploaded image to Base64 string
//   const handleImageUpload = (
//     event: React.ChangeEvent<HTMLInputElement>,
//     type: "full" | "logo"
//   ) => {
//     const file = event.target.files?.[0];
//     if (file) {
//       const reader = new FileReader();
//       reader.onload = () => {
//         const result = reader.result as string;
//         if (type === "full") setFullTexture(result);
//         if (type === "logo") setLogoTexture(result);
//       };
//       reader.readAsDataURL(file);
//     }
//   };

//   return (
//     <div className="relative w-full h-screen bg-gradient-to-r  from-blue-900 via-cyan-600 to-white flex items-center justify-center">
//       <Canvas
//         camera={{ position: [0, 2, 5], fov: 8 }}
//         className="absolute inset-0 w-full h-full"
//       >
//         <ambientLight intensity={0.8} />
//         <directionalLight position={[5, 5, 5]} intensity={4} castShadow />
//         <Environment preset="city" />
//         <OrbitControls enableZoom enablePan enableRotate autoRotate />
//         <Model
//           color={color}
//           fullTexture={fullTexture}
//           logoTexture={logoTexture}
//         />
//       </Canvas>

//       {/* Control Panel */}
//       <div className="absolute top-5 left-5 bg-white/10 p-6 rounded-xl backdrop-blur-lg shadow-lg space-y-4 border border-purple-500">
//         <h2 className="text-xl font-bold text-white">Upload Texture & Logo</h2>
//         {/* Full Texture Upload */}
//         <div>
//           <p className="text-white text-sm">Upload Full Texture:</p>
//           <input
//             type="file"
//             accept="image/*"
//             onChange={(e) => handleImageUpload(e, "full")}
//             className="text-white text-xs mt-2"
//           />
//         </div>
//         {/* Logo Upload */}
//         <div>
//           <p className="text-white text-sm">Upload Logo:</p>
//           <input
//             type="file"
//             accept="image/*"
//             onChange={(e) => handleImageUpload(e, "logo")}
//             className="text-white text-xs mt-2"
//           />
//         </div>
//       </div>
//     </div>
//   );
// }

// // "use client";

// // import { useState } from "react";
// // import TshirtCustomizer from "./CustomizeUser";

// // export default function CustomizerPage() {
// //   const [color, setColor] = useState<string>("#ffffff");
// //   const [fullTexture, setFullTexture] = useState<string | null>(null);
// //   const [logoTexture, setLogoTexture] = useState<string | null>(null);
// //   const [logoPosition, setLogoPosition] = useState<[number, number, number]>([
// //     0, 0.05, 0.12,
// //   ]);
// //   const [logoScale, setLogoScale] = useState<[number, number, number]>([
// //     0.2, 0.2, 0.2,
// //   ]);

// //   const handleImageUpload = (
// //     event: React.ChangeEvent<HTMLInputElement>,
// //     type: "full" | "logo"
// //   ) => {
// //     const file = event.target.files?.[0];
// //     if (file) {
// //       const reader = new FileReader();
// //       reader.onload = () => {
// //         const result = reader.result as string;
// //         if (type === "full") setFullTexture(result);
// //         if (type === "logo") setLogoTexture(result);
// //       };
// //       reader.readAsDataURL(file);
// //     }
// //   };

// //   return (
// //     <div className="relative w-full h-screen bg-gradient-to-r from-blue-900 via-cyan-600 to-white flex items-center justify-center">
// //       <TshirtCustomizer />

// //       {/* Control Panel */}
// //       <div className="absolute top-5 left-5 bg-white/10 p-6 rounded-xl backdrop-blur-lg shadow-lg space-y-4 border border-purple-500">
// //         <h2 className="text-xl font-bold text-white">Upload Texture & Logo</h2>

// //         {/* Full Texture Upload */}
// //         <div>
// //           <p className="text-white text-sm">Upload Full Texture:</p>
// //           <input
// //             type="file"
// //             accept="image/*"
// //             onChange={(e) => handleImageUpload(e, "full")}
// //             className="text-white text-xs mt-2"
// //           />
// //         </div>

// //         {/* Logo Upload */}
// //         <div>
// //           <p className="text-white text-sm">Upload Logo:</p>
// //           <input
// //             type="file"
// //             accept="image/*"
// //             onChange={(e) => handleImageUpload(e, "logo")}
// //             className="text-white text-xs mt-2"
// //           />
// //         </div>

// //         {/* Logo Position Controls */}
// //         <div>
// //           <p className="text-white text-sm">Move Logo:</p>
// //           <input
// //             type="range"
// //             min="-0.2"
// //             max="0.2"
// //             step="0.01"
// //             value={logoPosition[0]}
// //             onChange={(e) =>
// //               setLogoPosition([
// //                 parseFloat(e.target.value),
// //                 logoPosition[1],
// //                 logoPosition[2],
// //               ])
// //             }
// //           />
// //           <input
// //             type="range"
// //             min="-0.2"
// //             max="0.2"
// //             step="0.01"
// //             value={logoPosition[1]}
// //             onChange={(e) =>
// //               setLogoPosition([
// //                 logoPosition[0],
// //                 parseFloat(e.target.value),
// //                 logoPosition[2],
// //               ])
// //             }
// //           />
// //         </div>

// //         {/* Logo Scale Controls */}
// //         <div>
// //           <p className="text-white text-sm">Scale Logo:</p>
// //           <input
// //             type="range"
// //             min="0.1"
// //             max="1"
// //             step="0.05"
// //             value={logoScale[0]}
// //             onChange={(e) =>
// //               setLogoScale([
// //                 parseFloat(e.target.value),
// //                 parseFloat(e.target.value),
// //                 parseFloat(e.target.value),
// //               ])
// //             }
// //           />
// //         </div>

// //         {/* Change T-shirt Color */}
// //         <div>
// //           <p className="text-white text-sm">Change T-shirt Color:</p>
// //           <input
// //             type="color"
// //             value={color}
// //             onChange={(e) => setColor(e.target.value)}
// //             className="mt-2"
// //           />
// //         </div>
// //       </div>
// //     </div>
// //   );
// // }

"use client";

import React from "react";
import { motion } from "framer-motion";
import HeroSection from "@/components/HeroSection";
import CategorySection from "@/components/CategorySection";
import ProductsSection from "@/components/ProductSection";
import CustomizationSection from "@/components/CustomizationSection";

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      {/* Hero Section with 3D Model */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <HeroSection
          title="Customize Your Style"
          subtitle="Experience the future of fashion with our interactive 3D clothing customization platform. Design, visualize, and create your perfect look."
          ctaText="Start Designing"
        />
      </motion.div>

      {/* Categories Section with Parallax */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
      >
        <CategorySection
          title="Explore Our Collections"
          subtitle="Discover the perfect style for your unique personality"
        />
      </motion.div>

      {/* Products Display Section */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, delay: 0.2 }}
      >
        <ProductsSection
          title="Our Collection"
          subtitle="Discover our latest designs with premium quality materials"
          initialCategory="all"
        />
      </motion.div>

      {/* Customization Preview Section */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, delay: 0.3 }}
      >
        <CustomizationSection />
      </motion.div>

      {/* CTA Section */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, delay: 0.4 }}
        className="py-20 bg-gradient-to-r from-purple-900 to-blue-900 text-white text-center px-4"
      >
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ready to Create Your Unique Style?
          </h2>
          <p className="text-xl mb-8 text-gray-200">
            Join thousands of customers who have already discovered the joy of
            personalized fashion.
          </p>
          <motion.button
            className="bg-white text-purple-900 px-8 py-4 rounded-full text-lg font-bold hover:bg-gray-100 transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Get Started Today
          </motion.button>
        </div>
      </motion.div>
    </main>
  );
}
