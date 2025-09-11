import { Schema, model, Document } from "mongoose";

export interface ComponentDetailFields {
  name: string;
  version: string;
  description: string;
  tags: string;
  dependencies?: Record<string, string>;
}

export interface ComponentDetailDocument
  extends Document,
    ComponentDetailFields {}

const ComponentDetailSchema = new Schema<ComponentDetailDocument>(
  {
    name: { type: String, required: true },
    version: { type: String, required: true },
    dependencies: { type: Map, of: String, default: {} },
  },
  { _id: false, timestamps: true }
);

export const FoundationComponentDetailModel = model<ComponentDetailDocument>(
  "Component-Detail",
  ComponentDetailSchema
);
