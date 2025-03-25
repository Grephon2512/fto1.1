"use client";
import { motion } from "framer-motion";
import { useState } from "react";

export default function TutorialPage() {
  const [videoLoaded, setVideoLoaded] = useState(false);

  return (
    <div className="relative flex items-center justify-center min-h-screen bg-black overflow-hidden">
      {/* Dynamic Background */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-blue-900 via-black to-purple-900 opacity-50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5 }}
      />

      {/* Tutorial Video */}
      <div className="relative z-10 w-full max-w-4xl px-4 md:px-0">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center text-white text-3xl md:text-5xl font-bold mb-6"
        >
          How to Use Our 3D Customization Tool
        </motion.h1>

        <div className="relative w-full aspect-w-16 aspect-h-9 rounded-lg overflow-hidden shadow-lg">
          {!videoLoaded && (
            <div className="absolute inset-0 flex items-center justify-center bg-gray-900 animate-pulse">
              <p className="text-gray-300">Loading video...</p>
            </div>
          )}
          <iframe
            className="w-full h-full"
            src="https://www.youtube.com/embed/VIDEO_ID"
            title="Tutorial Video"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            onLoad={() => setVideoLoaded(true)}
          />
        </div>
      </div>
    </div>
  );
}
