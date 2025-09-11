import { Schema, SchemaTypes, model, Document } from "mongoose";

import { COMPONENT_OPERATION_STATUS_IMMUTABLE_COLLECTION_ID } from "../../consts/db.const";

export interface ComponentOperationStatusFields {
  installable: Record<string, boolean>;
}

export interface ComponentStatusDocument
  extends Document,
    ComponentOperationStatusFields {}

const { Map, Boolean } = SchemaTypes;
const ComponentOperationStatusSchema = new Schema<ComponentStatusDocument>(
  {
    _id: {
      type: String,
      default: COMPONENT_OPERATION_STATUS_IMMUTABLE_COLLECTION_ID,
      immutable: true,
    },
    installable: { type: Map, of: Boolean, default: {} },
  },
  { timestamps: true }
);

const ComponentOperationStatusModel = model<ComponentStatusDocument>(
  "Component-Operation-Status",
  ComponentOperationStatusSchema
);
export default ComponentOperationStatusModel;
