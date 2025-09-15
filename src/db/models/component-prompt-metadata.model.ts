import { Schema, SchemaTypes, model, Document } from "mongoose";
import { COMPONENT_PROMPT_METADATA_IMMUTABLE_COLLECTION_ID } from "../../consts/db.const";
const { String } = SchemaTypes;

export interface ComponentPromptMetadata {
  label: string;
  semantic_roles: string[];
  intents: string[];
  nlp_keywords: string[];
  layout_hints: string[];
}

export interface ComponentPromptMetadataDocumentFields {
  metadata: Record<string, ComponentPromptMetadata>;
}

export interface ComponentPromptMetadataDocument
  extends Document,
    ComponentPromptMetadataDocumentFields {}

export const ComponentMetadataSchema = new Schema<ComponentPromptMetadata>(
  {
    label: { type: String, required: true },
    semantic_roles: { type: [String], required: true },
    intents: { type: [String], required: true },
    nlp_keywords: { type: [String], required: true },
    layout_hints: { type: [String], required: true },
  },
  { _id: false } // value 객체는 _id 불필요
);

const ComponentPromptMetadataSchema =
  new Schema<ComponentPromptMetadataDocument>(
    {
      _id: {
        type: String,
        default: COMPONENT_PROMPT_METADATA_IMMUTABLE_COLLECTION_ID,
        immutable: true,
      },
      metadata: {
        type: Map,
        of: ComponentMetadataSchema,
        required: true,
      },
    },
    { _id: false, timestamps: true }
  );

const ComponentPromptMetadataModel = model<ComponentPromptMetadataDocument>(
  "Component-Prompt-Metadata",
  ComponentPromptMetadataSchema
);
export default ComponentPromptMetadataModel;
