import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

interface ThreeDModelProps {
  modelPath?: string;
  backgroundColor?: string;
  rotationSpeed?: number;
  autoRotate?: boolean;
  initialZoom?: number;
}

const ThreeDModel = ({
  modelPath = "shirt_baked.glb", // Default model path
  backgroundColor = "#111827",
  rotationSpeed = 0.005,
  autoRotate = true,
  initialZoom = 5,
}: ThreeDModelProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Create scene
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(backgroundColor);

    // Create camera
    const camera = new THREE.PerspectiveCamera(
      75,
      containerRef.current.clientWidth / containerRef.current.clientHeight,
      0.1,
      1000
    );
    camera.position.z = initialZoom;

    // Create renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(
      containerRef.current.clientWidth,
      containerRef.current.clientHeight
    );
    renderer.setPixelRatio(window.devicePixelRatio);
    containerRef.current.appendChild(renderer.domElement);

    // Add lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    const directionalLight1 = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight1.position.set(1, 1, 1);
    scene.add(directionalLight1);

    const directionalLight2 = new THREE.DirectionalLight(0xffffff, 0.5);
    directionalLight2.position.set(-1, -1, -1);
    scene.add(directionalLight2);

    // Add orbit controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.autoRotate = autoRotate;
    controls.autoRotateSpeed = 2;

    // Create a placeholder geometry while model loads
    const geometry = new THREE.BoxGeometry(2, 3, 0.5);
    const material = new THREE.MeshStandardMaterial({
      color: 0x6366f1,
      metalness: 0.2,
      roughness: 0.5,
      wireframe: false,
    });
    const cube = new THREE.Mesh(geometry, material);
    scene.add(cube);

    // In a real implementation, we would load the GLB model here
    // using GLTFLoader from three.js
    // For this scaffolding, we'll just use the placeholder cube
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);

      if (!autoRotate) {
        cube.rotation.y += rotationSpeed;
      }

      controls.update();
      renderer.render(scene, camera);
    };
    animate();

    // Handle window resize
    const handleResize = () => {
      if (!containerRef.current) return;

      camera.aspect =
        containerRef.current.clientWidth / containerRef.current.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(
        containerRef.current.clientWidth,
        containerRef.current.clientHeight
      );
    };
    window.addEventListener("resize", handleResize);

    // Cleanup
    return () => {
      window.removeEventListener("resize", handleResize);
      if (containerRef.current) {
        containerRef.current.removeChild(renderer.domElement);
      }
      scene.remove(cube);
      geometry.dispose();
      material.dispose();
    };
  }, [backgroundColor, rotationSpeed, autoRotate, initialZoom]);

  return (
    <div className="relative w-full h-full bg-gray-900 rounded-lg overflow-hidden">
      <div
        ref={containerRef}
        className="w-full h-full"
        style={{ minHeight: "600px" }}
      />

      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-900 bg-opacity-70">
          <div className="text-white text-lg">Loading 3D Model...</div>
        </div>
      )}

      {error && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-900 bg-opacity-70">
          <div className="text-red-500 text-lg p-4 bg-gray-800 rounded-md">
            Error loading model: {error}
          </div>
        </div>
      )}

      <div className="absolute bottom-4 left-4 text-xs text-gray-400">
        Drag to rotate • Scroll to zoom
      </div>
    </div>
  );
};

export default ThreeDModel;
