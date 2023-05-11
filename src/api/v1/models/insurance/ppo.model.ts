import {
  getModelForClass,
  prop,
  Ref,
} from "@typegoose/typegoose";
import mongoose from "mongoose";
import { PaginatedModel } from "../../common/pagination/pagination_configuration";
import { Clinic } from "../clinic.model";
import { Patients } from "../patient.model";

export class Ppo extends PaginatedModel {
  @prop({ type: String, default: null })
  deductible!: string;

  @prop({ type: String, default: null })
  otherCodes!: string;

  @prop({ type: String, default: null })
  coinsurance!: string;

  @prop({ type: String, default: null })
  limitOnVisit!: string;

  @prop({ type: String, default: null })
  deductibleMet!: string;

  @prop({ type: String, default: null })
  maxOutOfPocket!: string;

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

const PPO_DB_MODEL = getModelForClass(Ppo, {
  schemaOptions: {
    collection: "ppo",
    timestamps: true,
  },
});

export default PPO_DB_MODEL;
