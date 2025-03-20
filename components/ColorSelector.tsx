"use client";

import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface ColorOption {
  id: string;
  name: string;
  value: string;
  tooltip?: string;
}

interface ColorSelectorProps {
  colors?: ColorOption[];
  selectedColor?: string;
  onColorChange?: (colorId: string) => void;
}

const ColorSelector = ({
  colors = [
    {
      id: "1",
      name: "Midnight Black",
      value: "#121212",
      tooltip: "Sleek and modern",
    },
    {
      id: "2",
      name: "Ocean Blue",
      value: "#1e3a8a",
      tooltip: "Deep and calming",
    },
    {
      id: "3",
      name: "Ruby Red",
      value: "#b91c1c",
      tooltip: "Bold and vibrant",
    },
    {
      id: "4",
      name: "Emerald Green",
      value: "#047857",
      tooltip: "Fresh and natural",
    },
    {
      id: "5",
      name: "Royal Purple",
      value: "#6d28d9",
      tooltip: "Luxurious and rich",
    },
  ],
  selectedColor = "1",
  onColorChange = () => {},
}: ColorSelectorProps) => {
  const [selected, setSelected] = useState(selectedColor);

  const handleColorSelect = (colorId: string) => {
    setSelected(colorId);
    onColorChange(colorId);
  };

  return (
    <div className="w-full max-w-md bg-background p-4 rounded-lg shadow-sm">
      <h3 className="text-sm font-medium mb-3 text-foreground">Select Color</h3>
      <div className="flex items-center space-x-3">
        <TooltipProvider>
          {colors.map((color) => (
            <Tooltip key={color.id}>
              <TooltipTrigger asChild>
                <button
                  type="button"
                  onClick={() => handleColorSelect(color.id)}
                  className={cn(
                    "w-10 h-10 rounded-full transition-all duration-300 relative",
                    selected === color.id
                      ? "ring-2 ring-offset-2 ring-primary"
                      : "ring-1 ring-offset-1 ring-border"
                  )}
                  aria-label={`Select ${color.name}`}
                >
                  <motion.div
                    className="absolute inset-0 rounded-full"
                    style={{ backgroundColor: color.value }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  />
                  {selected === color.id && (
                    <motion.div
                      className="absolute inset-0 flex items-center justify-center"
                      initial={{ opacity: 0, scale: 0.5 }}
                      animate={{ opacity: 1, scale: 1 }}
                    >
                      <div className="w-2 h-2 bg-white rounded-full shadow-sm" />
                    </motion.div>
                  )}
                </button>
              </TooltipTrigger>
              <TooltipContent>
                <p>
                  {color.name} - {color.tooltip}
                </p>
              </TooltipContent>
            </Tooltip>
          ))}
        </TooltipProvider>
      </div>
      <div className="mt-3 text-xs text-muted-foreground">
        Selected: {colors.find((c) => c.id === selected)?.name || "None"}
      </div>
    </div>
  );
};

export default ColorSelector;
