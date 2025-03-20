// // import { Request, Response } from "express";
// // import Order from "../models/Order";

// // // Create an Order
// // export const createOrder = async (req: Request, res: Response) => {
// //   try {
// //     const { tShirtColor, textureImageUrl, material, quantity, price } = req.body;
// //     const userId = req.user.id; // Extracted from token (middleware)

// //     // Calculate total price
// //     const totalAmount = price * quantity;

// //     // Estimate delivery (let's assume 5 days from order)
// //     const estimatedDeliveryDate = new Date();
// //     estimatedDeliveryDate.setDate(estimatedDeliveryDate.getDate() + 5);

// //     // Create order
// //     const newOrder = new Order({
// //       userId,
// //       tShirtColor,
// //       textureImageUrl,
// //       material,
// //       quantity,
// //       price,
// //       totalAmount,
// //       estimatedDeliveryDate,
// //     });

// //     await newOrder.save();
// //     res.status(201).json({ message: "Order placed successfully!", order: newOrder });

// //   } catch (error) {
// //     res.status(500).json({ message: "Error placing order", error });
// //   }
// // };

// // // Get Order History for a User
// // export const getUserOrders = async (req: Request, res: Response) => {
// //   try {
// //     const userId = req.user.id; // Extracted from token

// //     const orders = await Order.find({ userId }).sort({ createdAt: -1 });

// //     res.json({ orders });
// //   } catch (error) {
// //     res.status(500).json({ message: "Error fetching orders", error });
// //   }
// // };









// import { Request, Response } from "express";
// import Order from "../models/Order";

// // Create an Order
// export const createOrder = async (req: Request, res: Response) => {
//   try {
//     if (!req.user || !req.user.id) {
//       return res.status(401).json({ message: "Unauthorized: No user data found" });
//     }

//     const { tShirtColor, textureImageUrl, material, quantity, price } = req.body;
//     const userId = req.user.id; // Now TypeScript knows `userId` is defined

//     // Calculate total price
//     const totalAmount = price * quantity;

//     // Estimate delivery (let's assume 5 days from order)
//     const estimatedDeliveryDate = new Date();
//     estimatedDeliveryDate.setDate(estimatedDeliveryDate.getDate() + 5);

//     // Create order
//     const newOrder = new Order({
//       userId,
//       tShirtColor,
//       textureImageUrl,
//       material,
//       quantity,
//       price,
//       totalAmount,
//       estimatedDeliveryDate,
//     });

//     await newOrder.save();
//     res.status(201).json({ message: "Order placed successfully!", order: newOrder });

//   } catch (error) {
//     res.status(500).json({ message: "Error placing order", error });
//   }
// };

// // Get Order History for a User
// export const getUserOrders = async (req: Request, res: Response) => {
//   try {
//     if (!req.user || !req.user.id) {
//       return res.status(401).json({ message: "Unauthorized: No user data found" });
//     }

//     const userId = req.user.id;

//     const orders = await Order.find({ userId }).sort({ createdAt: -1 });

//     res.json({ orders });
//   } catch (error) {
//     res.status(500).json({ message: "Error fetching orders", error });
//   }
// };






import { Request, Response } from "express";
import Order from "../models/Order"; // Assuming Order model exists

export const createOrder = async (req: Request, res: Response): Promise<void> => {
  try {
    const { items, totalPrice } = req.body;
    const userId = (req as any).user?.id; // ✅ Fix TypeScript error for `req.user`

    if (!userId) {
      res.status(401).json({ message: "Unauthorized: No user found" });
      return;
    }

    const newOrder = new Order({
      user: userId,
      items,
      totalPrice,
    });

    await newOrder.save();

    res.status(201).json({ message: "Order created successfully", order: newOrder });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

export const getUserOrders = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = (req as any).user?.id; // ✅ Fix TypeScript error for `req.user`

    if (!userId) {
      res.status(401).json({ message: "Unauthorized: No user found" });
      return;
    }

    const orders = await Order.find({ user: userId });

    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};
