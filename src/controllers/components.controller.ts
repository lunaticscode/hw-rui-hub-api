import { join } from "path";
import { ComponentOperationStatusFields } from "../db/models/component-operation-status.model";
import { updateOperationStatus } from "../services/components.service";
import { AppError } from "../utils/error";
import { APP_STATIC_COMPONENTS_DIR, APP_STATIC_DIR } from "../consts/app.const";
import { existsSync, mkdirSync, writeFileSync } from "fs";

const generateOperationStatusStaticFile = (
  data: ComponentOperationStatusFields
) => {
  try {
    const componentsDir = join(APP_STATIC_DIR, APP_STATIC_COMPONENTS_DIR);
    if (!existsSync(componentsDir)) {
      mkdirSync(componentsDir, { recursive: true });
    }
    const destFilePath = join(componentsDir, "operation-status.json");
    writeFileSync(destFilePath, JSON.stringify(data), {
      encoding: "utf-8",
    });
  } catch (err) {
    throw err;
  }
};

export const updateOperationStatusController: AppController = async (
  req,
  res
) => {
  const body = (req.body as ComponentOperationStatusFields) ?? {
    installable: null,
  };
  if (!body || !body.installable) {
    throw new AppError("Invalid 'installable' body.", "BAD_REQUEST");
  }
  try {
    const updateResult = await updateOperationStatus(body);
    if (updateResult) {
      generateOperationStatusStaticFile(body);
      return res.status(200).json({ isError: false });
    } else {
      throw new AppError(
        "Occured update error at Components operation status.",
        "UNKNOWN_ERROR"
      );
    }
  } catch (err) {
    throw err;
  }
};
