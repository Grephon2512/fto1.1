// // // // "use client";
// // // // import { useState, useEffect } from "react";
// // // // import Image from "next/image";
// // // // import { useSession, signIn } from "next-auth/react";
// // // // import { useRouter } from "next/navigation";

// // // // const CheckoutPage = ({ customizationData }: { customizationData: any }) => {
// // // //   const { data: session, status } = useSession();
// // // //   const router = useRouter();
// // // //   const [quantity, setQuantity] = useState(1);
// // // //   const pricePerTShirt = 20; // Example price
// // // //   const totalPrice = quantity * pricePerTShirt;
// // // //   const [estimatedShippingDate, setEstimatedShippingDate] = useState("");

// // // //   useEffect(() => {
// // // //     const currentDate = new Date();
// // // //     currentDate.setDate(currentDate.getDate() + 5); // Estimate 5 days for shipping
// // // //     setEstimatedShippingDate(currentDate.toDateString());
// // // //   }, []);

// // // //   // Redirect to sign-in if not logged in
// // // //   useEffect(() => {
// // // //     if (status === "unauthenticated") {
// // // //       signIn(); // Redirects to login page
// // // //     }
// // // //   }, [status]);

// // // //   if (status === "loading") {
// // // //     return <p className="text-center text-gray-600">Loading...</p>;
// // // //   }

// // // //   return (
// // // //     <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
// // // //       <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
// // // //         <h2 className="text-xl font-semibold text-gray-700 mb-4">Checkout</h2>

// // // //         {/* T-shirt Preview */}
// // // //         <div className="w-full flex justify-center mb-4">
// // // //           <Image
// // // //             src={customizationData?.texture || "/default-tshirt.png"}
// // // //             alt="T-shirt Preview"
// // // //             width={200}
// // // //             height={200}
// // // //             className="rounded-md shadow-md"
// // // //           />
// // // //         </div>

// // // //         {/* Quantity Selector */}
// // // //         <div className="flex items-center justify-between w-full px-3 py-2 rounded-lg bg-white/20 backdrop-blur-md shadow-md">
// // // //           <p className="text-gray-700 text-sm font-medium">Quantity:</p>
// // // //           <input
// // // //             type="number"
// // // //             min="1"
// // // //             value={quantity}
// // // //             onChange={(e) => setQuantity(Number(e.target.value))}
// // // //             className="px-3 py-1 border rounded-lg text-gray-700 text-sm w-16"
// // // //           />
// // // //         </div>

// // // //         {/* Price Calculation */}
// // // //         <div className="flex items-center justify-between w-full px-3 py-2 mt-3 rounded-lg bg-white/20 backdrop-blur-md shadow-md">
// // // //           <p className="text-gray-700 text-sm font-medium">Total Price:</p>
// // // //           <p className="font-semibold text-gray-800">${totalPrice}</p>
// // // //         </div>

// // // //         {/* Estimated Shipping Date */}
// // // //         <div className="flex items-center justify-between w-full px-3 py-2 mt-3 rounded-lg bg-white/20 backdrop-blur-md shadow-md">
// // // //           <p className="text-gray-700 text-sm font-medium">
// // // //             Estimated Shipping:
// // // //           </p>
// // // //           <p className="font-semibold text-gray-800">{estimatedShippingDate}</p>
// // // //         </div>

// // // //         {/* Buy Now Button */}
// // // //         <button className="w-full px-6 py-3 mt-4 rounded-lg font-semibold transition-all duration-300 bg-blue-500 hover:bg-blue-600 text-white shadow-md">
// // // //           Buy Now
// // // //         </button>
// // // //       </div>
// // // //     </div>
// // // //   );
// // // // };

// // // // export default CheckoutPage;

// // // "use client";
// // // import { useState, useEffect } from "react";
// // // import Image from "next/image";
// // // import { useSession, signIn } from "next-auth/react";
// // // import { useRouter } from "next/navigation";

// // // const CheckoutPage = ({ customizationData }: { customizationData: any }) => {
// // //   const { data: session, status } = useSession();
// // //   const router = useRouter();

