// import { useRouter } from "next/router";

// const VirtualTryOnButton = () => {
//   const router = useRouter();

//   const handleTryOn = async () => {
//     try {
//       const response = await fetch("http://localhost:5000/tryon", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           background:
//             "D:/Pics/WhatsApp Image 2025-01-31 at 13.20.11_fe1f0f53.jpg",
//           garment: "C:/Users/VICTUS/Downloads/tshirt_full_design (9).png",
//           garment_des: "Trendy fashion wear",
//           is_checked: true,
//           is_checked_crop: false,
//           denoise_steps: 30,
//           seed: 42,
//         }),
//       });

//       if (!response.ok) throw new Error("Failed to process Try-On");

//       // Redirect to Virtual Try-On page after API call
//       router.push("http://localhost:5000");
//     } catch (error) {
//       console.error("Error:", error);
//       alert("Failed to connect to Try-On API");
//     }
//   };

//   return <button onClick={handleTryOn}>Go to Virtual Try-On</button>;
// };

// export default VirtualTryOnButton;

"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";

const VirtualTryOnButton = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleTryOn = async () => {
    setLoading(true);
    try {
      const response = await fetch("http://127.0.0.1:5000/tryon", {
        method: "POST", // ✅ Ensures a POST request
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          background:
            "D:PicsWhatsApp Image 2025-01-31 at 13.20.11_fe1f0f53.jpg",
          garment: "C:UsersVICTUSDownloads\tshirt_full_design (4).png",
          garment_des: "Trendy fashion wear",
          is_checked: true,
          is_checked_crop: false,
          denoise_steps: 30,
          seed: 42,
        }),
      });

      if (!response.ok) throw new Error("Failed to process Try-On");

      const data = await response.json();
      console.log("Try-On Output:", data);

      router.push("http://127.0.0.1:5000");
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to connect to Try-On API");
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleTryOn}
      className="p-3 bg-blue-500 text-white rounded"
    >
      {loading ? "Processing..." : "Go to Virtual Try-On"}
    </button>
  );
};

export default VirtualTryOnButton;
