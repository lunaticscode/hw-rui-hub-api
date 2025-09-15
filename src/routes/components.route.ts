import { Router } from "express";
import {
  updateComponentPromptMetadataController,
  updateOperationStatusController,
} from "../controllers/components.controller";

const componentsRoute = Router();

componentsRoute.patch(
  "/operation-status",
  /** +) admin validation middleware */
  updateOperationStatusController
);
componentsRoute.put(
  "/prompt-metadata",
  /** +) admin validation middleware */
  updateComponentPromptMetadataController
);

export default componentsRoute;
