import { Schema, model, Document } from "mongoose";
const ComponentTypes = [
  "button",
  "accordion",
  "calendar",
  "carousel",
  "select",
  "tabs",
  "toast",
] as const;

export interface ComponentDetailDocument extends Document {
  name: (typeof ComponentTypes)[number];
  version: string;
  dependencies?: Record<string, string>;
}

const ComponentDetailSchema = new Schema<ComponentDetailDocument>(
  {
    name: { type: String, required: true, enum: ComponentTypes },
    version: { type: String, required: true },
    dependencies: { type: Map, of: String, default: {} },
  },
  { _id: false, timestamps: true }
);

export const FoundationComponentDetailModel = model<ComponentDetailDocument>(
  "Foundation-Component-Detail",
  ComponentDetailSchema
);
