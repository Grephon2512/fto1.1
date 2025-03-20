export const downloadTshirtDesign = (type: "full" | "logo" = "full") => {
    const canvas = document.querySelector("canvas"); // Select the canvas
    if (!canvas) {
      alert("No canvas found!");
      return;
    }
  
    // Set filename based on type
    const fileName = type === "logo" ? "tshirt_logo.png" : "tshirt_full_design.png";
  
    // Convert canvas to image
    const dataURL = canvas.toDataURL("image/png");
    const link = document.createElement("a");
  
    link.href = dataURL;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  
  // Define TypeScript type for the reader function
  export const reader = (file: File): Promise<string> =>
    new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.onload = () => resolve(fileReader.result as string);
      fileReader.onerror = reject;
      fileReader.readAsDataURL(file);
    });
  
  // Function to get a contrasting color based on background color
  export const getContrastingColor = (color: string): string => {
    const hex = color.replace("#", "");
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);
  
    const brightness = (r * 299 + g * 587 + b * 114) / 1000;
  
    return brightness > 128 ? "black" : "white";
  };
  