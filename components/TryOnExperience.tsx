// "use client";

// import { Canvas } from "@react-three/fiber";
// import { Environment, OrbitControls } from "@react-three/drei";
// import { Physics, RigidBody } from "@react-three/rapier";
// import { useRef, useEffect, useState } from "react";
// import * as THREE from "three";
// import gsap from "gsap";
// import Spline from "@splinetool/react-spline";

// // Function to Generate Random Colors
// const getRandomColors = (): [string, string] => {
//   const randomHex = () =>
//     `#${Math.floor(Math.random() * 16777215).toString(16)}`;
//   return [randomHex(), randomHex()];
// };

// // Bubble Component with Floating, Rotation, and Dynamic Colors
// const Bubble = ({
//   position,
//   colors,
// }: {
//   position: [number, number, number];
//   colors: [string, string];
// }) => {
//   const bubbleRef = useRef<THREE.Mesh>(null);
//   const materialRef = useRef<THREE.MeshStandardMaterial>(null);

//   useEffect(() => {
//     if (bubbleRef.current) {
//       gsap.to(bubbleRef.current.position, {
//         y: "+=1.0",
//         repeat: -1,
//         yoyo: true,
//         duration: 3 + Math.random() * 2,
//         ease: "sine.inOut",
//       });
//       gsap.to(bubbleRef.current.rotation, {
//         y: "+=6.28",
//         repeat: -1,
//         duration: 8 + Math.random() * 4,
//         ease: "linear",
//       });
//     }
//   }, []);

//   useEffect(() => {
//     if (materialRef.current) {
//       materialRef.current.color.set(colors[1]);
//       materialRef.current.emissive.set(colors[0]);
//     }
//   }, [colors]);

//   return (
//     <RigidBody restitution={0.8} friction={0.05} colliders="ball">
//       <mesh ref={bubbleRef} position={position}>
//         <sphereGeometry args={[1.5, 64, 64]} />
//         <meshStandardMaterial
//           ref={materialRef}
//           roughness={0.1}
//           metalness={1}
//           emissiveIntensity={0.7}
//           wireframe={Math.random() > 0.5}
//         />
//       </mesh>
//     </RigidBody>
//   );
// };

// // Main Background Scene with Spline
// export default function VibrantBackground() {
//   const [bubbleColors, setBubbleColors] = useState(
//     Array.from({ length: 25 }, () => getRandomColors())
//   );

//   return (
//     <div className="h-screen w-full relative bg-gradient-to-r from-black to-blue-900">
//       {/* Spline Scene Background */}
//       <Spline
//         scene="https://prod.spline.design/LUsGJWPKF2QpAewt/scene.splinecode"
//         className="absolute inset-0 w-full h-full z-0"
//       />

//       {/* Three.js Canvas (Bubbles) */}
//       <Canvas
//         className="absolute inset-0 w-full h-full z-10"
//         camera={{ position: [0, 0, 10], fov: 50 }}
//       >
//         <Physics gravity={[0, -0.05, 0]}>
//           {bubbleColors.map((colors, i) => (
//             <Bubble
//               key={i}
//               position={[
//                 Math.random() * 10 - 5,
//                 Math.random() * 6 - 3,
//                 Math.random() * 6 - 9,
//               ]}
//               colors={colors}
//             />
//           ))}
//         </Physics>

//         <Environment preset="sunset" />
//         <ambientLight intensity={0.8} />
//         <directionalLight position={[5, 5, 5]} intensity={2} />

//         <OrbitControls
//           enableZoom={true}
//           enableRotate={true}
//           autoRotate
//           autoRotateSpeed={0.8}
//         />
//       </Canvas>
//     </div>
//   );
// }

"use client";

import { Canvas } from "@react-three/fiber";
import { Environment, OrbitControls } from "@react-three/drei";
import { Physics, RigidBody } from "@react-three/rapier";
import { useRef, useEffect, useState } from "react";
import * as THREE from "three";
import gsap from "gsap";
import Spline from "@splinetool/react-spline";

// Function to Generate Random Colors
const getRandomColors = (): [string, string] => {
  const randomHex = () =>
    `#${Math.floor(Math.random() * 16777215).toString(16)}`;
  return [randomHex(), randomHex()];
};

// Bubble Component with Floating, Rotation, and Dynamic Colors
const Bubble = ({
  position,
  colors,
}: {
  position: [number, number, number];
  colors: [string, string];
}) => {
  const bubbleRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<THREE.MeshStandardMaterial>(null);

  useEffect(() => {
    if (bubbleRef.current) {
      gsap.to(bubbleRef.current.position, {
        y: "+=1.0",
        repeat: -1,
        yoyo: true,
        duration: 3 + Math.random() * 2,
        ease: "sine.inOut",
      });
      gsap.to(bubbleRef.current.rotation, {
        y: "+=6.28",
        repeat: -1,
        duration: 8 + Math.random() * 4,
        ease: "linear",
      });
    }
  }, []);

  useEffect(() => {
    if (materialRef.current) {
      materialRef.current.color.set(colors[1]);
      materialRef.current.emissive.set(colors[0]);
    }
  }, [colors]);

  return (
    <RigidBody restitution={0.8} friction={0.05} colliders="ball">
      <mesh ref={bubbleRef} position={position}>
        <sphereGeometry args={[1.5, 64, 64]} />
        <meshStandardMaterial
          ref={materialRef}
          roughness={0.1}
          metalness={1}
          emissiveIntensity={0.7}
          wireframe={Math.random() > 0.5}
        />
      </mesh>
    </RigidBody>
  );
};

// Main Background Scene with Spline
export default function VibrantBackground() {
  const [bubbleColors, setBubbleColors] = useState(
    Array.from({ length: 25 }, () => getRandomColors())
  );

  const splineRef = useRef<HTMLDivElement>(null);

  // Rotate Spline Object using GSAP
  useEffect(() => {
    if (splineRef.current) {
      gsap.to(splineRef.current, {
        rotateY: "360deg",
        duration: 15,
        repeat: -1,
        ease: "linear",
      });
    }
  }, []);

  return (
    <div className="h-screen w-full relative">
      {/* Spline Scene (z-10) */}
      <div
        ref={splineRef}
        className="absolute inset-0 w-full h-full z-10"
        style={{ transformOrigin: "center" }}
      >
        <Spline scene="https://prod.spline.design/LUsGJWPKF2QpAewt/scene.splinecode" />
      </div>

      {/* Three.js Canvas (z-0) */}
      <Canvas
        className="absolute inset-0 w-full h-full z-0"
        camera={{ position: [0, 0, 10], fov: 50 }}
      >
        <Physics gravity={[0, -0.05, 0]}>
          {bubbleColors.map((colors, i) => (
            <Bubble
              key={i}
              position={[
                Math.random() * 10 - 5,
                Math.random() * 6 - 3,
                Math.random() * 6 - 9,
              ]}
              colors={colors}
            />
          ))}
        </Physics>

        <Environment preset="sunset" />
        <ambientLight intensity={0.8} />
        <directionalLight position={[5, 5, 5]} intensity={2} />

        <OrbitControls
          enableZoom={true}
          enableRotate={true}
          autoRotate
          autoRotateSpeed={0.8}
        />
      </Canvas>
    </div>
  );
}
