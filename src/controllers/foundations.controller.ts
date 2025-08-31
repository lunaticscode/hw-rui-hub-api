import { existsSync, mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import {
  APP_STATIC_DIR,
  APP_STATIC_FOUNDATIONS_DIR,
} from "../consts/app.const";
import { AppError } from "../utils/error";
import { BaseColorDocument } from "../db/models/foundation-color.model";
import { updateFoundationColor } from "../services/foundations.service";

const updateBaseColorStaticFile = (baseColor: BaseColorDocument) => {
  try {
    const foundationsDir = join(APP_STATIC_DIR, APP_STATIC_FOUNDATIONS_DIR);
    if (!existsSync(foundationsDir)) {
      mkdirSync(foundationsDir, { recursive: true });
    }
    const destFilePath = join(foundationsDir, "base-color.json");
    writeFileSync(destFilePath, JSON.stringify(baseColor), {
      encoding: "utf-8",
    });
  } catch (err) {
    throw err;
  }
};

export const updateFoundationColorController: AppController = async (
  req,
  res
) => {
  const { baseColor } = req.body ?? { baseColor: null };
  if (!baseColor) {
    throw new AppError("Invalid 'color' body data.", "BAD_REQUEST");
  }
  try {
    updateFoundationColor(baseColor);
    updateBaseColorStaticFile(baseColor);
    return res.json({ isError: false });
  } catch (err) {
    console.error(err);
    throw err;
  }
};
