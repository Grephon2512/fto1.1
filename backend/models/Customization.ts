import mongoose, { Schema, Document } from "mongoose";

// Define the interface for TypeScript
interface ICustomization extends Document {
  userId: string;
  tShirtColor: string;
  textureImage: string;
  material: "cotton" | "leather" | "metallic" | "glowing";
  texturePosition: { x: number; y: number };
  quantity: number;
  price: number;
  estimatedShippingDate: Date;
  createdAt: Date;
}

// Define the schema
const CustomizationSchema = new Schema<ICustomization>({
  userId: { type: String, required: true },
  tShirtColor: { type: String, required: true },
  textureImage: { type: String, required: false }, // Optional
  material: { type: String, enum: ["cotton", "leather", "metallic", "glowing"], required: true },
  texturePosition: { 
    x: { type: Number, required: true },
    y: { type: Number, required: true },
  },
  quantity: { type: Number, required: true, default: 1 },
  price: { type: Number, required: true },
  estimatedShippingDate: { type: Date, required: true },
  createdAt: { type: Date, default: Date.now },
});

// Export the model
const Customization = mongoose.models.Customization || mongoose.model<ICustomization>("Customization", CustomizationSchema);
export default Customization;
