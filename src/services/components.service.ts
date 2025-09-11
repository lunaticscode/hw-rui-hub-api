import { COMPONENT_OPERATION_STATUS_IMMUTABLE_COLLECTION_ID } from "../consts/db.const";
import ComponentOperationStatusModel, {
  ComponentOperationStatusFields,
} from "../db/models/component-operation-status.model";
import { AppError } from "../utils/error";

export const updateOperationStatus = async (
  data: ComponentOperationStatusFields
) => {
  try {
    const isInvalidPayload = new ComponentOperationStatusModel({
      ...data,
    }).validateSync();

    if (isInvalidPayload) {
      throw new AppError(isInvalidPayload.message, "BAD_REQUEST");
    }

    await ComponentOperationStatusModel.updateOne(
      {
        _id: COMPONENT_OPERATION_STATUS_IMMUTABLE_COLLECTION_ID,
      },
      {
        $set: data,
        $setOnInsert: {
          _id: COMPONENT_OPERATION_STATUS_IMMUTABLE_COLLECTION_ID,
        },
      },
      { upsert: true }
    );
    return true;
  } catch (err) {
    throw err;
  }
};
