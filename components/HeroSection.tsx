"use client";

import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import ThreeDModel from "./ThreeDModel";

interface HeroSectionProps {
  title?: string;
  subtitle?: string;
  ctaText?: string;
  onCtaClick?: () => void;
  backgroundGradient?: string;
}

const HeroSection = ({
  title = "Customize Your Style",
  subtitle = "Experience the future of fashion with our interactive 3D clothing customization platform. Design, visualize, and create your perfect look.",
  ctaText = "Start Designing",
  onCtaClick = () => console.log("CTA clicked"),
  backgroundGradient = "linear-gradient(to bottom, #0f172a, #1e293b)",
}: HeroSectionProps) => {
  return (
    <section
      className="relative w-full min-h-[800px] flex items-center overflow-hidden bg-gray-900"
      style={{ background: backgroundGradient }}
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute -top-20 -right-20 w-96 h-96 rounded-full bg-purple-500/20 blur-3xl"
          animate={{
            x: [0, 30, 0],
            y: [0, -30, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute -bottom-40 -left-20 w-96 h-96 rounded-full bg-blue-500/20 blur-3xl"
          animate={{
            x: [0, -20, 0],
            y: [0, 20, 0],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      <div className="container mx-auto px-4 py-16 flex flex-col lg:flex-row items-center justify-between relative z-10">
        {/* Text content */}
        <motion.div
          className="lg:w-1/2 text-white mb-12 lg:mb-0 lg:pr-12"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
            {title}
          </h1>
          <p className="text-lg md:text-xl text-gray-300 mb-8 max-w-xl">
            {subtitle}
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button
              size="lg"
              onClick={onCtaClick}
              className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-medium px-8 py-3 rounded-lg transition-all duration-300 transform hover:scale-105"
            >
              {ctaText}
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="border-gray-500 text-white hover:bg-gray-800 font-medium px-8 py-3 rounded-lg"
            >
              Learn More
            </Button>
          </div>

          <div className="mt-12 flex items-center space-x-6">
            <div className="flex -space-x-2">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="w-8 h-8 rounded-full border-2 border-gray-900 overflow-hidden"
                >
                  <img
                    src={`https://api.dicebear.com/7.x/avataaars/svg?seed=user${i}`}
                    alt={`User ${i}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
            <p className="text-sm text-gray-400">
              <span className="font-semibold text-white">1,000+</span> customers
              already designing
            </p>
          </div>
        </motion.div>

        {/* 3D Model */}
        <motion.div
          className="lg:w-1/2 w-full h-[600px]"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <div className="relative w-full h-full rounded-2xl overflow-hidden border border-gray-800 shadow-2xl">
            <ThreeDModel
              backgroundColor="#111827"
              autoRotate={true}
              rotationSpeed={0.005}
              initialZoom={5}
            />

            <div className="absolute top-4 right-4 bg-gray-900/80 backdrop-blur-sm text-white text-xs px-3 py-1 rounded-full">
              Interactive 3D Model
            </div>
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.5 }}
      >
        <p className="text-gray-400 text-sm mb-2">Scroll to explore</p>
        <motion.div
          className="w-6 h-10 border-2 border-gray-500 rounded-full flex justify-center p-1"
          animate={{ y: [0, 5, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <motion.div
            className="w-1 h-2 bg-white rounded-full"
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
