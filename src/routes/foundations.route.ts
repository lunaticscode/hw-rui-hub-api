import { Router } from "express";
import { updateFoundationColor } from "../controllers/foundations.controller";

const foundationsRoute = Router();

foundationsRoute.put("/color", updateFoundationColor);

export default foundationsRoute;
