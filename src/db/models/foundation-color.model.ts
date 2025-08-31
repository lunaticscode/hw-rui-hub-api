import { model, Schema, InferSchemaType } from "mongoose";
import { FOUNDATION_COLOR_IMMUTABLE_COLLECTION_ID } from "../../consts/db.const";

const HEX_REGEX = /^#([0-9a-fA-F]{6}|[0-9a-fA-F]{3})$/;

const ColorScaleSchema = new Schema({
  "100": { type: String, required: true, match: HEX_REGEX },
  "200": { type: String, required: true, match: HEX_REGEX },
  "300": { type: String, required: true, match: HEX_REGEX },
  "400": { type: String, required: true, match: HEX_REGEX },
  "500": { type: String, required: true, match: HEX_REGEX },
  "600": { type: String, required: true, match: HEX_REGEX },
  "700": { type: String, required: true, match: HEX_REGEX },
  "800": { type: String, required: true, match: HEX_REGEX },
  "900": { type: String, required: true, match: HEX_REGEX },
});

export type BaseColorDocument = Record<
  string,
  InferSchemaType<typeof ColorScaleSchema>
>;

const FoundationColorSchema = new Schema(
  {
    _id: {
      type: String,
      default: FOUNDATION_COLOR_IMMUTABLE_COLLECTION_ID,
      immutable: true,
    },
    baseColor: {
      type: Map,
      of: ColorScaleSchema,
      default: {},
    },
    primaryColors: [String],
  },
  {
    timestamps: {
      updatedAt: true,
      createdAt: true,
    },
    minimize: true,
  }
);

const FoundationColorModel = model("Foundation-Color", FoundationColorSchema);
export default FoundationColorModel;
