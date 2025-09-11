import { Router } from "express";
import { updateFoundationColorController } from "../controllers/foundations.controller";

const foundationsRoute = Router();

foundationsRoute.put(
  "/color",
  /** +) admin validation middleware */
  updateFoundationColorController
);

export default foundationsRoute;