// // //   const [quantity, setQuantity] = useState(1);
// // //   const [loading, setLoading] = useState(false);
// // //   const pricePerTShirt = 20;
// // //   const totalPrice = quantity * pricePerTShirt;
// // //   const [estimatedShippingDate, setEstimatedShippingDate] = useState("");

// // //   useEffect(() => {
// // //     const currentDate = new Date();
// // //     currentDate.setDate(currentDate.getDate() + 5); // Estimate 5 days for shipping
// // //     setEstimatedShippingDate(currentDate.toDateString());
// // //   }, []);

// // //   // Redirect to sign-in if not logged in
// // //   useEffect(() => {
// // //     if (status === "unauthenticated") {
// // //       signIn();
// // //     }
// // //   }, [status]);

// // //   const handleBuyNow = async () => {
// // //     if (!session) {
// // //       signIn();
// // //       return;
// // //     }

// // //     setLoading(true);
// // //     try {
// // //       const response = await fetch("/api/orders", {
// // //         method: "POST",
// // //         headers: {
// // //           "Content-Type": "application/json",
// // //           Authorization: `Bearer ${session.accessToken}`, // Ensure accessToken is used
// // //         },
// // //         body: JSON.stringify({
// // //           userId: session.user.id, // Send authenticated user ID
// // //           quantity,
// // //           totalPrice,
// // //           customizationData,
// // //         }),
// // //       });

// // //       if (!response.ok) {
// // //         throw new Error("Failed to place order");
// // //       }

// // //       router.push("/order-confirmation"); // Redirect on success
// // //     } catch (error) {
// // //       console.error("Order error:", error);
// // //       alert("Failed to complete the order. Please try again.");
// // //     } finally {
// // //       setLoading(false);
// // //     }
// // //   };

// // //   if (status === "loading") {
// // //     return <p className="text-center text-gray-600">Loading...</p>;
// // //   }

// // //   return (
// // //     <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
// // //       <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
// // //         <h2 className="text-xl font-semibold text-gray-700 mb-4">Checkout</h2>

// // //         {/* T-shirt Preview */}
// // //         <div className="w-full flex justify-center mb-4">
// // //           <Image
// // //             src={customizationData?.texture || "/default-tshirt.png"}
// // //             alt="T-shirt Preview"
// // //             width={200}
// // //             height={200}
// // //             className="rounded-md shadow-md"
// // //           />
// // //         </div>

// // //         {/* Quantity Selector */}
// // //         <div className="flex items-center justify-between w-full px-3 py-2 rounded-lg bg-white/20 backdrop-blur-md shadow-md">
// // //           <p className="text-gray-700 text-sm font-medium">Quantity:</p>
// // //           <input
// // //             type="number"
// // //             min="1"
// // //             value={quantity}
// // //             onChange={(e) => setQuantity(Number(e.target.value))}
// // //             className="px-3 py-1 border rounded-lg text-gray-700 text-sm w-16"
// // //           />
// // //         </div>

// // //         {/* Price Calculation */}
// // //         <div className="flex items-center justify-between w-full px-3 py-2 mt-3 rounded-lg bg-white/20 backdrop-blur-md shadow-md">
// // //           <p className="text-gray-700 text-sm font-medium">Total Price:</p>
// // //           <p className="font-semibold text-gray-800">${totalPrice}</p>
// // //         </div>

// // //         {/* Estimated Shipping Date */}
// // //         <div className="flex items-center justify-between w-full px-3 py-2 mt-3 rounded-lg bg-white/20 backdrop-blur-md shadow-md">
// // //           <p className="text-gray-700 text-sm font-medium">
// // //             Estimated Shipping:
// // //           </p>
// // //           <p className="font-semibold text-gray-800">{estimatedShippingDate}</p>
// // //         </div>

