// // import express from "express";
// // import { createOrder, getUserOrders } from "../controllers/orderController";
// // import { authenticateUser } from "../middlewares/authMiddleware"; 

// // const router = express.Router();

// // // Create an order
// // router.post("/create", authenticateUser, createOrder);

// // // Get all orders for a user
// // router.get("/user-orders", authenticateUser, getUserOrders);

// // export default router;



// import { Request, Response, NextFunction } from "express";
// import jwt from "jsonwebtoken";
// import User from "../models/User";

// export interface AuthRequest extends Request {
//   user?: { id: string }; // Extend Request to include user data
// }

// export const authenticateUser = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
//   try {
//     const token = req.header("Authorization")?.replace("Bearer ", "");
//     if (!token) {
//       res.status(401).json({ message: "Unauthorized: No token provided" });
//       return; // ✅ Ensure function exits
//     }

//     const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as { userId: string };

//     // Attach user info to request
//     req.user = { id: decoded.userId };

//     next(); // ✅ Call next() only if successful
//   } catch (error) {
//     res.status(401).json({ message: "Unauthorized: Invalid token" });
//     return; // ✅ Ensure function exits
//   }
// };




import express from "express";
import { createOrder, getUserOrders } from "../controllers/orderController";
import { authenticateUser } from "../middlewares/authMiddleware"; 

const router = express.Router();

// Create an order
router.post("/create", authenticateUser, createOrder);

// Get all orders for a user
router.get("/user-orders", authenticateUser, getUserOrders);

export default router; // ✅ Default export
