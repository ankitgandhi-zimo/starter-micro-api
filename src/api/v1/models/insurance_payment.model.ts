import {
  getModelForClass,
  index,
  prop,
  Ref,
} from "@typegoose/typegoose";
import mongoose from "mongoose";
import { PaginatedModel } from "../common/pagination/pagination_configuration";
import { Appointment } from "./appointment.model";
import { InsuranceCompany } from "./insurance/insurance_companies.model";
import { Patients } from "./patient.model";
import { User } from "./user.model";
class LinkObject {
  @prop({ type: String, default: null })
  url!: string;

  @prop({ type: String, default: null })
  id!: string;

  @prop({ type: String, default: null })
  resetKey!: string;
}

export enum EPaymentModeValues {
  EFT = "EFT",
  CARD = "CARD",
  CHEQUE = "CHEQUE",
}

export enum ECreditCardModeValues {
  PAYMENT = "PAYMENT",
  REFUND = "REFUND",
}

export enum ETransactionModeValues {
  PAYMENT = "PAYMENT",
  REFUND = "REFUND",
}

export enum EPaymentFromValues {
  INSURANCE = "INSURANCE",
  PATIENT = "PATIENT",
}

@index({ payment_mode: "text" })
export class InsurancePayment extends PaginatedModel {
  @prop({ ref: "User" })
  clinic_id!: Ref<User> | null;

  @prop({ enum: ETransactionModeValues })
  transaction_type!: string;

  @prop({ enum: EPaymentFromValues })
  payment_from!: string;

  @prop({
    enum: EPaymentModeValues,
  })
  payment_mode!: string;

  @prop({
    enum: ECreditCardModeValues,
  })
  credeitCard_mode!: string;

  @prop({ type: String })
  transactionId!: string;

  @prop({ ref: "InsuranceCompany" })
  insurance_company!: Ref<InsuranceCompany>;

  @prop({ type: String })
  insurance_plan!: string;

  @prop({ type: String, default: null })
  refrence!: string;

  @prop({ type: Number })
  unapplied_amount!: number;

  @prop({ type: Date, default: null })
  refrenceDate!: string;

  @prop({ type: Number })
  payment_amount!: number;

  @prop({ type: Number })
  bill_charged_amount!: number;

  @prop({ type: Number, default: 0 })
  adjustment_amount!: number;

  @prop({ type: String, default: null })
  excluded_claim!: string;

  @prop({ type: String, default: null })
  notes!: string;

  @prop({ ref: "Patients", default: null })
  patient_id!: Ref<Patients> | null;

  @prop({ ref: "Appointment", default: null })
  appointment_id!: Ref<Appointment> | null;

  @prop({ ref: "User", type: mongoose.Types.ObjectId })
  createdby_id!: Ref<User> | null;

  @prop({ type: String, default: null })
  document!: string;
}

const INSURANCE_PAYMENT_DB_MODEL = getModelForClass(
  InsurancePayment,
  {
    schemaOptions: {
      collection: "insurance_payment",
      timestamps: true,
    },
  }
);

export default INSURANCE_PAYMENT_DB_MODEL;