// // //         {/* Buy Now Button */}
// // //         <button
// // //           onClick={handleBuyNow}
// // //           disabled={loading}
// // //           className={`w-full px-6 py-3 mt-4 rounded-lg font-semibold transition-all duration-300 ${
// // //             loading
// // //               ? "bg-gray-400 cursor-not-allowed"
// // //               : "bg-blue-500 hover:bg-blue-600 text-white shadow-md"
// // //           }`}
// // //         >
// // //           {loading ? "Processing..." : "Buy Now"}
// // //         </button>
// // //       </div>
// // //     </div>
// // //   );
// // // };

// // // export default CheckoutPage;

// // "use client";

// // import { useState, useEffect } from "react";
// // import { useRouter } from "next/navigation";
// // import Image from "next/image";

// // interface TShirt {
// //   color: string;
// //   frontTexture?: string;
// //   backTexture?: string;
// //   material: string;
// //   price: number;
// // }

// // export default function CheckoutPage() {
// //   const router = useRouter();

// //   // Simulated selected T-shirt data (remove this if you're passing data properly)
// //   const selectedTShirt: TShirt = {
// //     color: "Black",
// //     frontTexture: "/tshirt-front.png",
// //     backTexture: "/tshirt-back.png",
// //     material: "Cotton",
// //     price: 699, // ₹699 (INR)
// //   };

// //   console.log("Selected T-shirt:", selectedTShirt);

// //   const [quantity, setQuantity] = useState(1);
// //   const [totalPrice, setTotalPrice] = useState(selectedTShirt.price);
// //   const [estimatedDelivery, setEstimatedDelivery] = useState("");
// //   const [size, setSize] = useState("M"); // Default size

// //   useEffect(() => {
// //     setTotalPrice(selectedTShirt.price * quantity);
// //   }, [quantity, selectedTShirt.price]);

// //   useEffect(() => {
// //     const deliveryDate = new Date();
// //     deliveryDate.setDate(
// //       deliveryDate.getDate() + Math.floor(Math.random() * 5) + 3
// //     );
// //     setEstimatedDelivery(deliveryDate.toDateString());
// //   }, []);

// //   const handleQuantityChange = (change: number) => {
// //     setQuantity((prev) => Math.max(1, prev + change));
// //   };

// //   return (
// //     <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-purple-900 via-cyan-600 to-slate-400 text-white p-8">
// //       <div className="bg-white/10 backdrop-blur-md p-6 rounded-lg shadow-lg w-full max-w-lg">
// //         <h1 className="text-3xl font-bold text-center mb-6 text-slate-900">
// //           Checkout
// //         </h1>

// //         {/* T-Shirt Preview */}
// //         <div className="flex flex-col items-center space-y-4">
// //           <div className="flex space-x-4">
// //             {/* Front View */}
// //             <div className="relative w-40 h-40 bg-gray-800 rounded-lg flex items-center justify-center">
// //               {selectedTShirt.frontTexture && (
// //                 <Image
// //                   src={selectedTShirt.frontTexture}
// //                   alt="Image-1"
// //                   width={160}
// //                   height={160}
// //                   className="rounded-lg"
// //                 />
// //               )}
// //             </div>

// //             {/* Back View */}
// //             <div className="relative w-40 h-40 bg-gray-800 rounded-lg flex items-center justify-center">
// //               {selectedTShirt.backTexture && (
// //                 <Image
// //                   src={selectedTShirt.backTexture}
// //                   alt="Image-2"
// //                   width={160}
// //                   height={160}
// //                   className="rounded-lg"
// //                 />
// //               )}
// //             </div>
// //           </div>

// //           <p className="text-lg">Color: {selectedTShirt.color}</p>
// //           <p className="text-lg">Material: {selectedTShirt.material}</p>
// //           <p className="text-lg">
// //             Price: ₹{selectedTShirt.price.toLocaleString()}
// //           </p>
// //         </div>

// //         {/* Size Selector */}

