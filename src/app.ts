import express from "express";
import helmet from "helmet";
import { rateLimit } from "express-rate-limit";
import compression from "compression";
import { APP_PORT } from "./consts/app.const";
import errorMiddleware from "./middlewares/error.middleware";
import { dbConnect } from "./db/client";
import apiRoute from "./routes";
import userAgentMiddleware from "./middlewares/userAgent.middleware";

const rateLiimter = rateLimit({
  windowMs: 60 * 1000,
  limit: 45, // each IP to 45 requests per 1 min
});

const app = express();
if (process.env.NODE_ENV !== "production") {
  app.use((_, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "http://localhost:5173");
    res.setHeader("Access-Control-Allow-Methods", "GET, PUT");
    res.setHeader(
      "Access-Control-Allow-Headers",
      "Content-Type, Authorization"
    );
    next();
  });
}
app.use(helmet());
app.use(rateLiimter);
app.use(userAgentMiddleware());
app.use(express.static("public", { dotfiles: "ignore", etag: true }));
app.use(express.json());
app.use(compression());

app.use("/api", apiRoute);

app.use(errorMiddleware);

app.listen(APP_PORT, () => {
  dbConnect();
  console.log(`✅[express] Express running on ${APP_PORT}.`);
});
