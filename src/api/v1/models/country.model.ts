import {
  getModelForClass,
  index,
  prop,
} from "@typegoose/typegoose";
import { PaginatedModel } from "../common/pagination/pagination_configuration";

@index({ countryName: "text" })
export class Country extends PaginatedModel {
  @prop({ type: String, default: null })
  countryName!: string;

  @prop({ type: String, default: null })
  countryCode!: string;

  @prop({ type: Boolean, default: false })
  isDeleted!: boolean;

  @prop({ type: Boolean, default: true })
  isActive!: boolean;
}

const COUNTRY_DB_MODEL = getModelForClass(Country, {
  schemaOptions: {
    collection: "countries",
    timestamps: true,
  },
});

export default COUNTRY_DB_MODEL;
