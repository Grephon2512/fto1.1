import jwt from "jsonwebtoken";

const SECRET_KEY = process.env.JWT_SECRET || "your_secret_key"; // Store in .env

export const generateToken = (userId: string) => {
  return jwt.sign({ userId }, SECRET_KEY, { expiresIn: "7d" }); // Expires in 7 days
};

export const verifyToken = (token: string) => {
  try {
    return jwt.verify(token, SECRET_KEY);
  } catch (error) {
    return null;
  }
};
