import { getModelForClass, prop, Ref } from "@typegoose/typegoose";
import mongoose from "mongoose";
import { PaginatedModel } from "../common/pagination/pagination_configuration";
import { SuperBill } from "./super_bill.model";
import { User } from "./user.model";

export enum ClaimNotes {
  ADD = "ADD", //Additional information
  CER = "CER", //Certification narrative
  DCP = "DCP", //Goals, Rehabilitation, Potental or Discharge Plans
  DGN = "DGN", //Diagnosis Description,
  TPO = "TPO", //Third Party Organization,
}
export enum SpecialProgramCode {
  N02 = "02", //Physically handicapped children's program
  N03 = "03", //Special Federal Funding
  N05 = "05", //Disability
  N09 = "09", //Second Opinion
}
export class InsuranceObject {
  @prop({ type: String, default: null })
  insurance_plan!: string;

  @prop({ type: String, default: null })
  referral_no!: string;
}

export enum Resubmission {
  N7 = "7", //Replacement of Prior Claim
  N8 = "8", //Void/Cancel of prior Claim
}

export class SuperBillOtherDetail extends PaginatedModel {
  @prop({ type: Boolean, default: false })
  isDeleted!: boolean;

  @prop({ type: Boolean, default: true })
  isActive!: boolean;

  @prop({ ref: SuperBill, type: mongoose.Types.ObjectId })
  super_bill_id!: Ref<SuperBill>;

  @prop({ type: String, default: null })
  claim_codes!: string[];

  @prop({ type: Date, default: null })
  relinquished_care_date!: string;

  @prop({ type: Date, default: null })
  hearing_vision_date!: string;

  @prop({ type: Date, default: null })
  first_visit_date!: string;

  @prop({ type: Date, default: null })
  acute_manifestation_date!: string;

  @prop({ type: Date, default: null })
  last_seen_date!: string;

  @prop({ type: Date, default: null })
  assumed_care_date!: string;

  @prop({ type: Date, default: null })
  last_x_ray_date!: string;

  @prop({ type: Date, default: null })
  initial_treatment_date!: string;

  @prop({ type: String, default: null })
  additional_cliam_info!: string;

  @prop({ type: String, default: null })
  ct_project_code!: string;

  @prop({ type: String, default: null })
  property_casuality_claim_no!: string;

  @prop({
    enum: ClaimNotes,
    type: String,
    default: ClaimNotes.ADD,
  })
  claim_notes!: string;

  @prop({ type: String, default: null })
  other_constitutional!: string;

  @prop({ type: Number, default: 0 })
  lab_charges!: number;

  @prop({ type: String, default: null })
  mammography_certification_no!: string;

  @prop({ type: String, default: null })
  investigational_device_exemption_no!: string;

  @prop({ type: String, default: null })
  delay_reason_code!: string;

  @prop({
    enum: SpecialProgramCode,
    type: String,
    default: null,
  })
  special_program_code!: string;

  @prop({ type: InsuranceObject, default: [] })
  insurance_data!: InsuranceObject[];

  @prop({ type: Boolean })
  EPSDT_referral!: boolean;

  @prop({
    enum: Resubmission,
    type: String,
    default: SpecialProgramCode.N02,
  })
  resubmission_no!: Resubmission;

  @prop({ type: String, default: null })
  original_ref_no!: string;

  @prop({ type: String, default: null })
  remarks!: string;

  @prop({ ref: User, type: mongoose.Types.ObjectId })
  createdby_id!: Ref<User> | null;
}

const SUPER_BILL_OTHER_DETAIL_DB_MODEL = getModelForClass(
  SuperBillOtherDetail,
  {
    schemaOptions: {
      collection: "super_bill_other_detail",
      timestamps: true,
    },
  }
);

export default SUPER_BILL_OTHER_DETAIL_DB_MODEL;
