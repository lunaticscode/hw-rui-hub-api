import { Router } from "express";
import foundationsRoute from "./foundations.route";
const apiRoute = Router();

apiRoute.use("/foundations", foundationsRoute);
export default apiRoute;
