import { config } from "dotenv";
import { cwd } from "node:process";
import { join } from "node:path";
config();

const APP_PORT = process.env.APP_PORT ?? "8085";
const APP_STATIC_DIRNAME = "public";
const APP_STATIC_FOUNDATIONS_DIR = "foundations";
const APP_STATIC_COMPONENTS_DIR = "components";

const APP_STATIC_DIR = join(cwd(), APP_STATIC_DIRNAME);

export {
  APP_PORT,
  APP_STATIC_DIR,
  APP_STATIC_FOUNDATIONS_DIR,
  APP_STATIC_COMPONENTS_DIR,
};
