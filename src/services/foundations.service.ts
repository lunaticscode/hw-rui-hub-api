import FoundationColorModel, {
  BaseColorDocument,
} from "../db/models/foundation-color.model";
import { AppError } from "../utils/error";

export const updateFoundationColor = async (baseColor: BaseColorDocument) => {
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
    return true;
  } catch (err) {
    throw err;
  }
};
