import React from "react";
import CustomButton from "./CustomButton";

interface PresetFile {
  name: string;
  url: string;
}

interface FilePickerProps {
  file: File | null;
  setFile: (file: File | null) => void;
  readFile: (type: "full" | "logo", file?: File) => void;
}

const presetFiles: PresetFile[] = [
  {
    name: "Cheetah Pattern",
    url: "DALL·E 2025-02-06 15.32.42 - A professional and stylish T-shirt design featuring cheetah spots. The pattern is sleek, well-defined, and evenly distributed across the fabric, creat.webp",
  },
  {
    name: "Cricket Jersey",
    url: "DALL·E 2025-02-06 15.49.08 - A professional and stylish cricket jersey design. The jersey features a modern, sleek look with dynamic patterns and bold accents. The colors are vibr.webp",
  },
  {
    name: "Floral Pattern",
    url: "DALL·E 2025-02-06 10.17.09 - A minimalistic T-shirt design featuring elegant red and black flowers. The flowers are simple yet stylish, arranged in a balanced and aesthetically pl.webp",
  },
  {
    name: "Star Pattern",
    url: "DALL·E 2025-02-07 15.42.41 - A 3D-rendered T-shirt featuring a star-shaped design at the center, surrounded by a mix of small, medium, and large dots. The design should be modern .webp",
  },
];

const FilePicker: React.FC<FilePickerProps> = ({ file, setFile, readFile }) => {
  const handlePresetSelection = (fileUrl: string) => {
    fetch(fileUrl)
      .then((res) => res.blob())
      .then((blob) => {
        const newFile = new File(
          [blob],
          fileUrl.split("/").pop() || "preset.png",
          {
            type: "image/png",
          }
        );
        setFile(newFile);
        readFile("full", newFile);
      })
      .catch((error) => console.error("Error loading preset file:", error));
  };

  return (
    <div className="filepicker-container">
      <div className="flex-1 flex flex-col">
        <input
          id="file-upload"
          type="file"
          accept="image/*"
          onChange={(e) => setFile(e.target.files ? e.target.files[0] : null)}
        />
        <label htmlFor="file-upload" className="filepicker-label">
          Upload File
        </label>

        <p className="mt-2 text-gray-500 text-xs truncate">
          {file ? file.name : "No file selected"}
        </p>
      </div>

      {/* Preset Files Section */}
      <div className="mt-4 flex flex-wrap gap-3">
        {presetFiles.map((preset, index) => (
          <CustomButton
            key={index}
            type="outline"
            title={preset.name}
            handleClick={() => handlePresetSelection(preset.url)}
            customStyles="text-xs"
          />
        ))}
      </div>

      {/* Default Upload Buttons */}
      <div className="mt-4 flex flex-wrap gap-3">
        <CustomButton
          type="outline"
          title="Logo"
          handleClick={() => readFile("logo")}
          customStyles="text-xs"
        />
        <CustomButton
          type="filled"
          title="Full"
          handleClick={() => readFile("full")}
          customStyles="text-xs"
        />
      </div>
    </div>
  );
};

export default FilePicker;
