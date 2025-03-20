import React from "react";
import { SketchPicker, ColorResult } from "react-color";
import { useSnapshot } from "valtio";
import state from "@/store/state";

const ColorPicker: React.FC = () => {
  const snap = useSnapshot(state);

  const handleChange = (color: ColorResult) => {
    state.color = color.hex;
  };

  return (
    <div className="absolute left-full ml-3">
      <SketchPicker
        color={snap.color}
        disableAlpha
        presetColors={[
          "#007BFF",
          "#FF007F",
          "#FF4500",
          "#C0A25C",
          "#F8F7F3",
          "#708238",
          "#D4B483",
          "#C48B8B",
          "#D4A017",
        ]}
        onChange={handleChange}
      />
    </div>
  );
};

export default ColorPicker;
