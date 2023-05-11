import {
  getModelForClass,
  index,
  prop,
} from "@typegoose/typegoose";
import { PaginatedModel } from "../common/pagination/pagination_configuration";

@index({ timezone: "text" })
export class Timezone extends PaginatedModel {
  @prop({ type: String, default: null })
  timezone!: string;

  @prop({ type: String, default: null })
  code!: string;

  @prop({ type: Boolean, default: false })
  isDeleted!: boolean;

  @prop({ type: Boolean, default: true })
  isActive!: boolean;
}

const TIMEZONE_DB_MODEL = getModelForClass(Timezone, {
  schemaOptions: {
    collection: "timezone",
    timestamps: true,
  },
});

export default TIMEZONE_DB_MODEL;
