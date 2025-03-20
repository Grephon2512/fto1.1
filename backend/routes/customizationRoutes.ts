import express from "express";
import { saveCustomization, getCustomizations } from "../controllers/customizationController";

const router = express.Router();

// Save customization
router.post("/save", saveCustomization);

// Get all customizations
router.get("/", getCustomizations);

export default router;
