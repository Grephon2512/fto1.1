// // import { useRouter } from "next/navigation";
// // import { ShoppingCart } from "lucide-react"; // Using an icon for better UI

// // export default function ProceedToBuyButton({
// //   customizationData,
// // }: {
// //   customizationData: any;
// // }) {
// //   const router = useRouter();

// //   const handleProceedToBuy = () => {
// //     if (!customizationData) {
// //       alert("Customize your T-shirt before proceeding!");
// //       return;
// //     }

// //     // Save customization data (You can use localStorage, Zustand, or Context API)
// //     localStorage.setItem("customTshirtData", JSON.stringify(customizationData));

// //     // Redirect to the checkout page
// //     router.push("/checkout");
// //   };

// //   return (
// //     <button
// //       onClick={handleProceedToBuy}
// //       className="px-6 py-3 rounded-full font-semibold transition-all duration-300 flex items-center justify-center gap-2 shadow-lg
// //       bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-indigo-600 hover:to-blue-700 text-white transform hover:scale-105"
// //     >
// //       <ShoppingCart size={20} />
// //       Proceed to Buy
// //     </button>
// //   );
// // }

// import { useRouter } from "next/navigation";
// import { ShoppingCart } from "lucide-react"; // Shopping cart icon for better UX

// export default function ProceedToBuyButton({
//   customizationData = {},
// }: {
//   customizationData?: any;
// }) {
//   const router = useRouter();

//   const handleProceedToBuy = () => {
//     if (!customizationData || Object.keys(customizationData).length === 0) {
//       alert("Customize your T-shirt before proceeding!");
//       return;
//     }

//     // Save customization data in localStorage
//     localStorage.setItem("customTshirtData", JSON.stringify(customizationData));

//     // Redirect to the checkout page
//     router.push("/checkout");
//   };

//   return (
//     <div className="flex items-center justify-between w-full px-3 py-2 rounded-lg bg-white/20 backdrop-blur-md shadow-md transition-all duration-300 hover:shadow-blue-500/50">
//       <p className="text-black text-sm font-medium">Proceed to Buy:</p>
//       <button
//         onClick={handleProceedToBuy}
//         className="px-4 py-2 rounded-lg font-semibold transition-all duration-300
//                bg-blue-500 hover:bg-blue-600 text-white shadow-md flex items-center gap-2"
//       >
//         <ShoppingCart size={20} />
//         Buy Now
//       </button>
//     </div>
//   );
// }

import { useRouter } from "next/navigation";
import { ShoppingCart } from "lucide-react"; // Shopping cart icon for better UX

interface ProceedToBuyButtonProps {
  customizationData: {
    color: string;
    frontTexture: string | null;
    backTexture: string | null;
    material: string;
  };
  handleProceedToCheckout: () => void; // Accept function as prop
}

export default function ProceedToBuyButton({
  customizationData = {
    color: "",
    frontTexture: null,
    backTexture: null,
    material: "",
  }, // ✅ Correct default value
  handleProceedToCheckout,
}: ProceedToBuyButtonProps) {
  const router = useRouter();

  const handleProceedToBuy = () => {
    if (!customizationData || Object.keys(customizationData).length === 0) {
      alert("Customize your T-shirt before proceeding!");
      return;
    }

    // Save customization data in localStorage
    localStorage.setItem("customTshirtData", JSON.stringify(customizationData));

    // Proceed to checkout using the passed function
    handleProceedToCheckout();
  };

  return (
    <div className="flex items-center justify-between w-full px-3 py-2 rounded-lg bg-white/20 backdrop-blur-md shadow-md transition-all duration-300 hover:shadow-blue-500/50">
      <p className="text-black text-sm font-medium">Proceed to Buy:</p>
      <button
        onClick={handleProceedToBuy}
        className="px-4 py-2 rounded-lg font-semibold transition-all duration-300 
               bg-blue-500 hover:bg-blue-600 text-white shadow-md flex items-center gap-2"
      >
        <ShoppingCart size={20} />
        Buy Now
      </button>
    </div>
  );
}
