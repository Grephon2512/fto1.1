// "use client";

// import * as THREE from "three";
// import { GLTFExporter } from "three/examples/jsm/exporters/GLTFExporter.js";
// import { RefObject } from "react";

// export default function DownloadGLBButton({
//   modelRef,
// }: {
//   modelRef: RefObject<THREE.Group>;
// }) {
//   const handleDownload = () => {
//     if (!modelRef.current) {
//       console.error("❌ Model reference is null.");
//       return;
//     }

//     const exporter = new GLTFExporter();
//     exporter.parse(
//       modelRef.current,
//       (gltf) => {
//         if (!(gltf instanceof ArrayBuffer)) {
//           console.error("❌ Failed to export GLB as binary.");
//           return;
//         }

//         const blob = new Blob([gltf], { type: "model/gltf-binary" });

//         const url = URL.createObjectURL(blob);
//         const a = document.createElement("a");
//         a.href = url;
//         a.download = "custom_tshirt.glb";
//         document.body.appendChild(a);
//         a.click();
//         document.body.removeChild(a);

//         URL.revokeObjectURL(url);
//       },
//       { binary: true } as any // ✅ Type assertion to fix TypeScript error
//     );
//   };

//   return (
//     <button
//       onClick={handleDownload}
//       className="px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition"
//     >
//       ⬇ Download T-Shirt Model
//     </button>
//   );
// }

// "use client";

// import * as THREE from "three";
// import { GLTFExporter } from "three/examples/jsm/exporters/GLTFExporter.js";
// import { RefObject } from "react";

// export default function DownloadGLBButton({
//   modelRef,
// }: {
//   modelRef: RefObject<THREE.Group>;
// }) {
//   const handleDownload = () => {
//     if (!modelRef.current) {
//       console.error("❌ Model reference is null.");
//       alert("Model is not ready yet. Please try again.");
//       return;
//     }

//     console.log("🛠 ModelRef content:", modelRef.current);

//     const exporter = new GLTFExporter();
//     const options: any = { binary: true, onlyVisible: false };

//     const scene = new THREE.Scene(); // ✅ Wrap in a scene
//     scene.add(modelRef.current);

//     exporter.parse(
//       scene,
//       (result) => {
//         console.log("🔍 Exported GLTF:", result);
//         console.log("📝 Type of exported data:", typeof result);

//         if (result instanceof ArrayBuffer) {
//           // ✅ Successfully exported as binary
//           saveArrayBuffer(result, "custom_tshirt.glb");
//         } else {
//           // 🔄 Manually convert JSON to binary
//           const gltfJson = JSON.stringify(result, null, 2);
//           const blob = new Blob([gltfJson], { type: "application/json" });
//           saveBlob(blob, "custom_tshirt.glb");
//         }
//       },
//       options
//     );
//   };

//   // ✅ Function to save an ArrayBuffer as a file
//   function saveArrayBuffer(buffer: ArrayBuffer, filename: string) {
//     const blob = new Blob([buffer], { type: "model/gltf-binary" });
//     saveBlob(blob, filename);
//   }

//   // ✅ Function to save a Blob as a file
//   function saveBlob(blob: Blob, filename: string) {
//     const url = URL.createObjectURL(blob);
//     const a = document.createElement("a");
//     a.href = url;
//     a.download = filename;
//     document.body.appendChild(a);
//     a.click();
//     document.body.removeChild(a);
//     URL.revokeObjectURL(url);
//     console.log(`✅ Model downloaded as ${filename}`);
//   }

//   return (
//     <button
//       onClick={handleDownload}
//       className="px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition"
//     >
//       ⬇ Download T-Shirt Model
//     </button>
//   );
// }

"use client";

import * as THREE from "three";
import { GLTFExporter } from "three/examples/jsm/exporters/GLTFExporter.js";
import { RefObject } from "react";

export default function DownloadGLBButton({
  modelRef,
}: {
  modelRef: RefObject<THREE.Group>;
}) {
  const handleDownload = () => {
    if (!modelRef.current) {
      console.error("❌ Model reference is null.");
      alert("Model is not ready yet. Please try again.");
      return;
    }

    const exporter = new GLTFExporter();

    exporter.parse(
      modelRef.current,
      (gltf) => {
        if (gltf instanceof ArrayBuffer) {
          const blob = new Blob([gltf], { type: "model/gltf-binary" });
          const url = URL.createObjectURL(blob);
          const a = document.createElement("a");
          a.href = url;
          a.download = "custom_tshirt.glb";
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
          URL.revokeObjectURL(url);

          console.log("✅ Model downloaded successfully!");
        } else {
          console.error("❌ Exported data is not a binary ArrayBuffer.");
          alert("Export failed. Try again.");
        }
      },
      () => {}, // ✅ Fix: Passing an empty function as the second argument
      { binary: true } // ✅ Correct placement of the options object
    );
  };

  return (
    <div className="flex items-center justify-between w-full px-3 py-2 rounded-lg bg-white/20 backdrop-blur-md shadow-md transition-all duration-300 hover:shadow-blue-500/50">
      <p className="text-black text-sm font-medium">Download Model:</p>
      <button
        onClick={handleDownload}
        className="px-4 py-2 rounded-lg font-semibold transition-all duration-300 
               bg-blue-500 hover:bg-blue-600 text-white shadow-md"
      >
        Download
      </button>
    </div>
  );
}
