import { Router } from "express";
import { updateOperationStatusController } from "../controllers/components.controller";

const componentsRoute = Router();

componentsRoute.patch(
  "/operation-status",
  /** +) admin validation middleware */
  updateOperationStatusController
);

export default componentsRoute;
