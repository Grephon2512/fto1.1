// import express from "express";
// import dotenv from "dotenv";
// import cors from "cors";
// import connectDB from "./config/db";
// import customizationRoutes from "./routes/customizationRoutes";

// import userRoutes from "./routes/userRoutes";

// // Add this line to use user routes


// dotenv.config();

// // Initialize Express
// const app = express();
// const PORT = process.env.PORT || 5000;

// // Middleware
// app.use(cors());
// app.use(express.json());
// app.use("/api/user", userRoutes);

// // Connect to Database
// connectDB();

// // Routes
// app.use("/api/customization", customizationRoutes);

// // Start Server
// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });






import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db";
import customizationRoutes from "./routes/customizationRoutes";
import userRoutes from "./routes/userRoutes";
import orderRoutes from "./routes/orderRoutes"; // Import Order Routes

dotenv.config();

// Initialize Express
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Connect to Database
connectDB().then(() => {
  console.log("MongoDB Connected");

  // Routes
  app.use("/api/user", userRoutes);
  app.use("/api/customization", customizationRoutes);
  app.use("/api/orders", orderRoutes); // Add Order Routes

  // Start Server
  app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
  });

}).catch((err) => {
  console.error("❌ MongoDB Connection Error:", err);
  process.exit(1); // Exit the process if DB connection fails
});
