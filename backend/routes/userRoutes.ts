// import express from "express";
// import { registerUser, loginUser, getUserProfile } from "../controllers/userController";

// const router = express.Router();

// // Register a new user
// router.post("/register", registerUser);

// // Login user
// router.post("/login", loginUser);

// // Get user profile
// router.get("/profile/:userId", getUserProfile);

// export default router;


import express from "express";
import { registerUser, loginUser, getUserProfile } from "../controllers/userController";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/profile/:userId", getUserProfile);

export default router;
