import { existsSync, mkdirSync, writeFileSync } from "node:fs";
import {
  APP_STATIC_DIR,
  APP_STATIC_FOUNDATIONS_DIR,
} from "../consts/app.const";
import { AppError } from "../utils/error";
import FoundationColorModel, {
  BaseColorDocument,
} from "../db/models/foundation-color.model";
import { join } from "node:path";

const updateBaseColorStaticFile = (baseColor: BaseColorDocument) => {
  try {
    if (!existsSync(APP_STATIC_DIR)) {
      mkdirSync(APP_STATIC_DIR);
    }
    const destFilePath = join(
      APP_STATIC_DIR,
      APP_STATIC_FOUNDATIONS_DIR,
      "base-color.json"
    );
    writeFileSync(destFilePath, JSON.stringify(baseColor), {
      encoding: "utf-8",
    });
  } catch (err) {
    throw err;
  }
};

export const updateFoundationColor: AppController = async (req, res) => {
  const { baseColor } = req.body ?? { baseColor: null };
  if (!baseColor) {
    throw new AppError("Invalid 'color' body data.", "BAD_REQUEST");
  }
  try {
    const isInvalidPayload = new FoundationColorModel({
      baseColor,
    }).validateSync();

    if (isInvalidPayload) {
      throw new AppError(isInvalidPayload.message, "BAD_REQUEST");
    }

    await FoundationColorModel.findOneAndUpdate(
      {
        _id: "foundation-color",
      },
      { $set: baseColor, $setOnInsert: { _id: "foundation-color" } },
      { upsert: true }
    );

    updateBaseColorStaticFile(baseColor);
    return res.json({ isError: false });
  } catch (err) {
    console.error(err);
    throw err;
  }
};
