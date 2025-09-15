import { join } from "path";
import { ComponentOperationStatusFields } from "../db/models/component-operation-status.model";
import {
  updateComponentPromptMetadata,
  updateOperationStatus,
} from "../services/components.service";
import { AppError } from "../utils/error";
import { APP_STATIC_COMPONENTS_DIR, APP_STATIC_DIR } from "../consts/app.const";
import { existsSync, mkdirSync, writeFileSync } from "fs";
import { ComponentPromptMetadata } from "../db/models/component-prompt-metadata.model";

const getComponentStaticFilePath = (filename: string) => {
  const componentsDir = join(APP_STATIC_DIR, APP_STATIC_COMPONENTS_DIR);
  if (!existsSync(componentsDir)) {
    mkdirSync(componentsDir, { recursive: true });
  }
  const destFilePath = join(componentsDir, filename);
  return destFilePath;
};

const generateStaticFile = (data: any, filename: string) => {
  try {
    const destFilePath = getComponentStaticFilePath(filename);
    writeFileSync(destFilePath, JSON.stringify(data), {
      encoding: "utf-8",
    });
  } catch (err) {}
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
      generateStaticFile(body, "operation-status.json");
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

export const updateComponentPromptMetadataController: AppController = async (
  req,
  res
) => {
  const body = (req.body as { metadata: ComponentPromptMetadata }) ?? {
    metdata: null,
  };
  if (!body || !body.metadata) {
    throw new AppError("Invalid 'metdata' body data.", "BAD_REQUEST");
  }
  try {
    const updateResult = await updateComponentPromptMetadata(body);
    if (updateResult) {
      generateStaticFile(body, "prompt-metadata,json");
      return res.json({ isError: false });
    } else {
      throw new AppError(
        "Occured update error at Prompt Metadata.",
        "UNKNOWN_ERROR"
      );
    }
  } catch (err) {}
};
