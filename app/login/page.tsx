// "use client";
// import { signIn, useSession } from "next-auth/react";
// import { useRouter } from "next/navigation";
// import { useEffect } from "react";
// import { motion } from "framer-motion";

// const LoginPage = () => {
//   const { data: session, status } = useSession();
//   const router = useRouter();

//   useEffect(() => {
//     if (status === "authenticated") {
//       router.push("/checkout"); // Redirect to checkout if logged in
//     }
//   }, [status, router]);

// export default function SignIn() {
//   return (
//     <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-900 via-cyan-600 to-black text-white">
//       <motion.div
//         className="bg-opacity-90 bg-gray-900 p-8 rounded-xl shadow-2xl w-full max-w-sm text-center border border-cyan-400/50"
//         initial={{ opacity: 0, scale: 0.8 }}
//         animate={{ opacity: 1, scale: 1 }}
//         transition={{ duration: 0.5 }}
//       >
//         <h2 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 via-green-400 to-lime-400 bg-clip-text text-transparent mb-6">
//           Welcome Back
//         </h2>

//         <motion.button
//           onClick={() => signIn("google")}
//           className="w-full px-6 py-3 mb-4 rounded-lg font-semibold bg-red-500 hover:bg-red-600 text-white shadow-lg transition-all duration-300 active:scale-95"
//           whileHover={{ scale: 1.05 }}
//           whileTap={{ scale: 0.95 }}
//         >
//           Sign in with Google
//         </motion.button>

//         <motion.button
//           onClick={() => signIn("github")}
//           className="w-full px-6 py-3 rounded-lg font-semibold bg-gray-800 hover:bg-gray-900 text-white shadow-lg transition-all duration-300 active:scale-95"
//           whileHover={{ scale: 1.05 }}
//           whileTap={{ scale: 0.95 }}
//         >
//           Sign in with GitHub
//         </motion.button>
//       </motion.div>
//     </div>
//   );
// }
// }
"use client";

import BackgroundPaths from "@/components/BackgroundPath";
import { motion } from "framer-motion";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function SignIn() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "authenticated") {
      router.push("/checkout"); // Redirect to checkout if logged in
    }
  }, [status, router]);

  return (
    <div className="relative w-full h-screen bg-gradient-to-r from-blue-900 via-cyan-600 to-black flex flex-col items-center text-center">
      <BackgroundPaths />
      <motion.div
        className="bg-opacity-90 bg-gray-900 p-8 rounded-xl shadow-2xl w-full max-w-sm text-center border border-cyan-400/50 mt-50 z-10"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 via-green-400 to-lime-400 bg-clip-text text-transparent mb-6">
          Welcome Back
        </h2>

        <motion.button
          onClick={() => signIn("google")}
          className="w-full px-6 py-3 mb-4 rounded-lg font-semibold bg-red-500 hover:bg-red-600 text-white shadow-lg transition-all duration-300 active:scale-95"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Sign in with Google
        </motion.button>

        <motion.button
          onClick={() => signIn("github")}
          className="w-full px-6 py-3 rounded-lg font-semibold bg-gray-800 hover:bg-gray-900 text-white shadow-lg transition-all duration-300 active:scale-95"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Sign in with GitHub
        </motion.button>
      </motion.div>
    </div>
  );
}
