import { Request, Response } from "express";
import Customization from "../models/Customization";

// Save a new customization
export const saveCustomization = async (req: Request, res: Response) => {
  try {
    const customization = new Customization(req.body);
    await customization.save();
    res.status(201).json(customization);
  } catch (error) {
    res.status(500).json({ message: "Error saving customization", error });
  }
};

// Get all customizations
export const getCustomizations = async (req: Request, res: Response) => {
  try {
    const customizations = await Customization.find();
    res.status(200).json(customizations);
  } catch (error) {
    res.status(500).json({ message: "Error fetching customizations", error });
  }
};
