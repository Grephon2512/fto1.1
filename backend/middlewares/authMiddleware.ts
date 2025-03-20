// import { Request, Response, NextFunction } from "express";
// import jwt from "jsonwebtoken";

// interface AuthRequest extends Request {
//   user?: any;
// }

// export const authenticateUser = (req: AuthRequest, res: Response, next: NextFunction) => {
//   const token = req.header("Authorization")?.split(" ")[1];

//   if (!token) {
//     return res.status(401).json({ message: "Access denied. No token provided." });
//   }

//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
//     req.user = decoded;
//     next();
//   } catch (error) {
//     res.status(400).json({ message: "Invalid token." });
//   }
// };





import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

interface AuthRequest extends Request {
  user?: { id: string }; // Ensure `user` contains only `id`
}

export const authenticateUser = (req: AuthRequest, res: Response, next: NextFunction): void => {
  const token = req.header("Authorization")?.split(" ")[1];

  if (!token) {
    res.status(401).json({ message: "Access denied. No token provided." });
    return; // ✅ Ensures the function exits
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as { userId: string };
    req.user = { id: decoded.userId };
    next(); // ✅ Only call next() if successful
  } catch (error) {
    res.status(400).json({ message: "Invalid token." });
  }
};
