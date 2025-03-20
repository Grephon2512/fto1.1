import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Check } from "lucide-react";

export interface StyleOption {
  id: string;
  name: string;
  thumbnail: string;
  description: string;
}

export interface StyleSelectorProps {
  options?: StyleOption[];
  selectedStyle?: string;
  onSelectStyle?: (styleId: string) => void;
}

const StyleSelector = ({
  options = [
    {
      id: "classic",
      name: "Classic Fit",
      thumbnail:
        "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=300&q=80",
      description: "Traditional cut with a relaxed silhouette",
    },
    {
      id: "slim",
      name: "Slim Fit",
      thumbnail:
        "https://images.unsplash.com/photo-1617137968427-85924c800a22?w=300&q=80",
      description: "Modern cut with a narrower silhouette",
    },
    {
      id: "athletic",
      name: "Athletic Fit",
      thumbnail:
        "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=300&q=80",
      description: "Roomier in the shoulders and chest, tapered waist",
    },
    {
      id: "oversized",
      name: "Oversized",
      thumbnail:
        "https://images.unsplash.com/photo-1583744946564-b52d01e7f922?w=300&q=80",
      description: "Loose and relaxed throughout for maximum comfort",
    },
  ],
  selectedStyle = "classic",
  onSelectStyle = () => {},
}: StyleSelectorProps) => {
  const [selected, setSelected] = useState(selectedStyle);

  const handleStyleSelect = (styleId: string) => {
    setSelected(styleId);
    onSelectStyle(styleId);
  };

  return (
    <div className="w-full max-w-md bg-background p-4 rounded-lg shadow-sm">
      <h3 className="text-lg font-medium mb-3">Select Style</h3>
      <div className="grid grid-cols-2 gap-4">
        {options.map((style) => (
          <TooltipProvider key={style.id}>
            <Tooltip>
              <TooltipTrigger asChild>
                <div
                  className={cn(
                    "relative flex flex-col items-center border rounded-md overflow-hidden transition-all duration-300 cursor-pointer",
                    selected === style.id
                      ? "border-primary ring-2 ring-primary/20"
                      : "border-border hover:border-primary/50"
                  )}
                  onClick={() => handleStyleSelect(style.id)}
                >
                  <div className="relative w-full h-24 overflow-hidden">
                    <img
                      src={style.thumbnail}
                      alt={style.name}
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                    />
                    {selected === style.id && (
                      <div className="absolute top-2 right-2 bg-primary text-primary-foreground rounded-full p-1">
                        <Check size={12} />
                      </div>
                    )}
                  </div>
                  <div className="p-2 text-center w-full">
                    <p className="text-sm font-medium">{style.name}</p>
                  </div>
                </div>
              </TooltipTrigger>
              <TooltipContent side="bottom">
                <p>{style.description}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        ))}
      </div>
      <div className="mt-4 flex justify-between">
        <Button
          variant="outline"
          size="sm"
          className="text-xs"
          onClick={() => handleStyleSelect("classic")}
        >
          Reset to Default
        </Button>
        <Button
          size="sm"
          className="text-xs"
          onClick={() => console.log(`Style selected: ${selected}`)}
        >
          Apply Style
        </Button>
      </div>
    </div>
  );
};

export default StyleSelector;
