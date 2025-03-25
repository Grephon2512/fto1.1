// "use client";

// import { useState } from "react";
// import { motion } from "framer-motion";
// import { Home, Shirt, ShoppingCart, Settings, Menu, X } from "lucide-react";

// const Sidebar = () => {
//   const [isOpen, setIsOpen] = useState(true);

//   return (
//     <motion.div
//       initial={{ width: isOpen ? 250 : 80 }}
//       animate={{ width: isOpen ? 250 : 80 }}
//       transition={{ duration: 0.3 }}
//       className="fixed top-0 left-0 h-full bg-gradient-to-br from-blue-900 via-cyan-600 to-blue-900 shadow-lg p-4 flex flex-col justify-start gap-6 text-white overflow-hidden"
//     >
//       {/* Toggle Button */}
//       <div className="flex items-center justify-start gap-4">
//         <h1
//           className={`text-xl font-bold transition-opacity ${
//             isOpen ? "opacity-100" : "opacity-0 hidden"
//           }`}
//         >
//           StyleSync
//         </h1>
//         <button
//           onClick={() => setIsOpen(!isOpen)}
//           className="p-2 bg-white/20 rounded-full hover:bg-white/30 transition-all"
//         >
//           {isOpen ? <X size={20} /> : <Menu size={20} />}
//         </button>
//       </div>

//       {/* Navigation Links */}
//       <nav className="flex flex-col gap-5 mt-4">
//         {[
//           { icon: <Home size={24} />, label: "Home" },
//           { icon: <Shirt size={24} />, label: "Clothing" },
//           { icon: <ShoppingCart size={24} />, label: "Cart" },
//           { icon: <Settings size={24} />, label: "Settings" },
//         ].map((item, index) => (
//           <motion.div
//             key={index}
//             className="flex items-center gap-4 p-3 rounded-lg cursor-pointer hover:bg-white/20 transition-all"
//             whileHover={{ scale: 1.1 }}
//           >
//             {item.icon}
//             <span
//               className={`text-lg font-medium transition-opacity ${
//                 isOpen ? "opacity-100" : "opacity-0 hidden"
//               }`}
//             >
//               {item.label}
//             </span>
//           </motion.div>
//         ))}
//       </nav>
//     </motion.div>
//   );
// };

// export default Sidebar;

import Link from "next/link";
import { motion } from "framer-motion";
import {
  Home,
  Shirt,
  ShoppingCart,
  Settings,
  Menu,
  X,
  BookOpen,
  Info,
  Paintbrush,
  Glasses,
  Headset,
  HeadsetIcon,
  View,
  Laptop,
  Bot,
  Sparkles,
} from "lucide-react";
import { useState } from "react";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <motion.div
      initial={{ width: isOpen ? 250 : 80 }}
      animate={{ width: isOpen ? 250 : 80 }}
      transition={{ duration: 0.3 }}
      className="fixed top-0 left-0 h-full bg-gradient-to-br from-blue-900 via-cyan-600 to-blue-900 shadow-lg p-4 flex flex-col justify-start gap-6 text-white overflow-hidden"
    >
      {/* Toggle Button */}
      <div className="flex items-center justify-start gap-4">
        <h1
          className={`text-xl font-bold transition-opacity ${
            isOpen ? "opacity-100" : "opacity-0 hidden"
          }`}
        >
          StyleSync
        </h1>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="p-2 bg-white/20 rounded-full hover:bg-white/30 transition-all"
        >
          {isOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Navigation Links */}
      <nav className="flex flex-col gap-5 mt-4">
        {[
          { icon: <Home size={24} />, label: "Home", href: "/" },
          { icon: <Info size={24} />, label: "About us", href: "/about" },
          { icon: <Paintbrush size={24} />, label: "Design", href: "/iframe" },
          {
            icon: <BookOpen size={24} />,
            label: "Tutorial",
            href: "/video",
          },
          {
            icon: <Laptop size={24} />,
            label: "VR Try On",
            href: "http://127.0.0.1:7860/",
          },
          {
            icon: <Sparkles size={24} />,
            label: "AR TryOn",
            href: "http://127.0.0.1:5000/",
          },
          {
            icon: <Bot size={24} />,
            label: "Chatbot",
            href: "/chatbot",
          },
        ].map((item, index) => (
          <Link key={index} href={item.href} passHref>
            <motion.div
              className="flex items-center gap-4 p-3 rounded-lg cursor-pointer hover:bg-white/20 transition-all"
              whileHover={{ scale: 1.1 }}
            >
              {item.icon}
              <span
                className={`text-lg font-medium transition-opacity ${
                  isOpen ? "opacity-100" : "opacity-0 hidden"
                }`}
              >
                {item.label}
              </span>
            </motion.div>
          </Link>
        ))}
      </nav>
    </motion.div>
  );
};

export default Sidebar;
