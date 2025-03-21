import React from "react";

const TryOnInterface: React.FC = () => {
  return (
    <div className="w-screen h-screen">
      {/* Replace the src value with your Gradio app URL */}
      <iframe
        src="http://127.0.0.1:7860/"
        className="w-full h-full border-none"
      ></iframe>
    </div>
  );
};

export default TryOnInterface;
