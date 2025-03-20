"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Category {
  id: string;
  name: string;
  description: string;
  image: string;
  count: number;
}

interface CategorySectionProps {
  categories?: Category[];
  onCategorySelect?: (categoryId: string) => void;
  title?: string;
  subtitle?: string;
}

const CategorySection = ({
  categories = [
    {
      id: "t-shirts",
      name: "T-Shirts",
      description: "Premium cotton t-shirts with custom designs",
      image:
        "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=800&q=80",
      count: 42,
    },
    {
      id: "hoodies",
      name: "Hoodies",
      description: "Comfortable hoodies for all seasons",
      image:
        "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=800&q=80",
      count: 24,
    },
    {
      id: "jackets",
      name: "Jackets",
      description: "Stylish jackets for any occasion",
      image:
        "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=800&q=80",
      count: 18,
    },
    {
      id: "accessories",
      name: "Accessories",
      description: "Complete your look with our accessories",
      image:
        "https://images.unsplash.com/photo-1556306535-0f09a537f0a3?w=800&q=80",
      count: 36,
    },
  ],
  onCategorySelect = (id) => console.log(`Category selected: ${id}`),
  title = "Explore Our Collections",
  subtitle = "Discover the perfect style for your unique personality",
}: CategorySectionProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  // Parallax scrolling effect using framer-motion
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const opacity = useTransform(
    scrollYProgress,
    [0, 0.3, 0.6, 1],
    [0, 1, 1, 0.8]
  );

  const handleCategoryClick = (id: string) => {
    setActiveCategory(id);
    onCategorySelect(id);
  };

  return (
    <div
      ref={containerRef}
      className="relative w-full min-h-screen bg-gradient-to-b from-gray-900 to-black py-20 overflow-hidden"
    >
      {/* Background glow effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-purple-900/20 to-blue-900/20 opacity-30" />

      {/* Floating particles effect */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={`particle-${i}`}
            className="absolute w-1 h-1 rounded-full bg-white/30"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              scale: Math.random() * 3,
            }}
            animate={{
              y: [0, Math.random() * 100 - 50],
              opacity: [0.1, 0.5, 0.1],
            }}
            transition={{
              duration: 5 + Math.random() * 10,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* Section header with parallax effect */}
      <motion.div
        className="relative z-10 text-center mb-16 px-4"
        style={{ y, opacity }}
      >
        <motion.h2
          className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {title}
        </motion.h2>
        <motion.p
          className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {subtitle}
        </motion.p>
        <motion.div
          className="mt-8 animate-bounce"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.5 }}
        >
          <ChevronDown className="w-8 h-8 text-white/70 mx-auto" />
        </motion.div>
      </motion.div>

      {/* Categories grid with parallax and staggered animation */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {categories.map((category, index) => (
          <motion.div
            key={category.id}
            className={`relative overflow-hidden rounded-xl group cursor-pointer ${
              activeCategory === category.id ? "ring-2 ring-purple-500" : ""
            }`}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 * index }}
            whileHover={{ y: -10 }}
            onClick={() => handleCategoryClick(category.id)}
          >
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-10" />

            <motion.div
              className="relative h-80 w-full overflow-hidden"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.4 }}
            >
              <img
                src={category.image}
                alt={category.name}
                className="w-full h-full object-cover transition-transform duration-700"
              />
            </motion.div>

            <div className="absolute bottom-0 left-0 right-0 p-6 z-20">
              <div className="flex justify-between items-end">
                <div>
                  <h3 className="text-xl font-bold text-white mb-2">
                    {category.name}
                  </h3>
                  <p className="text-sm text-gray-300 mb-3">
                    {category.description}
                  </p>
                  <span className="text-xs text-gray-400">
                    {category.count} items
                  </span>
                </div>
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileHover={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <Button
                    size="sm"
                    className="bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white rounded-full"
                  >
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </motion.div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* View all button */}
      <motion.div
        className="relative z-10 mt-12 text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
      >
        <Button
          className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-8 py-6 rounded-full text-lg"
          onClick={() => console.log("View all categories")}
        >
          View All Collections
          <ArrowRight className="ml-2 h-5 w-5" />
        </Button>
      </motion.div>
    </div>
  );
};

export default CategorySection;
