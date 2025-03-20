// // // "use client";

// // // import { Canvas } from "@react-three/fiber";
// // // import { Environment, OrbitControls, useGLTF, Stars } from "@react-three/drei";
// // // import { Suspense, useRef } from "react";
// // // import * as THREE from "three";

// // // // Load the GLB Model
// // // const Model = () => {
// // //   const modelRef = useRef<THREE.Group | null>(null);
// // //   const { scene } = useGLTF("/t_shirt_body_male_copy.glb"); // Ensure this file exists in /public

// // //   return <primitive ref={modelRef} object={scene} scale={0.7} />;
// // // };

// // // const StarField = () => {
// // //   return (
// // //     <Stars
// // //       radius={50} // Spread out stars in a large sphere
// // //       depth={50} // Adds depth to the starfield
// // //       count={1000} // Number of stars
// // //       factor={5} // Controls the density
// // //       saturation={0} // Make sure they stay white
// // //       fade // Enables smooth fading at edges
// // //     />
// // //   );
// // // };

// // // export default function GLBScene() {
// // //   return (
// // //     <div
// // //       className="relative w-full h-screen bg-gradient-to-r from-blue-900 via-cyan-600 to-white

// // // "
// // //     >
// // //       {/* Three.js Canvas */}
// // //       <Canvas
// // //         camera={{ position: [0, 2, 5], fov: 50 }}
// // //         className="absolute inset-0 w-full h-full"
// // //       >
// // //         <Suspense fallback={null}>
// // //           <StarField />

// // //           {/* Model */}

// // //           <Model />
// // //         </Suspense>

// // //         {/* Lights */}
// // //         <directionalLight position={[5, 5, 5]} intensity={4} castShadow />
// // //         <ambientLight intensity={0.8} />

// // //         {/* Background */}
// // //         <Environment preset="night" />

// // //         {/* Controls */}
// // //         <OrbitControls enableZoom enablePan enableRotate autoRotate />
// // //       </Canvas>
// // //     </div>
// // //   );
// // // }

// // "use client";

// // import { Canvas } from "@react-three/fiber";
// // import { Environment, OrbitControls, useGLTF, Stars } from "@react-three/drei";
// // import { Suspense, useRef } from "react";
// // import * as THREE from "three";

// // // Load the GLB Model
// // const Model = () => {
// //   const modelRef = useRef<THREE.Group | null>(null);
// //   const { scene } = useGLTF("/t_shirt_body_male_copy.glb"); // Ensure this file exists in /public

// //   return <primitive ref={modelRef} object={scene} scale={0.7} />;
// // };

// // const StarField = () => {
// //   return (
// //     <Stars
// //       radius={50} // Spread out stars in a large sphere
// //       depth={50} // Adds depth to the starfield
// //       count={1000} // Number of stars
// //       factor={5} // Controls the density
// //       saturation={0} // Make sure they stay white
// //       fade // Enables smooth fading at edges
// //     />
// //   );
// // };

// // export default function GLBScene() {
// //   return (
// //     <div className="relative w-full h-screen bg-gradient-to-r from-blue-900 via-cyan-600 to-white flex items-center justify-center text-center">
// //       {/* Three.js Canvas */}
// //       <Canvas
// //         camera={{ position: [0, 2, 5], fov: 50 }}
// //         className="absolute inset-0 w-full h-full"
// //       >
// //         <Suspense fallback={null}>
// //           <StarField />
// //           {/* Model */}
// //           <Model />
// //         </Suspense>

// //         {/* Lights */}
// //         <directionalLight position={[5, 5, 5]} intensity={4} castShadow />
// //         <ambientLight intensity={0.8} />

// //         {/* Background */}
// //         <Environment preset="night" />

// //         {/* Controls */}
// //         <OrbitControls enableZoom enablePan enableRotate autoRotate />
// //       </Canvas>

// //       {/* Fashion Revolution Text */}
// //       <div className="absolute top-1/4 w-full px-6 text-white">
// //         <h1 className="text-5xl md:text-7xl font-extrabold tracking-wide drop-shadow-lg animate-pulse">
// //           FASHION REVOLUTION
// //         </h1>
// //         <p className="mt-4 text-lg md:text-2xl font-light tracking-wider animate-fade-up">
// //           "Not just clothing, but a movement. Redefining the future, one stitch
// //           at a time."
// //         </p>
// //       </div>
// //     </div>
// //   );
// // }

// "use client";

// import { Canvas } from "@react-three/fiber";
// import { Environment, OrbitControls, useGLTF, Stars } from "@react-three/drei";
// import { Suspense, useRef } from "react";
// import * as THREE from "three";
// import Link from "next/link";

// // Load the GLB Model
// const Model = () => {
//   const modelRef = useRef<THREE.Group | null>(null);
//   const { scene } = useGLTF("/t_shirt_body_male_copy.glb"); // Ensure this file exists in /public

