"use client";

import { Canvas } from "@react-three/fiber";
import {
  OrbitControls,
  useGLTF,
  Decal,
  useTexture,
  Environment,
  Stars,
} from "@react-three/drei";
import { useRef, useState, useEffect } from "react";
import { HexColorPicker } from "react-colorful";
import { motion } from "framer-motion";
import { Paintbrush } from "lucide-react";
import * as THREE from "three";

const StarField = () => {
  return (
    <Stars
      radius={50} // Spread out stars in a large sphere
      depth={50} // Adds depth to the starfield
      count={1500} // Number of stars
      factor={5} // Controls the density
      saturation={0} // Make sure they stay white
      fade // Enables smooth fading at edges
    />
  );
};

const Model = ({
  color,
  materialType,
  logoTexture,
  fullTexture,
  logoPosition,
  logoScale,
  fullTextureOffset,
  fullTextureScale,
}: any) => {
  const modelRef = useRef<THREE.Group | null>(null);
  const shirtMeshRef = useRef<THREE.Mesh | null>(null);
  const { scene } = useGLTF("/shirt_baked.glb");

  const defaultTexture = "/BLANK.jpg";
  const [fabricTexture] = useTexture([fullTexture || defaultTexture]) as [
    THREE.Texture
  ];
  const [logoDecal] = useTexture([logoTexture || defaultTexture]) as [
    THREE.Texture
  ];

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

        fabricTexture.offset.set(fullTextureOffset[0], fullTextureOffset[1]);
        fabricTexture.repeat.set(fullTextureScale, fullTextureScale);
      }
    });
  }, [
    scene,
    fabricTexture,
    color,
    materialType,
    fullTextureOffset,
    fullTextureScale,
  ]);

  return (
    <group ref={modelRef} scale={0.7}>
      <primitive object={scene} />
      {logoTexture &&
        logoTexture !== defaultTexture &&
        shirtMeshRef.current && (
          <Decal
            mesh={shirtMeshRef as React.MutableRefObject<THREE.Mesh>}
            position={logoPosition}
            rotation={[0, 0, 0]}
            scale={logoScale}
            map={logoDecal}
          />
        )}
    </group>
  );
};

