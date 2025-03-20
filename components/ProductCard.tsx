"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardFooter } from "./ui/card";
import { Button } from "./ui/button";
import { ShoppingCart, Heart } from "lucide-react";

interface ProductCardProps {
  id?: string;
  name?: string;
  price?: number;
  image?: string;
  colors?: string[];
  onAddToCart?: () => void;
  onQuickView?: () => void;
}

const ProductCard = ({
  id = "product-1",
  name = "Premium Cotton T-Shirt",
  price = 49.99,
  image = "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500&q=80",
  colors = ["#000000", "#FFFFFF", "#6B7280", "#EF4444"],
  onAddToCart = () => console.log("Add to cart clicked"),
  onQuickView = () => console.log("Quick view clicked"),
}: ProductCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);

  return (
    <motion.div
      className="w-full h-full bg-white"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={{ y: -5 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <Card className="overflow-hidden h-full flex flex-col border-none">
        <div className="relative overflow-hidden aspect-[3/4]">
          <motion.img
            src={image}
            alt={name}
            className="w-full h-full object-cover"
            initial={{ scale: 1 }}
            animate={{ scale: isHovered ? 1.05 : 1 }}
            transition={{ duration: 0.3 }}
          />

          <motion.div
            className="absolute top-3 right-3 z-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
          >
            <Button
              variant="secondary"
              size="icon"
              className="rounded-full bg-white/80 backdrop-blur-sm hover:bg-white"
              onClick={() => setIsFavorite(!isFavorite)}
            >
              <Heart
                className={`h-5 w-5 ${
                  isFavorite ? "fill-red-500 text-red-500" : "text-gray-700"
                }`}
              />
            </Button>
          </motion.div>

          {isHovered && (
            <motion.div
              className="absolute bottom-0 left-0 right-0 p-3 bg-black/70 backdrop-blur-sm"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2 }}
            >
              <Button
                variant="default"
                className="w-full bg-white text-black hover:bg-gray-100"
                onClick={onQuickView}
              >
                Quick View
              </Button>
            </motion.div>
          )}
        </div>

        <CardContent className="p-4 flex-grow">
          <h3 className="font-medium text-lg mb-1 truncate">{name}</h3>
          <p className="text-lg font-bold">${price.toFixed(2)}</p>

          <div className="flex gap-2 mt-3">
            {colors.map((color, index) => (
              <motion.div
                key={`${id}-color-${index}`}
                className="w-5 h-5 rounded-full cursor-pointer"
                style={{ backgroundColor: color }}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
              />
            ))}
          </div>
        </CardContent>

        <CardFooter className="p-4 pt-0">
          <Button className="w-full" onClick={onAddToCart}>
            <ShoppingCart className="mr-2 h-4 w-4" />
            Add to Cart
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
};

export default ProductCard;
