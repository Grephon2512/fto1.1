import mongoose from "mongoose";

const DesignSchema = new mongoose.Schema({
  userEmail: { type: String, required: true },
  color: { type: String, required: true },
  texture: { type: String, required: true },
  material: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const Design = mongoose.models.Design || mongoose.model("Design", DesignSchema);
export default Design;
