"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import ColorSelector from "./ColorSelector";
import StyleSelector from "./StyleSelector";
import { ArrowRight, ArrowLeft, RefreshCw, ShoppingBag } from "lucide-react";

interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  images: {
    color: string;
    style: string;
    url: string;
  }[];
}

interface CustomizationSectionProps {
  product?: Product;
  onAddToCart?: (product: Product, color: string, style: string) => void;
}

const CustomizationSection = ({
  product = {
    id: "custom-tshirt-01",
    name: "Premium Customizable T-Shirt",
    price: 59.99,
    description:
      "Our premium t-shirt with endless customization options. Made from 100% organic cotton for maximum comfort and durability.",
    images: [
      {
        color: "1",
        style: "classic",
        url: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&q=80",
      },
      {
        color: "1",
        style: "slim",
        url: "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=800&q=80",
      },
      {
        color: "2",
        style: "classic",
        url: "https://images.unsplash.com/photo-1618517351616-38fb9c5210c6?w=800&q=80",
      },
      {
        color: "2",
        style: "slim",
        url: "https://images.unsplash.com/photo-1562157873-818bc0726f68?w=800&q=80",
      },
      {
        color: "3",
        style: "classic",
        url: "https://images.unsplash.com/photo-1554568218-0f1715e72254?w=800&q=80",
      },
      {
        color: "3",
        style: "slim",
        url: "https://images.unsplash.com/photo-1608228088998-57828365d486?w=800&q=80",
      },
      {
        color: "4",
        style: "classic",
        url: "https://images.unsplash.com/photo-1618517351616-38fb9c5210c6?w=800&q=80",
      },
      {
        color: "4",
        style: "slim",
        url: "https://images.unsplash.com/photo-1618354691792-d1d42acfd860?w=800&q=80",
      },
      {
        color: "5",
        style: "classic",
        url: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=800&q=80",
      },
      {
        color: "5",
        style: "slim",
        url: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=800&q=80",
      },
      {
        color: "1",
        style: "athletic",
        url: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=800&q=80",
      },
      {
        color: "1",
        style: "oversized",
        url: "https://images.unsplash.com/photo-1583744946564-b52d01e7f922?w=800&q=80",
      },
    ],
  },
  onAddToCart = () => console.log("Added to cart"),
}: CustomizationSectionProps) => {
  const [selectedColor, setSelectedColor] = useState("1");
  const [selectedStyle, setSelectedStyle] = useState("classic");
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isImageChanging, setIsImageChanging] = useState(false);

  // Find the appropriate image based on selected color and style
  const getCurrentImage = () => {
    const image = product.images.find(
      (img) => img.color === selectedColor && img.style === selectedStyle
    );
    return image?.url || product.images[0].url;
  };

  // Update image when color or style changes
  useEffect(() => {
    setIsImageChanging(true);
    const timer = setTimeout(() => {
      setIsImageChanging(false);
    }, 300);
    return () => clearTimeout(timer);
  }, [selectedColor, selectedStyle]);

  const handleColorChange = (colorId: string) => {
    setSelectedColor(colorId);
  };

  const handleStyleChange = (styleId: string) => {
    setSelectedStyle(styleId);
  };

  const handleAddToCart = () => {
    onAddToCart(product, selectedColor, selectedStyle);
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prev) =>
      prev === product.images.length - 1 ? 0 : prev + 1
    );
  };

  const handlePrevImage = () => {
    setCurrentImageIndex((prev) =>
      prev === 0 ? product.images.length - 1 : prev - 1
    );
  };

  return (
    <section className="w-full py-16 bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12 text-foreground">
          Customize Your Perfect Fit
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          {/* Product Preview */}
          <div className="relative bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden h-[600px] flex items-center justify-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={`${selectedColor}-${selectedStyle}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="relative w-full h-full"
              >
                <img
                  src={getCurrentImage()}
                  alt={`${product.name} in selected color and style`}
                  className="w-full h-full object-cover"
                />
              </motion.div>
            </AnimatePresence>

            {/* Image navigation controls */}
            <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-4">
              <Button
                variant="secondary"
                size="icon"
                onClick={handlePrevImage}
                className="bg-white/80 text-gray-800 hover:bg-white dark:bg-gray-800/80 dark:text-gray-200 dark:hover:bg-gray-700 backdrop-blur-sm rounded-full"
              >
                <ArrowLeft size={18} />
              </Button>
              <Button
                variant="secondary"
                size="icon"
                onClick={() => {
                  setSelectedColor("1");
                  setSelectedStyle("classic");
                }}
                className="bg-white/80 text-gray-800 hover:bg-white dark:bg-gray-800/80 dark:text-gray-200 dark:hover:bg-gray-700 backdrop-blur-sm rounded-full"
              >
                <RefreshCw size={18} />
              </Button>
              <Button
                variant="secondary"
                size="icon"
                onClick={handleNextImage}
                className="bg-white/80 text-gray-800 hover:bg-white dark:bg-gray-800/80 dark:text-gray-200 dark:hover:bg-gray-700 backdrop-blur-sm rounded-full"
              >
                <ArrowRight size={18} />
              </Button>
            </div>
          </div>

          {/* Customization Controls */}
          <div className="space-y-8">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
              <h3 className="text-2xl font-bold mb-2">{product.name}</h3>
              <div className="flex items-baseline mb-4">
                <span className="text-3xl font-bold text-primary">
                  ${product.price.toFixed(2)}
                </span>
                <span className="ml-2 text-sm text-muted-foreground">
                  Customization included
                </span>
              </div>
              <p className="text-muted-foreground mb-6">
                {product.description}
              </p>

              <div className="space-y-6">
                <ColorSelector
                  selectedColor={selectedColor}
                  onColorChange={handleColorChange}
                />

                <StyleSelector
                  selectedStyle={selectedStyle}
                  onSelectStyle={handleStyleChange}
                />

                <div className="pt-4">
                  <Button
                    onClick={handleAddToCart}
                    className="w-full py-6 text-lg group transition-all duration-300 hover:shadow-lg"
                  >
                    <ShoppingBag className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform" />
                    Add to Cart
                  </Button>
                </div>
              </div>
            </div>

            <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl p-4 text-sm text-muted-foreground">
              <p className="flex items-center">
                <RefreshCw className="mr-2 h-4 w-4" />
                Free returns within 30 days
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CustomizationSection;
