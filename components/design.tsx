"use client";

import React from "react";

const IframePage = () => {
  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="shadow-lg rounded-lg overflow-hidden border border-gray-300">
        <iframe
          src="https://faizanshaikh1-augmentedreality.hf.space"
          frameBorder="0"
          width="850"
          height="450"
          className="w-[850px] h-[450px]"
        ></iframe>
      </div>
    </div>
  );
};

export default IframePage;
