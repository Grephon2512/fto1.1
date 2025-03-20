// "use client";

// import { useEffect, useRef } from "react";
// import { Canvas } from "@react-three/fiber";
// import { OrbitControls, Environment } from "@react-three/drei";
// import { motion } from "framer-motion";
// import gsap from "gsap";
// import { ScrollTrigger } from "gsap/ScrollTrigger";

// import Spline from "@splinetool/react-spline";

// gsap.registerPlugin(ScrollTrigger);

// export default function FashionTryOn() {
//   const modelRef = useRef(null);
//   const titleRef = useRef(null);

//   useEffect(() => {
//     if (modelRef.current) {
//       gsap.fromTo(
//         modelRef.current,
//         { opacity: 0, y: 50, scale: 0.8 },
//         {
//           opacity: 1,
//           y: 0,
//           scale: 1,
//           duration: 1.5,
//           ease: "power3.out",
//           scrollTrigger: {
//             trigger: modelRef.current,
//             start: "top 80%",
//             toggleActions: "play none none none",
//           },
//         }
//       );
//     }

//     if (titleRef.current) {
//       gsap.fromTo(
//         titleRef.current,
//         { opacity: 0, x: -30 },
//         {
//           opacity: 1,
//           x: 0,
//           duration: 1.2,
//           ease: "power2.out",
//           scrollTrigger: {
//             trigger: titleRef.current,
//             start: "top 85%",
//             toggleActions: "play none none none",
//           },
//         }
//       );
//     }
//   }, []);

//   return (
//     <div className="h-screen w-full bg-black text-white flex flex-col items-center justify-center p-6 md:p-10">
//       {/* Title */}
//       <motion.h1
//         ref={titleRef}
//         initial={{ opacity: 0, y: -20 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 1.5 }}
//         className="text-4xl md:text-6xl font-bold mb-6 text-center"
//       >
//         3D Fashion Try-On
//       </motion.h1>

//       {/* 3D Model */}
//       <div
//         ref={modelRef}
//         className="w-full h-[500px] md:h-[600px] flex justify-center items-center relative"
//       >
//         <Spline scene="https://prod.spline.design/N2NJ7gKWlFFJubSa/scene.splinecode" />
//       </div>

//       {/* Description */}
//       <motion.p
//         initial={{ opacity: 0, y: 20 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ delay: 0.5, duration: 1 }}
//         className="text-md md:text-lg text-gray-300 mt-4 text-center px-4"
//       >
//         Explore and interact with realistic 3D clothing models. Try them on in
//         AR & experience the future of fashion!
//       </motion.p>
//     </div>
//   );
// }

"use client";

import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";

function TshirtModel() {
  const { scene } = useGLTF("/t_shirt_body_male_dark_copy.glb"); // Load your T-shirt model
  return <primitive object={scene} scale={2} />;
}

export default function TshirtScene() {
  return (
    <div className="h-screen w-full bg-black">
      <Canvas camera={{ position: [0, 1, 5], fov: 50 }}>
        <ambientLight intensity={0.8} />
        <directionalLight position={[5, 5, 5]} />
        <TshirtModel />
        <OrbitControls enableZoom enableRotate />
      </Canvas>
    </div>
  );
}