// //         <div className="mt-4 text-center">
// //           <label htmlFor="size" className="text-lg font-semibold text-white">
// //             Size:
// //           </label>
// //           <select
// //             id="size"
// //             value={size}
// //             onChange={(e) => setSize(e.target.value)}
// //             className="ml-2 p-2 bg-white/20 backdrop-blur-md text-slate-800 border border-white/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-white/50 transition"
// //           >
// //             <option value="XS" className="text-black">
// //               XS
// //             </option>
// //             <option value="S" className="text-black">
// //               S
// //             </option>
// //             <option value="M" className="text-black">
// //               M
// //             </option>
// //             <option value="L" className="text-black">
// //               L
// //             </option>
// //             <option value="XL" className="text-black">
// //               XL
// //             </option>
// //           </select>
// //         </div>

// //         {/* Quantity Selector */}
// //         <div className="flex items-center justify-center mt-6 space-x-4">
// //           <button
// //             className="bg-red-500 hover:bg-red-600 text-slate-900 px-4 py-2 rounded-lg"
// //             onClick={() => handleQuantityChange(-1)}
// //           >
// //             -
// //           </button>
// //           <span className="text-xl font-semibold">{quantity}</span>
// //           <button
// //             className="bg-green-500 hover:bg-green-600 text-slate-900 px-4 py-2 rounded-lg"
// //             onClick={() => handleQuantityChange(1)}
// //           >
// //             +
// //           </button>
// //         </div>

// //         {/* Price & Delivery Date */}
// //         <div className="mt-6 text-center">
// //           <p className="text-xl font-semibold">
// //             Total: ₹{totalPrice.toLocaleString()}
// //           </p>
// //           <p className="text-lg text-slate-900 mt-2">
// //             Estimated Delivery: {estimatedDelivery}
// //           </p>
// //         </div>

// //         {/* Buy Button */}
// //         <button
// //           className="mt-6 w-full bg-blue-500 hover:bg-blue-600 text-slate-900 py-3 rounded-lg text-lg font-semibold"
// //           onClick={() => alert("Order placed!")}
// //         >
// //           Buy Now
// //         </button>
// //       </div>
// //     </div>
// //   );
// // }

// "use client";

// import { useState, useEffect } from "react";
// import { useRouter } from "next/navigation";
// import Image from "next/image";
// import { useTShirt } from "@/app/context/TShirtContext";

// export default function CheckoutPage() {
//   const router = useRouter();
//   const { tshirtData } = useTShirt();

//   // Use context data instead of hardcoded values
//   const selectedTShirt = {
//     color: tshirtData.color || "Black",
//     frontTexture: tshirtData.frontTexture || "/BLANK.jpg",
//     backTexture: tshirtData.backTexture || "/BLANK.jpg",
//     material: tshirtData.material || "Cotton",
//     price: 699, // Default price (can be dynamic if needed)
//   };

//   console.log("Selected T-shirt:", selectedTShirt);

//   const [quantity, setQuantity] = useState(1);
//   const [totalPrice, setTotalPrice] = useState(selectedTShirt.price);
//   const [estimatedDelivery, setEstimatedDelivery] = useState("");
//   const [size, setSize] = useState("M"); // Default size

//   useEffect(() => {
//     setTotalPrice(selectedTShirt.price * quantity);
//   }, [quantity, selectedTShirt.price]);

//   useEffect(() => {
//     const deliveryDate = new Date();
//     deliveryDate.setDate(
//       deliveryDate.getDate() + Math.floor(Math.random() * 5) + 3
//     );
//     setEstimatedDelivery(deliveryDate.toDateString());
//   }, []);

//   const handleQuantityChange = (change: number) => {
//     setQuantity((prev) => Math.max(1, prev + change));
//   };

//   return (
//     <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-purple-900 via-cyan-600 to-slate-400 text-white p-8">
//       <div className="bg-white/10 backdrop-blur-md p-6 rounded-lg shadow-lg w-full max-w-lg">
//         <h1 className="text-3xl font-bold text-center mb-6 text-slate-900">
//           Checkout
//         </h1>

//         {/* T-Shirt Preview */}
//         <div className="flex flex-col items-center space-y-4">
//           <div className="flex space-x-4">
//             {/* Front View */}
//             <div className="relative w-40 h-40 bg-gray-800 rounded-lg flex items-center justify-center">
//               <Image
//                 src={selectedTShirt.frontTexture}
//                 alt="Front Texture"
//                 width={160}
//                 height={160}
//                 className="rounded-lg"
//               />
//             </div>

