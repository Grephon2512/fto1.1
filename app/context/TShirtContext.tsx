"use client";
import { createContext, useContext, useState, ReactNode } from "react";

interface TShirtData {
  color: string;
  frontTexture?: string | null;
  backTexture?: string | null;
  material: string;
}

interface TShirtContextType {
  tshirtData: TShirtData;
  setTShirtData: (data: TShirtData) => void;
}

const TShirtContext = createContext<TShirtContextType | undefined>(undefined);

export const TShirtProvider = ({ children }: { children: ReactNode }) => {
  const [tshirtData, setTShirtData] = useState<TShirtData>({
    color: "#ffffff",
    frontTexture: null,
    backTexture: null,
    material: "Cotton",
  });

  return (
    <TShirtContext.Provider value={{ tshirtData, setTShirtData }}>
      {children}
    </TShirtContext.Provider>
  );
};

export const useTShirt = () => {
  const context = useContext(TShirtContext);
  if (!context) {
    throw new Error("useTShirt must be used within a TShirtProvider");
  }
  return context;
};
