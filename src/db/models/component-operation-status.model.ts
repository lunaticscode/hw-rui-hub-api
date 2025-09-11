import { Schema, model, Document } from "mongoose";
import { COMPONENT_OPERATION_STATUS_IMMUTABLE_COLLECTION_ID } from "../../consts/db.const";

export interface ComponentOperationStatusFields {
  installable: string[];
}

export interface ComponentStatusDocument
  extends Document,
    ComponentOperationStatusFields {}

const ComponentOperationStatusSchema = new Schema<ComponentStatusDocument>(
  {
    _id: {
      type: String,
      default: COMPONENT_OPERATION_STATUS_IMMUTABLE_COLLECTION_ID,
      immutable: true,
    },
    installable: { type: [String] },
  },
  { timestamps: true }
);

const ComponentOperationStatusModel = model<ComponentStatusDocument>(
  "Component-Operation-Status",
  ComponentOperationStatusSchema
);
export default ComponentOperationStatusModel;
