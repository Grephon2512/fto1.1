// "use client";

// import Link from "next/link";
// import Image from "next/image";
// import { motion } from "framer-motion";
// import Tilt from "react-parallax-tilt";
// import Sidebar from "@/components/Sidebar";

// const clothes = [
//   { id: 1, name: "Hoodie", image: "/hoodie.jpg" },
//   { id: 2, name: "T-Shirt", image: "/tshirt.jpg" },
//   { id: 3, name: "Jacket", image: "/jacket.jpg" },
//   { id: 4, name: "Sweater", image: "/sweater.jpg" },
//   { id: 5, name: "Polo", image: "/polo.jpg" },
//   { id: 6, name: "Denim Jacket", image: "/denim.jpg" },
//   { id: 7, name: "Vest", image: "/vest.jpg" },
//   { id: 8, name: "Long Coat", image: "/coat.jpg" },
// ];

// const MainPage = () => {
//   return (
//     <div className="flex h-screen w-full bg-gradient-to-br from-gray-900 via-blue-800 to-purple-900 relative overflow-hidden">
//       {/* Sidebar */}
//       <Sidebar />

//       {/* Main Content */}
//       <main className="flex-1 p-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 ml-[80px] md:ml-[250px] transition-all duration-300">
//         {clothes.map((item) => (
//           <motion.div
//             key={item.id}
//             whileHover={{ scale: 1.05 }}
//             whileTap={{ scale: 0.95 }}
//             className="relative w-60 h-80 bg-white/10 p-4 rounded-xl shadow-lg border border-gray-700 overflow-hidden cursor-pointer backdrop-blur-lg"
//           >
//             <Tilt tiltMaxAngleX={10} tiltMaxAngleY={10} scale={1.05}>
//               <Link href={`/clothes/${item.id}`}>
//                 <div className="flex flex-col items-center">
//                   <Image
//                     src={item.image}
//                     alt={item.name}
//                     width={240}
//                     height={320}
//                     className="w-full h-56 object-cover rounded-lg transition-transform duration-300"
//                   />
//                   <h3 className="text-white text-center mt-4 text-lg font-semibold">
//                     {item.name}
//                   </h3>
//                 </div>
//               </Link>
//             </Tilt>
//           </motion.div>
//         ))}
//       </main>
//     </div>
//   );
// };

// export default MainPage;
"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import Tilt from "react-parallax-tilt";
import Sidebar from "@/components/Sidebar";

const clothes = [
  { id: 1, name: "Round-neck T-shirt (Full Texture)", image: "/Cricket.png" },
  {
    id: 2,
    name: "Collar T-Shirt",
    image: "/pngegg (3).png",
  },
  {
    id: 3,
    name: "Round-neck T-shirt (Female)",
    image: "/—Pngtree—white female tshirt mockup realistic_15402599.png",
  },
  {
    id: 4,
    name: "Hoodie",
    image: "/—Pngtree—black blank hoodie template mockup_15965032.png",
  },
  {
    id: 5,
    name: "Round-neck T-shirt (Logo Texture)",
    image: "/tshirt_full_design (25).png",
  },
  {
    id: 6,
    name: "Jacket",
    image: "/vecteezy_ai-generated-white-jacket-floating-isolated_35277011.png",
  },
  { id: 7, name: "Long Sleeve", image: "/pngegg (4).png" },
  { id: 8, name: "Collar-neck T-shirt (Female)", image: "/pngegg (2).png" },
];

const MainPage = () => {
  return (
    <div className="flex h-screen w-full bg-gradient-to-br from-blue-900 via-cyan-600 to-purple-600 relative overflow-hidden">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <main className="flex-1 p-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 ml-[80px] md:ml-[250px] transition-all duration-300">
        {clothes.map((item) => (
          <motion.div
            key={item.id}
            className="relative w-60 h-80 bg-white/10 p-4 rounded-xl shadow-lg border border-gray-700 overflow-hidden cursor-pointer backdrop-blur-lg"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onMouseMove={(e) => {
              const card = e.currentTarget;
              const { left, top, width, height } = card.getBoundingClientRect();
              const x = ((e.clientX - left) / width) * 100;
              const y = ((e.clientY - top) / height) * 100;
              card.style.setProperty("--x", `${x}%`);
              card.style.setProperty("--y", `${y}%`);
            }}
          >
            <Tilt tiltMaxAngleX={10} tiltMaxAngleY={10} scale={1.05}>
              <Link href={`/clothes/${item.id}`}>
                <div className="flex flex-col items-center relative">
                  <Image
                    src={item.image}
                    alt={item.name}
                    width={240}
                    height={320}
                    className="w-full h-56 object-cover rounded-lg transition-transform duration-300"
                  />
                  <h3 className="text-gray-900 text-center mt-4 text-lg font-semibold">
                    {item.name}
                  </h3>
                  <div
                    className="absolute inset-0 border-2 border-transparent rounded-xl"
                    style={{
                      background: `radial-gradient(circle at var(--x, 50%) var(--y, 50%), rgba(255, 255, 255, 0.3), transparent 60%)`,
                    }}
                  ></div>
                </div>
              </Link>
            </Tilt>
          </motion.div>
        ))}
      </main>
    </div>
  );
};

export default MainPage;
