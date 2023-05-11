import { getModelForClass, index, prop, Ref } from "@typegoose/typegoose";
import mongoose from "mongoose";
import { PaginatedModel } from "../../common/pagination/pagination_configuration";
import { Clinic } from "../clinic.model";
import { Country } from "../country.model";
import { CPTCodes } from "../cpt.model";
import { Patients } from "../patient.model";
import { States } from "../state.model";
import { InsuranceCompany } from "./insurance_companies.model";

export enum ECoverageValues {
  PRIMARY = "Primary",
  SECONDARY = "Secondary",
  TERTIARY = "Tertiary",
}

export enum EInsuranceTypeValues {
  HMO = "HMO",
  PPO = "PPO",
  EAP = "EAP",
  EPO = "EPO",
  UNKNOWN = "Unknown",
}

export enum ECopayValues {
  DOLLAR = "$",
  SLASHASTRIC = "/*",
  MODULE = "%",
  ASTRICSLASH = "*/",
}

class CopayObject {
  @prop({ type: Number, default: 0 })
  amount!: number;

  @prop({
    enum: ECopayValues,
    // type: String,
    default: ECopayValues.DOLLAR,
  })
  type!: string;
}

@index({ insurance_name: "text" })
export class Insurance extends PaginatedModel {
  @prop({ ref: "Clinic" })
  clinic_id!: Ref<Clinic> | null;

  @prop({ ref: "Patients" })
  patient_id!: Ref<Patients> | null;

  @prop({ ref: InsuranceCompany })
  insurance_company_id!: Ref<InsuranceCompany> | null;

  @prop({ type: mongoose.Types.ObjectId }) // ref can be clinic, patient, frontdesk
  createdby_id!: mongoose.Types.ObjectId;

  @prop({
    ref: "CPTCodes",
    type: [CPTCodes],
    default: null,
  })
  codes!: Ref<CPTCodes>[] | null;

  @prop({ type: Boolean, default: true })
  isActive!: boolean;
  @prop({ type: String, required: true })
  mobile_no!: string;

  @prop({ type: String, default: null })
  group_number!: string;

  @prop({ type: String, required: true })
  subscriber_id!: string;

  @prop({ type: String, required: true })
  relationship!: string;

  @prop({ type: String, default: "" })
  date_of_birth!: string;

  @prop({ type: String, default: null })
  payer_id!: string;

  @prop({ type: Date, default: null })
  issue_date!: string;

  @prop({ type: String, default: null })
  insurance_name!: string;

  @prop({ type: String, required: true })
  insurance_city!: string;

  // @prop({ type: String, required: true })
  // insurance_state!: string;

  @prop({
    ref: States,
    type: mongoose.Types.ObjectId,
    default: null,
  })
  insurance_state!: Ref<States>;

  @prop({ type: String, required: true })
  insurance_address!: string;

  // @prop({ type: String, required: true })
  // insurance_country!: string;

  @prop({
    ref: Country,
    type: mongoose.Types.ObjectId,
    default: null,
  })
  insurance_country!: Ref<Country>;

  @prop({ type: String, required: true })
  insurance_zip_code!: string;

  @prop({ type: String, default: null })
  insurance_plan_type!: string;

  @prop({ type: String, required: true })
  note!: string;

  @prop({ type: String, required: true })
  subscriber_city!: string;

  @prop({ type: String, required: true })
  subscriber_state!: string;

  @prop({ type: String, required: true })
  subscriber_gender!: string;

  @prop({ type: String, required: true })
  subscriber_address!: string;

  @prop({ type: String, required: true })
  subscriber_country!: string;

  @prop({ type: String, required: true })
  subscriber_zip_code!: string;

  @prop({ type: String, required: true })
  subscriber_last_name!: string;

  @prop({ type: String, required: true })
  subscriber_first_name!: string;

  @prop({
    enum: ECoverageValues,
    type: String,
    default: ECoverageValues.PRIMARY,
  })
  coverage!: string;

  @prop({
    enum: EInsuranceTypeValues,
    type: String,
    default: EInsuranceTypeValues.UNKNOWN,
  })
  insurance_type!: string;

  @prop({})
  copay!: CopayObject;

  @prop({ type: Boolean, default: false })
  isDeleted!: boolean;
}

const INSURANCE_DB_MODEL = getModelForClass(Insurance, {
  schemaOptions: {
    collection: "insurance",
    timestamps: true,
  },
});

export default INSURANCE_DB_MODEL;
