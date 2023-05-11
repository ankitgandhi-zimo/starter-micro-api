import {
  getModelForClass,
  prop,
  Ref,
} from "@typegoose/typegoose";
import mongoose from "mongoose";
import { PaginatedModel } from "../common/pagination/pagination_configuration";
import { Appointment } from "./appointment.model";
import { InsurancePayment } from "./insurance_payment.model";
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

export enum EBillingModeValues {
  CASH = "CASH",
  CARD = "CARD",
  CHEQUE = "CHEQUE",
  LINK = "LINK",
}

export enum EBillingStatusValues {
  RECEIVED = "RECEIVED",
  DUE = "DUE",
  FAILED = "FAILED",
  EXPECTED = "EXPECTED",
  REFUND = "REFUND",
}
export enum EBillMethodValues {
  FULL = "FULL" /* 'EMI', 'SPLIT', 'E1', 'E2', 'E3', 'P1', 'P2',*/,
  ADVANCE = "ADVANCE",
}

// @index({ mode: "text" })
export class BillingPayment extends PaginatedModel {
  @prop({ enum: EBillingModeValues })
  mode!: string;

  @prop({ enum: EBillingStatusValues })
  status!: string;

  @prop({
    enum: EBillMethodValues,
    default: EBillMethodValues.FULL,
  })
  method!: string;

  @prop({ type: String })
  batchNumber!: string;

  @prop({ type: String, default: null })
  email!: string;

  @prop({ type: String, default: null })
  transactionId!: string;

  @prop({ type: String, default: null })
  remark!: string;

  @prop({ type: String, default: null })
  cheque!: string;

  @prop({ type: String, default: null })
  chargeId!: string;

  @prop({ type: Number, required: true })
  amount!: number;

  @prop({ type: Date, default: null })
  receiveDate!: string;

  @prop({ ref: "User" })
  clinic_id!: Ref<User> | null;

  @prop({ ref: "Patients" })
  patient_id!: Ref<Patients> | null;

  @prop({ ref: "Appointment" })
  appointment_id!: Ref<Appointment> | null;

  @prop({ ref: "InsurancePayment", default: null })
  insurancePaymentId!: Ref<InsurancePayment> | null;

  @prop({
    type: LinkObject,
    default: () => ({}),
    _id: false,
  })
  link!: LinkObject;

  //   @prop({ type: Boolean, default: false })
  //   isDeleted!: boolean;

  //   @prop({ type: Boolean, default: true })
  //   isActive!: boolean;

  @prop({ ref: "User", type: mongoose.Types.ObjectId })
  createdby_id!: Ref<User> | null;

  @prop({ type: String, default: null })
  document!: string;
}

const BILLING_PAYMENT_DB_MODEL = getModelForClass(
  BillingPayment,
  {
    schemaOptions: {
      collection: "billingpayment",
      timestamps: true,
    },
  }
);

export default BILLING_PAYMENT_DB_MODEL;