//   return <primitive ref={modelRef} object={scene} scale={0.7} />;
// };

// const StarField = () => {
//   return (
//     <Stars
//       radius={50} // Spread out stars in a large sphere
//       depth={50} // Adds depth to the starfield
//       count={1500} // Number of stars
//       factor={5} // Controls the density
//       saturation={0} // Make sure they stay white
//       fade // Enables smooth fading at edges
//     />
//   );
// };

// export default function GLBScene() {
//   return (
//     <div className="relative w-full h-screen bg-gradient-to-r from-blue-900 via-cyan-600 to-white flex items-center justify-center text-center">
//       {/* Three.js Canvas */}
//       <Canvas
//         camera={{ position: [0, 2, 5], fov: 50 }}
//         className="absolute inset-0 w-full h-full"
//       >
//         <Suspense fallback={null}>
//           <StarField />
//           {/* Model */}
//           <Model />
//         </Suspense>

//         {/* Lights */}
//         <directionalLight position={[5, 5, 5]} intensity={4} castShadow />
//         <ambientLight intensity={0.8} />

//         {/* Background */}
//         <Environment preset="night" />

//         {/* Controls */}
//         <OrbitControls enableZoom enablePan enableRotate autoRotate />
//       </Canvas>

//       {/* Fashion Revolution Text */}
//       {/* <div className="absolute top-1/4 w-full px-6 text-white">
//         <h1 className="text-6xl md:text-8xl font-extrabold tracking-widest drop-shadow-2xl bg-clip-text text-transparent bg-gradient-to-r from-orange-200 via-red-500 to-amber-500 animate-rotate-3d ">
//           FASHION REVOLUTION
//         </h1>
//         <p className="mt-6 text-lg md:text-2xl font-medium tracking-wider bg-clip-text text-transparent bg-gradient-to-r from-orange-600 to-yellow-100 animate-fade-up">
//           "Beyond trends, beyond time. A revolution stitched in passion, woven
//           with innovation."
//         </p>
//       </div> */}
//       <div>
//         {/* <h1 className="text-6xl md:text-7xl font-extrabold tracking-wide bg-gradient-to-r  from-orange-300 via-red-500 to-amber-500 text-transparent bg-clip-text drop-shadow-lg animate-wave ">
//           FASHION REVOLUTION
//         </h1>

//         <br />
//         <p className="mt-6 text-lg md:text-2xl font-bold tracking-wider bg-clip-text text-transparent bg-gradient-to-r from-orange-500 to-red-500 animate-flicker-soft">
//           "Beyond trends, beyond time. A revolution stitched in passion, woven
//           with innovation."
//         </p> */}

//         <h1 className="text-6xl md:text-7xl font-extrabold tracking-wide bg-gradient-to-r from-orange-300 via-red-500 to-amber-500 text-transparent bg-clip-text drop-shadow-lg animate-wave transition-all duration-500 ease-in-out hover:scale-105 hover:drop-shadow-[0_0_25px_rgba(255,69,0,0.8)]">
//           FASHION REVOLUTION
//         </h1>

//         <br />

//         <p className="mt-6 text-lg md:text-2xl font-bold tracking-wider bg-clip-text text-transparent bg-gradient-to-r from-orange-500 to-red-500 animate-flicker-soft transition-all duration-500 ease-in-out hover:scale-105 hover:drop-shadow-[0_0_20px_rgba(255,140,0,0.8)]">
//           "Beyond trends, beyond time. A revolution stitched in passion, woven
//           with innovation."
//         </p>

//         <br />

//       <Link href="/textureLogo">
//         <button
//           className="relative px-8 py-3 text-lg font-bold uppercase tracking-wider text-white
// bg-gradient-to-r from-cyan-400 to-blue-600 rounded-full shadow-lg transition-all
// duration-300 ease-in-out hover:from-pink-500 hover:to-yellow-500 hover:shadow-pink-500/50
// active:scale-95 before:absolute before:inset-0 before:rounded-full before:border-2
// before:border-white/30 before:animate-pulse hover:before:border-yellow-400/50
// animate-glow"
//         >
//           Get Started
//         </button>
//       </Link>
//       </div>
//     </div>
//   );
// }

"use client";

import { Canvas } from "@react-three/fiber";
import { Environment, OrbitControls, useGLTF, Stars } from "@react-three/drei";
import { Suspense, useRef, useState } from "react";
import * as THREE from "three";
import Link from "next/link";
import { Button, Container, Typography } from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";
import { useFrame } from "@react-three/fiber";

import Navbar from "@/components/navbar";
import BackgroundPaths from "@/components/BackgroundPath";

