import React from "react";

const EmbedPreviewLight: React.FC = () => {
  return (
    <div className="flex justify-center items-center w-full h-screen">
      <iframe
        id="embed-preview-iframe"
        loading="eager"
        src="https://embed.pickaxeproject.com/axe?id=StyloSmith_1Q6RQ&mode=embed_gold&host=beta&theme=light&opacity=100&font_header=Real+Head+Pro&size_header=30&font_body=Real+Head+Pro&size_body=16&font_labels=Real+Head+Pro&size_labels=14&font_button=Real+Head+Pro&size_button=16&c_fb=FFFFFF&c_ff=FFFFFF&c_fbd=888888&c_rb=FFFFFF&c_bb=228DD7&c_bt=FFFFFF&c_t=000000&s_ffo=100&s_rbo=100&s_bbo=100&s_f=minimalist&s_b=filled&s_t=1&s_to=1&s_r=2"
        width="100%"
        height="500px"
        className="transition hover:translate-y-[-2px] hover:shadow-[0_6px_20px_0px_rgba(0,0,0,0.15)] border border-black rounded-md max-w-[700px]"
        style={{ transition: ".3s" }}
        frameBorder="0"
      ></iframe>
    </div>
  );
};

export default EmbedPreviewLight;
