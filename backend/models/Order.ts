import mongoose, { Schema, Document } from "mongoose";

interface IOrder extends Document {
  userId: mongoose.Schema.Types.ObjectId;
  tShirtColor: string;
  textureImageUrl?: string;
  material: string;
  quantity: number;
  price: number;
  totalAmount: number;
  estimatedDeliveryDate: Date;
  createdAt: Date;
}

const OrderSchema = new Schema<IOrder>({
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  tShirtColor: { type: String, required: true },
  textureImageUrl: { type: String },
  material: { type: String, required: true },
  quantity: { type: Number, required: true },
  price: { type: Number, required: true },
  totalAmount: { type: Number, required: true },
  estimatedDeliveryDate: { type: Date, required: true },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model<IOrder>("Order", OrderSchema);
