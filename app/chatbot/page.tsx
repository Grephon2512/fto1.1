"use client";

import { motion } from "framer-motion";

const EmbedPage = () => {
  return (
    <div className="relative w-full min-h-screen bg-gradient-to-r from-gray-900 via-cyan-800 to-black flex flex-col items-center text-center p-6">
      <motion.div
        className="bg-opacity-90 bg-gray-900 p-8 rounded-xl shadow-2xl w-full max-w-3xl text-center border border-cyan-400/50 mt-10 z-10"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-3xl font-bold bg-gradient-to-r from-cyan-400 via-green-400 to-lime-400 bg-clip-text text-transparent mb-6">
          Embedded Preview
        </h2>
        <p className="text-gray-400 mb-6">
          Experience the interactive tool below.
        </p>
        <div className="flex justify-center">
          <iframe
            id="embed-preview-iframe"
            loading="eager"
            src="https://embed.pickaxeproject.com/axe?id=StyloSmiths_RDY5N&mode=embed_gold&host=beta&theme=light&opacity=100&font_header=Real+Head+Pro&size_header=30&font_body=Real+Head+Pro&size_body=16&font_labels=Real+Head+Pro&size_labels=14&font_button=Real+Head+Pro&size_button=16&c_fb=FFFFFF&c_ff=FFFFFF&c_fbd=888888&c_rb=FFFFFF&c_bb=228DD7&c_bt=FFFFFF&c_t=000000&s_ffo=100&s_rbo=100&s_bbo=100&s_f=minimalist&s_b=filled&s_t=1&s_to=1&s_r=2"
            width="100%"
            height="500px"
            className="transition hover:translate-y-[-2px] hover:shadow-lg border border-black rounded-lg max-w-xl"
            frameBorder="0"
          ></iframe>
        </div>
      </motion.div>
    </div>
  );
};

export default EmbedPage;