const BrainModel = ({
  setShowPopup,
}: {
  setShowPopup: (show: boolean) => void;
}) => {
  const { scene } = useGLTF("/t_shirt_body_male_copy.glb");
  const brainRef = useRef<THREE.Group>(null);

  useFrame(() => {
    if (brainRef.current) {
      brainRef.current.rotation.y += 0.005;
    }
  });

  return (
    <primitive
      ref={brainRef}
      object={scene}
      scale={0.8}
      onPointerOver={() => setShowPopup(true)}
      onPointerOut={() => setShowPopup(false)}
    />
  );
};

const StarField = () => {
  return (
    <Stars radius={50} depth={50} count={1500} factor={5} saturation={0} fade />
  );
};

export default function GLBScene() {
  const [showPopup, setShowPopup] = useState(false);

  return (
    <div className="relative w-full h-screen bg-gradient-to-r from-blue-900 via-cyan-600 to-black flex flex-col items-center text-center">
      <BackgroundPaths />
      {/* Navbar covering full width */}
      <Navbar />

      <div className="flex flex-row w-full h-full items-center justify-between p-7 mt-5">
        {/* Left Section - Content */}
        <Container
          maxWidth="md"
          className="relative z-10 w-1/2 text-left -mt-50"
        >
          <motion.h1
            className="text-6xl font-bold  bg-gradient-to-r from-teal-400 via-green-500 to-lime-600 bg-clip-text text-transparent

   leading-tight "
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            Fashion Revolution
          </motion.h1>
          <br />

          <Typography variant="h6" className="mt-4 text-gray-300 ">
            "Beyond trends, beyond time. A revolution stitched in passion, woven
            with innovation."
          </Typography>
          {/* Floating Drones */}
          <br />
          <br />

          <div className="flex flex-col items-center mt-10 -ml-40">
            <motion.div
              className="-mt-15 flex justify-center"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              {/* <Button
                variant="contained"
                sx={{
                  backgroundColor: "#6366f1",
                  padding: "10px 20px",
                  fontSize: "1rem",
                  borderRadius: "8px",
                  boxShadow: "0px 0px 15px rgba(99, 102, 241, 0.5)",
                  ":hover": {
                    backgroundColor: "#4f46e5",
                    transform: "scale(1.05)",
                    transition: "transform 0.2s ease-in-out",
                  },
                }}
              >
                Get Started
              </Button> */}

              <Link href="/mainpage">
                <button
                  className="relative px-8 py-3 text-lg font-bold uppercase tracking-wider text-white
  bg-gradient-to-r from-cyan-400 to-blue-600 rounded-full shadow-lg transition-all
  duration-300 ease-in-out hover:from-pink-500 hover:to-yellow-500 hover:shadow-pink-500/50
  active:scale-95 before:absolute before:inset-0 before:rounded-full before:border-2
  before:border-white/30 before:animate-pulse hover:before:border-yellow-400/50
  animate-glow"
                >
                  Get Started
                </button>
              </Link>
            </motion.div>
          </div>
        </Container>

        {/* Right Section - Brain Model */}
        <div className="relative w-3/4 h-full flex items-center justify-center">
          <Canvas
            camera={{ position: [0, 2, 5], fov: 50 }}
            className="w-full h-full"
          >
            <Suspense fallback={null}>
              <StarField />
              <BrainModel setShowPopup={setShowPopup} />
            </Suspense>
            <directionalLight position={[5, 5, 5]} intensity={3} castShadow />
            <ambientLight intensity={0.5} />
            <Environment preset="night" />
            <OrbitControls enableZoom enablePan enableRotate autoRotate />
          </Canvas>
        </div>
      </div>

      {/* Pop-up Box (About Us) */}
      <AnimatePresence>
        {showPopup && (
          <motion.div
            className="absolute ml-7 top-1/2 right-1/4 transform -translate-y-1/2 bg-slate-800 bg-opacity-90 p-6 rounded-lg shadow-lg border border-gray-700 z-50"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.3 }}
          >
            <Typography variant="h5" className="text-cyan-400 font-bold">
              About Us
            </Typography>
            <Typography variant="body1" className="text-gray-300 mt-2">
              Welcome to AlphaGen, the ultimate AI-powered platform designed
              exclusively for content creators.
              <br />
              <br />
              Whether you're a writer, designer, video editor, or social media
              influencer, we empower you with cutting-edge AI tools to
              streamline your creative process, spark innovation, and elevate
              your content like never before. In a world where creativity meets
              technology, we bridge the gap by offering AI-driven solutions that
              enhance **writing, image generation, video editing, marketing, and
              much more**—all in one place. <br /> <br />
              With **intelligent automation, real-time collaboration, and
              advanced customization**, you can focus on **what truly
              matters—creating exceptional content that resonates.** Our mission
              is simple: **Make creativity effortless, accessible, and
              limitless.**
            </Typography>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
