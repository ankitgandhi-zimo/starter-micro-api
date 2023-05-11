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

@index({ copay: "text" })
export class Hmo extends PaginatedModel {
  @prop({ type: String, default: null })
  copay!: string;

  @prop({ type: String, default: null })
  otherCodes!: string;

  @prop({ type: String, default: null })
  outOfPocket!: string;

  @prop({ type: String, default: null })
  limitOnVisit!: string;

  @prop({ type: String, default: null })
  planCalendarYear!: string;

  @prop({ type: String, default: null })
  billableCptCodes!: string;

  @prop({ type: String, default: null })
  claimsBillingAddress!: string;

  @prop({ ref: Clinic, default: null })
  clinic_id!: Ref<Clinic> | null;

  @prop({ ref: "Patients" })
  patient_id!: Ref<Patients> | null;

  @prop({ type: mongoose.Types.ObjectId }) // ref can be clinic, patient, frontdesk
  createdby_id!: mongoose.Types.ObjectId;
}

const HMO_DB_MODEL = getModelForClass(Hmo, {
  schemaOptions: {
    collection: "hmo",
    timestamps: true,
  },
});

export default HMO_DB_MODEL;
