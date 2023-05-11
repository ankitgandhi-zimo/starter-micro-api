import {
  getModelForClass,
  index,
  prop,
  Ref,
} from "@typegoose/typegoose";
import { PaginatedModel } from "../../common/pagination/pagination_configuration";
import { Clinic } from "../clinic.model";
import { User } from "../user.model";

@index({ companyName: "text" })
export class InsuranceCompany extends PaginatedModel {
  @prop({ type: String, default: null })
  companyName!: string;
  @prop({ type: String, default: null })
  mobile_number!: string;

  @prop({ type: String, default: null })
  address!: string;

  @prop({ type: String, default: null })
  city!: string;

  @prop({ type: String, default: null })
  payer_id!: string;

  @prop({ type: String, default: null })
  state!: string;

  @prop({ type: String, default: null })
  country!: string;

  @prop({ type: String, default: null })
  postalCode!: string;

  @prop({ type: String, default: null })
  notes!: string;

  @prop({ ref: Clinic, default: null })
  clinic_id!: Ref<Clinic> | null;

  @prop({ type: Boolean, default: false })
  isDeleted!: boolean;

  @prop({ type: Boolean, default: true })
  isActive!: boolean;

  @prop({ ref: "User" })
  createdby_id!: Ref<User> | null;
}

const INSURANCE_COMPANIES_DB_MODEL = getModelForClass(
  InsuranceCompany,
  {
    schemaOptions: {
      collection: "insurance_companies",
      timestamps: true,
    },
  }
);

export default INSURANCE_COMPANIES_DB_MODEL;
