import {
  getModelForClass,
  index,
  prop,
  Ref,
} from "@typegoose/typegoose";
import mongoose from "mongoose";
import { PaginatedModel } from "../../common/pagination/pagination_configuration";
import { Clinic } from "../clinic.model";
import { Patients } from "../patient.model";

@index({ type: "text" })
export class Eap extends PaginatedModel {
  @prop({ type: String, default: null })
  type!: string;

  @prop({ type: String, default: null })
  notes!: string;

  @prop({ type: Date, default: null })
  endDate!: string;

  @prop({ type: String, default: null })
  HJneeded!: string;

  @prop({ type: String, default: null })
  memberId!: string;

  @prop({ type: Date, default: null })
  startDate!: string;

  @prop({ type: String, default: null })
  authNumber!: string;

  @prop({ type: String, default: null })
  billableCptCodes!: string;

  @prop({ type: String, default: null })
  numberOfSessions!: string;

  @prop({ type: String, default: null })
  claimsBillingAddress!: string;

  @prop({ ref: Clinic, default: null })
  clinic_id!: Ref<Clinic> | null;

  @prop({ ref: "Patients" })
  patient_id!: Ref<Patients> | null;

  @prop({ type: mongoose.Types.ObjectId })
  createdby_id!: mongoose.Types.ObjectId;
}

const EAP_DB_MODEL = getModelForClass(Eap, {
  schemaOptions: {
    collection: "eap",
    timestamps: true,
  },
});

export default EAP_DB_MODEL;
