/************************ */

import {
  getModelForClass,
  index,
  prop,
  Ref,
} from "@typegoose/typegoose";
import { PaginatedModel } from "../common/pagination/pagination_configuration";
import { Clinic } from "./clinic.model";
import { Country } from "./country.model";
import { States } from "./state.model";
@index({ city: "text" })
export class ClinicLocation extends PaginatedModel {
  @prop({ type: String, default: null })
  city!: string;

  @prop({ type: String, default: null })
  email!: string;

  @prop({ type: String, default: null })
  npiNo!: string;

  @prop({ type: String, default: null })
  fed_id!: string;

  @prop({ type: String, default: null })
  address!: string;

  @prop({ type: String, default: null })
  taxonomy!: string;

  @prop({ type: Boolean, default: true })
  isActive!: boolean;

  @prop({ type: Boolean, default: false })
  isDeleted!: boolean;

  @prop({ ref: Clinic, default: null })
  clinic_id!: Ref<Clinic> | null;

  @prop({ type: String, default: null })
  branchName!: string;

  @prop({ type: String, default: null })
  mobile_other!: string;

  @prop({ type: String, default: null })
  postal_code!: string;

  @prop({ ref: "States", default: null })
  state!: Ref<States> | null;

  @prop({ ref: "Country", default: null })
  country!: Ref<Country> | null;

  @prop({ type: String, default: null })
  office!: string;

  @prop({ type: String, default: null })
  fax!: string;

  // @prop({ type: String, default: null })
  // loc!: string;

  // @prop({ type: String, default: null })
  // CLIA!: string;
}
const CLINIC_LOCATION_DB_MODEL = getModelForClass(
  ClinicLocation,
  {
    schemaOptions: {
      collection: "clinic_locations",
      timestamps: true,
    },
  }
);
export default CLINIC_LOCATION_DB_MODEL;
