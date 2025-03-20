import { Request } from "express";

declare module "express" {
  export interface Request {
    user?: { id: string }; // Add the user object to Request
  }
}
