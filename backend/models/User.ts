import mongoose, { Schema, Document } from "mongoose";

// Define user interface
interface IUser extends Document {
  username: string;
  email: string;
  password: string;
  createdAt: Date;
}

// Define the schema
const UserSchema = new Schema<IUser>({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

// Export the model
const User = mongoose.models.User || mongoose.model<IUser>("User", UserSchema);
export default User;
