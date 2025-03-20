"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import ProductCard from "./ProductCard";
import {
  ChevronLeft,
  ChevronRight,
  Filter,
  SlidersHorizontal,
} from "lucide-react";

interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  colors: string[];
  category: string;
  isNew?: boolean;
  isFeatured?: boolean;
}

interface ProductsSectionProps {
  title?: string;
  subtitle?: string;
  products?: Product[];
  categories?: string[];
  onProductSelect?: (productId: string) => void;
  initialCategory?: string;
}

const ProductsSection = ({
  title = "Our Collection",
  subtitle = "Discover our latest designs with premium quality materials",
  products = [
    {
      id: "p1",
      name: "Classic Cotton T-Shirt",
      price: 49.99,
      image:
        "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500&q=80",
      colors: ["#000000", "#FFFFFF", "#6B7280", "#EF4444"],
      category: "t-shirts",
      isNew: true,
    },
    {
      id: "p2",
      name: "Slim Fit Jeans",
      price: 79.99,
      image:
        "https://images.unsplash.com/photo-1542272604-787c3835535d?w=500&q=80",
      colors: ["#000000", "#3B82F6", "#6B7280"],
      category: "pants",
      isFeatured: true,
    },
    {
      id: "p3",
      name: "Casual Hoodie",
      price: 69.99,
      image:
        "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=500&q=80",
      colors: ["#000000", "#FFFFFF", "#10B981", "#6366F1"],
      category: "hoodies",
      isNew: true,
    },
    {
      id: "p4",
      name: "Designer Jacket",
      price: 129.99,
      image:
        "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=500&q=80",
      colors: ["#000000", "#4B5563", "#F59E0B"],
      category: "jackets",
      isFeatured: true,
    },
    {
      id: "p5",
      name: "Premium Polo Shirt",
      price: 59.99,
      image:
        "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=500&q=80",
      colors: ["#000000", "#FFFFFF", "#EF4444", "#3B82F6"],
      category: "t-shirts",
    },
    {
      id: "p6",
      name: "Cargo Pants",
      price: 89.99,
      image:
        "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=500&q=80",
      colors: ["#4B5563", "#65A30D", "#92400E"],
      category: "pants",
    },
  ],
  categories = ["all", "t-shirts", "pants", "hoodies", "jackets"],
  onProductSelect = () => {},
  initialCategory = "all",
}: ProductsSectionProps) => {
  const [activeCategory, setActiveCategory] = useState(initialCategory);
  const [currentPage, setCurrentPage] = useState(1);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const productsPerPage = 4;

  useEffect(() => {
    // Filter products based on active category
    const filtered =
      activeCategory === "all"
        ? products
        : products.filter((product) => product.category === activeCategory);
    setFilteredProducts(filtered);
    setCurrentPage(1); // Reset to first page when category changes
  }, [activeCategory, products]);

  // Calculate pagination
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  // Format category name for display
  const formatCategoryName = (category: string) => {
    return category
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  return (
    <section className="w-full py-16 px-4 md:px-8 bg-background">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">{title}</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">{subtitle}</p>
        </motion.div>

        <Tabs
          defaultValue={initialCategory}
          value={activeCategory}
          onValueChange={setActiveCategory}
          className="w-full mb-10"
        >
          <div className="flex items-center justify-between mb-6">
            <TabsList className="bg-muted/50 p-1 rounded-full">
              {categories.map((category) => (
                <TabsTrigger
                  key={category}
                  value={category}
                  className={cn(
                    "rounded-full px-4 py-2 text-sm transition-all",
                    activeCategory === category
                      ? "bg-primary text-primary-foreground shadow-sm"
                      : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  {formatCategoryName(category)}
                </TabsTrigger>
              ))}
            </TabsList>

            <Button variant="outline" size="sm" className="gap-2">
              <Filter size={16} />
              <span className="hidden sm:inline">Filter</span>
            </Button>
          </div>

          {categories.map((category) => (
            <TabsContent
              key={category}
              value={category}
              className="focus-visible:outline-none focus-visible:ring-0"
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={`${category}-${currentPage}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {currentProducts.map((product) => (
                      <motion.div
                        key={product.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                        className="h-full"
                      >
                        <ProductCard
                          id={product.id}
                          name={product.name}
                          price={product.price}
                          image={product.image}
                          colors={product.colors}
                          onQuickView={() => onProductSelect(product.id)}
                        />
                        {product.isNew && (
                          <div className="absolute top-3 left-3 bg-primary text-primary-foreground text-xs font-bold px-2 py-1 rounded-md">
                            NEW
                          </div>
                        )}
                        {product.isFeatured && (
                          <div className="absolute top-3 left-3 bg-amber-500 text-white text-xs font-bold px-2 py-1 rounded-md">
                            FEATURED
                          </div>
                        )}
                      </motion.div>
                    ))}
                  </div>

                  {/* Pagination */}
                  {totalPages > 1 && (
                    <div className="flex items-center justify-center mt-12 gap-2">
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={handlePrevPage}
                        disabled={currentPage === 1}
                        aria-label="Previous page"
                      >
                        <ChevronLeft size={18} />
                      </Button>
                      <div className="flex items-center gap-2">
                        {Array.from(
                          { length: totalPages },
                          (_, i) => i + 1
                        ).map((page) => (
                          <Button
                            key={page}
                            variant={
                              currentPage === page ? "default" : "outline"
                            }
                            size="sm"
                            onClick={() => setCurrentPage(page)}
                            aria-label={`Page ${page}`}
                            aria-current={
                              currentPage === page ? "page" : undefined
                            }
                            className="w-9 h-9 p-0"
                          >
                            {page}
                          </Button>
                        ))}
                      </div>
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={handleNextPage}
                        disabled={currentPage === totalPages}
                        aria-label="Next page"
                      >
                        <ChevronRight size={18} />
                      </Button>
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </section>
  );
};

export default ProductsSection;
