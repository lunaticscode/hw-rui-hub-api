import { Schema, model, Document } from "mongoose";
import { COMPONENT_STATUS_IMMUTABLE_COLLECTION_ID } from "../../consts/db.const";

export interface ComponentStatusDocument extends Document {
  description?: string;
  installable?: string[];
  package: string;
  version: string;
  downloadUrl: string;
}

const ComponentStatusSchema = new Schema<ComponentStatusDocument>(
  {
    _id: {
      type: String,
      default: COMPONENT_STATUS_IMMUTABLE_COLLECTION_ID,
      immutable: true,
    },
    description: { type: String },
    installable: { type: [String] },
    package: { type: String, required: true },
    version: { type: String, required: true },
    downloadUrl: { type: String, required: true },
  },
  { timestamps: true }
);

const ComponentListModel = model<ComponentStatusDocument>(
  "Component-Status",
  ComponentStatusSchema
);
export default ComponentListModel;
