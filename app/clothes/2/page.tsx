"use client";

import { motion } from "framer-motion";

const ComingSoon = () => {
  return (
    <div className="relative w-full min-h-screen bg-gradient-to-r from-gray-900 via-cyan-800 to-black flex flex-col items-center text-center p-6">
      <motion.div
        className="bg-opacity-90 bg-gray-900 p-8 rounded-xl shadow-2xl w-full max-w-lg text-center border border-cyan-400/50 mt-10 z-10"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-3xl font-bold bg-gradient-to-r from-cyan-400 via-green-400 to-lime-400 bg-clip-text text-transparent mb-6">
          Coming Soon
        </h2>
        <p className="text-gray-400 mb-6">
          We are building something amazing. Stay tuned for updates!
        </p>

        <motion.button
          className="w-full bg-cyan-500 hover:bg-cyan-600 text-white p-3 rounded-lg shadow-lg transition-all duration-300 active:scale-95"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Notify Me
        </motion.button>
      </motion.div>
    </div>
  );
};

export default ComingSoon;
