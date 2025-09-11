import { Router } from "express";
import foundationsRoute from "./foundations.route";
import componentsRoute from "./components.route";
const apiRoute = Router();

apiRoute.use("/foundations", foundationsRoute);
apiRoute.use("/components", componentsRoute);

export default apiRoute;