//             {/* Back View */}
//             <div className="relative w-40 h-40 bg-gray-800 rounded-lg flex items-center justify-center">
//               <Image
//                 src={selectedTShirt.backTexture}
//                 alt="Back Texture"
//                 width={160}
//                 height={160}
//                 className="rounded-lg"
//               />
//             </div>
//           </div>

//           <p className="text-lg">Color: {selectedTShirt.color}</p>
//           <p className="text-lg">Material: {selectedTShirt.material}</p>
//           <p className="text-lg">
//             Price: ₹{selectedTShirt.price.toLocaleString()}
//           </p>
//         </div>

//         {/* Size Selector */}
//         <div className="mt-4 text-center">
//           <label htmlFor="size" className="text-lg font-semibold text-white">
//             Size:
//           </label>
//           <select
//             id="size"
//             value={size}
//             onChange={(e) => setSize(e.target.value)}
//             className="ml-2 p-2 bg-white/20 backdrop-blur-md text-slate-800 border border-white/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-white/50 transition"
//           >
//             <option value="XS" className="text-black">
//               XS
//             </option>
//             <option value="S" className="text-black">
//               S
//             </option>
//             <option value="M" className="text-black">
//               M
//             </option>
//             <option value="L" className="text-black">
//               L
//             </option>
//             <option value="XL" className="text-black">
//               XL
//             </option>
//           </select>
//         </div>

//         {/* Quantity Selector */}
//         <div className="flex items-center justify-center mt-6 space-x-4">
//           <button
//             className="bg-red-500 hover:bg-red-600 text-slate-900 px-4 py-2 rounded-lg"
//             onClick={() => handleQuantityChange(-1)}
//           >
//             -
//           </button>
//           <span className="text-xl font-semibold">{quantity}</span>
//           <button
//             className="bg-green-500 hover:bg-green-600 text-slate-900 px-4 py-2 rounded-lg"
//             onClick={() => handleQuantityChange(1)}
//           >
//             +
//           </button>
//         </div>

//         {/* Price & Delivery Date */}
//         <div className="mt-6 text-center">
//           <p className="text-xl font-semibold">
//             Total: ₹{totalPrice.toLocaleString()}
//           </p>
//           <p className="text-lg text-slate-900 mt-2">
//             Estimated Delivery: {estimatedDelivery}
//           </p>
//         </div>

//         {/* Buy Button */}
//         <button
//           className="mt-6 w-full bg-blue-500 hover:bg-blue-600 text-slate-900 py-3 rounded-lg text-lg font-semibold"
//           onClick={() => alert("Order placed!")}
//         >
//           Buy Now
//         </button>
//       </div>
//     </div>
//   );
// }
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useTShirt } from "@/app/context/TShirtContext";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string
);