export default function TextureLogoPage() {
  const [showLogo, setShowLogo] = useState(true);
  const [showFullTexture, setShowFullTexture] = useState(true);

  const [color, setColor] = useState("#ffffff");
  const [materialType, setMaterialType] = useState("Cotton");
  const [logoTexture, setLogoTexture] = useState<string | null>(null);
  const [fullTexture, setFullTexture] = useState<string | null>(null);
  const [logoPosition, setLogoPosition] = useState<[number, number, number]>([
    0, 0.05, 0.12,
  ]);
  const [logoScale, setLogoScale] = useState<[number, number, number]>([
    0.2, 0.2, 0.2,
  ]);
  const [fullTextureOffset, setFullTextureOffset] = useState<[number, number]>([
    0, 0,
  ]);
  const [fullTextureScale, setFullTextureScale] = useState<number>(1);

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
    <div className="relative w-full h-screen bg-gradient-to-r from-blue-900 via-cyan-500 to-white flex items-center justify-center">
      <Canvas
        camera={{ position: [0, 2, 5], fov: 6 }}
        className="absolute inset-0 w-full h-full"
      >
        <ambientLight intensity={0.8} />
        <directionalLight position={[5, 5, 5]} intensity={4} castShadow />
        <Environment preset="city" />
        <OrbitControls enableZoom enablePan enableRotate />

        <Model
          color={color}
          materialType={materialType}
          logoTexture={showLogo ? logoTexture : null} // Toggle logo display
          fullTexture={showFullTexture ? fullTexture : null} // Toggle full texture display
          logoPosition={logoPosition}
          logoScale={logoScale}
          fullTextureOffset={fullTextureOffset}
          fullTextureScale={fullTextureScale}
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

        {/* Toggle Logo Display */}
        <div className="flex items-center justify-between w-full px-3 py-2 rounded-lg bg-white/20 backdrop-blur-md shadow-md transition-all duration-300 hover:shadow-lime-500/50">
          <p className="text-black text-sm font-medium">🖼️ Show Logo:</p>
          <button
            onClick={() => setShowLogo(!showLogo)}
            className={`px-4 py-2 rounded-lg font-semibold transition-all duration-300 ${
              showLogo
                ? "bg-green-500 hover:bg-green-600"
                : "bg-red-500 hover:bg-red-600"
            } text-white shadow-md`}
          >
            {showLogo ? "ON" : "OFF"}
          </button>
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
        </div>
      </div>

      {/* Control Panel */}
      <div className="absolute top-5 left-5 bg-white/10 p-6 rounded-xl backdrop-blur-lg shadow-xl space-y-6 border border-purple-500">
        <h2 className="text-2xl font-bold text-white text-center">
          🎨 Customize Your T-Shirt
        </h2>

        {/* Upload Logo */}
        <div className="flex flex-col space-y-2">
          <p className="text-white text-sm">Upload Logo:</p>
          <label className="relative cursor-pointer bg-gradient-to-r from-indigo-500 via-blue-500 to-cyan-500 text-white px-4 py-2 rounded-lg shadow-lg font-semibold transition-all duration-300 ease-in-out hover:shadow-xl hover:scale-105 active:scale-95">
            <input
              type="file"
              accept="image/*"
              onChange={(e) => handleImageUpload(e, "logo")}
              className="hidden"
            />
            📷 Upload Logo
          </label>
        </div>

        {/* Logo Controls */}
        <div className="flex flex-col space-y-2">
          <p className="text-white text-sm">Move Logo:</p>
          <div className="flex items-center space-x-2">
            <span className="text-white text-xs">X:</span>
            <input
              type="range"
              min="-0.2"
              max="0.2"
              step="0.01"
              value={logoPosition[0]}
              onChange={(e) =>
                setLogoPosition([
                  parseFloat(e.target.value),
                  logoPosition[1],
                  logoPosition[2],
                ])
              }
              className="w-28 h-2 bg-gray-400 rounded-lg cursor-pointer transition-all duration-300 hover:bg-indigo-500"
            />
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-white text-xs">Y:</span>
            <input
              type="range"
              min="-0.1"
              max="0.2"
              step="0.01"
              value={logoPosition[1]}
              onChange={(e) =>
                setLogoPosition([
                  logoPosition[0],
                  parseFloat(e.target.value),
                  logoPosition[2],
                ])
              }
              className="w-28 h-2 bg-gray-400 rounded-lg cursor-pointer transition-all duration-300 hover:bg-indigo-500"
            />
          </div>

          <div className="flex flex-col space-y-2">
            <p className="text-white text-sm">Scale Logo:</p>
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
              className="w-full h-2 bg-gray-400 rounded-lg cursor-pointer transition-all duration-300 hover:bg-yellow-500"
            />
          </div>
        </div>

        {/* Upload Full Texture */}
        <div className="flex flex-col space-y-2">
          <p className="text-white text-sm">Upload Full Texture:</p>
          <label className="relative cursor-pointer bg-gradient-to-r from-red-500 via-pink-500 to-yellow-500 text-white px-4 py-2 rounded-lg shadow-lg font-semibold transition-all duration-300 ease-in-out hover:shadow-xl hover:scale-105 active:scale-95">
            <input
              type="file"
              accept="image/*"
              onChange={(e) => handleImageUpload(e, "full")}
              className="hidden"
            />
            🌆 Upload Full Texture
          </label>
        </div>

        {/* Move Full Texture */}
        <div className="flex flex-col space-y-2">
          <p className="text-white text-sm">Move Full Texture:</p>
          <div className="flex items-center space-x-2">
            <span className="text-white text-xs">X:</span>
            <input
              type="range"
              min="-1"
              max="1"
              step="0.01"
              value={fullTextureOffset[0]}
              onChange={(e) =>
                setFullTextureOffset([
                  parseFloat(e.target.value),
                  fullTextureOffset[1],
                ])
              }
              className="w-28 h-2 bg-gray-400 rounded-lg cursor-pointer transition-all duration-300 hover:bg-red-500"
            />
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-white text-xs">Y:</span>
            <input
              type="range"
              min="-1"
              max="1"
              step="0.01"
              value={fullTextureOffset[1]}
              onChange={(e) =>
                setFullTextureOffset([
                  fullTextureOffset[0],
                  parseFloat(e.target.value),
                ])
              }
              className="w-28 h-2 bg-gray-400 rounded-lg cursor-pointer transition-all duration-300 hover:bg-red-500"
            />
          </div>
        </div>

        {/* Scale Full Texture */}
        <div className="flex flex-col space-y-2">
          <p className="text-white text-sm">Scale Full Texture:</p>
          <input
            type="range"
            min="0.5"
            max="3"
            step="0.1"
            value={fullTextureScale}
            onChange={(e) => setFullTextureScale(parseFloat(e.target.value))}
            className="w-full h-2 bg-gray-400 rounded-lg cursor-pointer transition-all duration-300 hover:bg-green-500"
          />
        </div>
      </div>
    </div>
  );
}
