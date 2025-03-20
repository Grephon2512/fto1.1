"use client";

import React from "react";

const IframePage = () => {
  return (
    <div className="w-screen h-screen flex justify-center items-center bg-gray-100">
      <iframe
        src="https://faizanshaikh1-augmentedreality.hf.space"
        frameBorder="0"
        className="w-full h-full"
      ></iframe>
    </div>
  );
};

export default IframePage;