export default function CheckoutPage() {
  const router = useRouter();
  const { tshirtData } = useTShirt();

  // Use context data instead of hardcoded values
  const selectedTShirt = {
    color: tshirtData?.color || "Black",
    frontTexture: tshirtData?.frontTexture || "/BLANK.jpg",
    backTexture: tshirtData?.backTexture || "/BLANK.jpg",
    material: tshirtData?.material || "Cotton",
    price: 699, // Default price
  };

  console.log("Selected T-shirt:", selectedTShirt);

  const [quantity, setQuantity] = useState(1);
  const [totalPrice, setTotalPrice] = useState(selectedTShirt.price);
  const [estimatedDelivery, setEstimatedDelivery] = useState("");
  const [size, setSize] = useState("M");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setTotalPrice(selectedTShirt.price * quantity);
  }, [quantity, selectedTShirt.price]);

  useEffect(() => {
    const deliveryDate = new Date();
    deliveryDate.setDate(
      deliveryDate.getDate() + Math.floor(Math.random() * 5) + 3
    );
    setEstimatedDelivery(deliveryDate.toDateString());
  }, []);

  const handleQuantityChange = (change: number) => {
    setQuantity((prev) => Math.max(1, prev + change));
  };

  const [isProcessing, setIsProcessing] = useState(false);

  const handleCheckout = async () => {
    setLoading(true);

    const checkoutData = {
      quantity,
      totalAmount: totalPrice,
      tShirt: {
        color: selectedTShirt.color,
        frontTexture: selectedTShirt.frontTexture,
        backTexture: selectedTShirt.backTexture,
        material: selectedTShirt.material,
        size,
      },
    };

    try {
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(checkoutData),
      });

      const data = await response.json();

      if (!response.ok || !data.sessionId) {
        throw new Error(`Checkout failed: ${data.error || "Unknown error"}`);
      }

      // Redirect to Payment Page
      router.push(`/payment?sessionId=${data.sessionId}`);
    } catch (error) {
      console.error("Checkout Error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-purple-900 via-cyan-600 to-slate-400 text-white p-8">
      <div className="bg-white/10 backdrop-blur-md p-6 rounded-lg shadow-lg w-full max-w-lg">
        <h1 className="text-3xl font-bold text-center mb-6 text-slate-900">
          Checkout
        </h1>

        {/* T-Shirt Preview */}
        <div className="flex flex-col items-center space-y-4">
          <div className="flex space-x-4">
            <div className="relative w-40 h-40 bg-gray-800 rounded-lg flex items-center justify-center">
              <Image
                src={selectedTShirt.frontTexture}
                alt="Front Texture"
                width={160}
                height={160}
                className="rounded-lg"
              />
            </div>

            <div className="relative w-40 h-40 bg-gray-800 rounded-lg flex items-center justify-center">
              <Image
                src={selectedTShirt.backTexture}
                alt="Back Texture"
                width={160}
                height={160}
                className="rounded-lg"
              />
            </div>
          </div>

          <p className="text-lg">Color: {selectedTShirt.color}</p>
          <p className="text-lg">Material: {selectedTShirt.material}</p>
          <p className="text-lg">
            Price: ₹{selectedTShirt.price.toLocaleString()}
          </p>
        </div>

        {/* Size Selector */}
        <div className="mt-4 text-center">
          <label htmlFor="size" className="text-lg font-semibold text-white">
            Size:
          </label>
          <select
            id="size"
            value={size}
            onChange={(e) => setSize(e.target.value)}
            className="ml-2 p-2 bg-white/20 backdrop-blur-md text-slate-800 border border-white/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-white/50 transition"
          >
            <option value="XS" className="text-black">
              XS
            </option>
            <option value="S" className="text-black">
              S
            </option>
            <option value="M" className="text-black">
              M
            </option>
            <option value="L" className="text-black">
              L
            </option>
            <option value="XL" className="text-black">
              XL
            </option>
          </select>
        </div>

        {/* Quantity Selector */}
        <div className="flex items-center justify-center mt-6 space-x-4">
          <button
            className="bg-red-500 hover:bg-red-600 text-slate-900 px-4 py-2 rounded-lg"
            onClick={() => handleQuantityChange(-1)}
          >
            -
          </button>
          <span className="text-xl font-semibold">{quantity}</span>
          <button
            className="bg-green-500 hover:bg-green-600 text-slate-900 px-4 py-2 rounded-lg"
            onClick={() => handleQuantityChange(1)}
          >
            +
          </button>
        </div>

        {/* Price & Delivery Date */}
        <div className="mt-6 text-center">
          <p className="text-xl font-semibold">
            Total: ₹{totalPrice.toLocaleString()}
          </p>
          <p className="text-lg text-slate-900 mt-2">
            Estimated Delivery: {estimatedDelivery}
          </p>
        </div>

        {/* Buy Button */}
        <button
          className={`mt-6 w-full py-3 rounded-lg text-lg font-semibold ${
            loading
              ? "bg-gray-500 cursor-not-allowed"
              : "bg-blue-500 hover:bg-blue-600 text-slate-900"
          }`}
          onClick={handleCheckout}
          disabled={loading}
        >
          {loading ? "Processing..." : "Buy Now"}
        </button>
      </div>
    </div>
  );
}
