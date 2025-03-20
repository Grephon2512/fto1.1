// "use client";

// import { Canvas, useFrame } from "@react-three/fiber";
// import {
//   OrbitControls,
//   useGLTF,
//   Sphere,
//   Stars,
//   Float,
// } from "@react-three/drei";
// import { useEffect, useRef } from "react";
// import gsap from "gsap";
// import * as THREE from "three";
// import { useState } from "react";

// const TShirtModel = () => {
//   const { scene } = useGLTF("/t_shirt_body_male_dark_copy.glb");
//   const modelRef = useRef<THREE.Group | null>(null);
//   const [hovered, setHovered] = useState(false);

//   useFrame(() => {
//     if (modelRef.current) {
//       modelRef.current.rotation.y += 0.01;
//     }
//   });

//   useEffect(() => {
//     if (modelRef.current) {
//       gsap.to(modelRef.current.scale, {
//         x: hovered ? 1.4 : 1,
//         y: hovered ? 1.4 : 1,
//         z: hovered ? 1.4 : 1,
//         duration: 1.2,
//         ease: "elastic.out(1, 0.3)",
//       });
//     }
//   }, [hovered]);

//   return (
//     <primitive
//       object={scene}
//       ref={modelRef}
//       scale={1}
//       onPointerOver={() => setHovered(true)}
//       onPointerOut={() => setHovered(false)}
//     />
//   );
// };

// const BackgroundElements = () => {
//   return (
//     <>
//       {/* Floating Spheres */}
//       <Float speed={1} rotationIntensity={0.3} floatIntensity={1.5}>
//         <Sphere args={[0.3, 32, 32]} position={[-1.5, 1, -1]}>
//           <meshStandardMaterial
//             color="#ff4081"
//             emissive="#ff4081"
//             emissiveIntensity={0.5}
//           />
//         </Sphere>
//       </Float>
//       <Float speed={1.5} rotationIntensity={0.4} floatIntensity={1.2}>
//         <Sphere args={[0.5, 32, 32]} position={[1.5, -1, -1]}>
//           <meshStandardMaterial
//             color="#ffd700"
//             emissive="#ffd700"
//             emissiveIntensity={0.6}
//           />
//         </Sphere>
//       </Float>

//       {/* Starfield */}
//       <Stars radius={5} depth={50} count={500} factor={4} saturation={0} fade />
//     </>
//   );
// };

// export default function VibrantHeroPage() {
//   return (
//     <div className="relative w-full h-screen bg-gradient-to-r from-purple-500 via-pink-500 to-yellow-500 flex items-center justify-center overflow-hidden">
//       <Canvas camera={{ position: [0, 0, 3] }}>
//         <ambientLight intensity={0.7} />
//         <pointLight position={[5, 5, 5]} intensity={1} />
//         <spotLight position={[-5, 5, 5]} intensity={1} />
//         <TShirtModel />
//         <BackgroundElements />
//         <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={1} />
//       </Canvas>

//       <div className="absolute top-10 left-10 text-white text-5xl font-extrabold drop-shadow-lg">
//         <span className="text-yellow-300">Elevate</span> Your Style
//       </div>
//     </div>
//   );
// }

"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import {
  OrbitControls,
  useGLTF,
  Sphere,
  Stars,
  Float,
} from "@react-three/drei";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import * as THREE from "three";
import { useState } from "react";

const TShirtModel = () => {
  const { scene } = useGLTF("/t_shirt_body_male_dark_copy.glb");
  const modelRef = useRef<THREE.Group | null>(null);
  const [hovered, setHovered] = useState(false);

  useFrame(() => {
    if (modelRef.current) {
      modelRef.current.rotation.y += 0.01;
    }
  });

  useEffect(() => {
    if (modelRef.current) {
      gsap.to(modelRef.current.scale, {
        x: hovered ? 1.4 : 1,
        y: hovered ? 1.4 : 1,
        z: hovered ? 1.4 : 1,
        duration: 1.2,
        ease: "elastic.out(1, 0.3)",
      });
    }
  }, [hovered]);

  return (
    <primitive
      object={scene}
      ref={modelRef}
      scale={1}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    />
  );
};

const MetallicSpheres = () => {
  const sphereRef1 = useRef<THREE.Mesh | null>(null);
  const sphereRef2 = useRef<THREE.Mesh | null>(null);

  useFrame(() => {
    if (sphereRef1.current) {
      sphereRef1.current.rotation.y += 0.005;
      sphereRef1.current.rotation.x += 0.002;
    }
    if (sphereRef2.current) {
      sphereRef2.current.rotation.y += 0.004;
      sphereRef2.current.rotation.z += 0.003;
    }
  });

  return (
    <>
      <Float speed={0.2} rotationIntensity={0.5} floatIntensity={0.2}>
        <Sphere args={[0.4, 64, 64]} position={[-1.5, 1, -1]} ref={sphereRef1}>
          <meshStandardMaterial
            color="#ff4081"
            metalness={1}
            roughness={0.1}
            emissive="#ff4081"
            emissiveIntensity={0.8}
          />
        </Sphere>
      </Float>
      <Float speed={0.2} rotationIntensity={0.5} floatIntensity={0.2}>
        <Sphere args={[0.6, 64, 64]} position={[1.5, -1, -1]} ref={sphereRef2}>
          <meshStandardMaterial
            color="#ffd700"
            metalness={1}
            roughness={0.1}
            emissive="#ffd700"
            emissiveIntensity={0.9}
          />
        </Sphere>
      </Float>
    </>
  );
};

export default function VibrantHeroPage() {
  return (
    <div className="relative w-full h-screen bg-gradient-to-r from-purple-500 via-pink-500 to-yellow-500 flex items-center justify-center overflow-hidden">
      <Canvas camera={{ position: [0, 0, 3] }}>
        <ambientLight intensity={0.7} />
        <pointLight position={[5, 5, 5]} intensity={1} />
        <spotLight position={[-5, 5, 5]} intensity={1} />
        <TShirtModel />
        <MetallicSpheres />
        <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={1} />
      </Canvas>

      <div className="absolute top-10 left-10 text-white text-5xl font-extrabold drop-shadow-lg">
        <span className="text-yellow-300">Elevate</span> Your Style
      </div>
    </div>
  );
}
