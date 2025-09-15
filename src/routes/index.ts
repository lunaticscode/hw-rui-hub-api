import { Router } from "express";
import foundationsRoute from "./foundations.route";
import componentsRoute from "./components.route";
const apiRoute = Router();

apiRoute.use(
  "/foundations",
  /** role: pm, designer  */
  foundationsRoute
);
apiRoute.use(
  "/components",
  /** role: pm, developer  */
  componentsRoute
);

export default apiRoute;
