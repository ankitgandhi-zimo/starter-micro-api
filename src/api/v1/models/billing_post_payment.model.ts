import {
  getModelForClass,
  prop,
  Ref,
} from "@typegoose/typegoose";
import mongoose from "mongoose";
import { PaginatedModel } from "../common/pagination/pagination_configuration";
import { Appointment } from "./appointment.model";
import { BillingCheckout } from "./billing_checkout.model";
import { Clinic } from "./clinic.model";
import { Patients } from "./patient.model";
import { SuperBill } from "./super_bill.model";
import { User } from "./user.model";

export enum EPostBillingStatusValues {
  POSTED = "POSTED",
  PUBLISHED = "PUBLISHED",
}

// @index({ status: "text" })
export class BillingPostPayment extends PaginatedModel {
  @prop({ type: Number, default: 0 })
  copay!: number;

  @prop({ type: Number, default: 0 })
  deductible!: number;

  @prop({ type: Number, default: 0 })
  adjustment!: number;

  @prop({ type: Number, default: 0 })
  due_amount!: number;

  @prop({ type: Number, default: 0 })
  co_insurance!: number;

  @prop({ type: Number, default: 0 })
  allowed_amount!: number;

  @prop({ type: Number, default: 0 })
  insurance_paid!: number;

  @prop({ type: Number, default: 0 })
  secondary_balance_due!: number;

  @prop({ type: Number, default: 0 })
  charge_amount!: number;

  @prop({ ref: "Clinic" })
  clinic_id!: Ref<Clinic> | null;

  @prop({ ref: "Patients" })
  patient_id!: Ref<Patients> | null;

  @prop({ ref: "Appointment" })
  appointment_id!: Ref<Appointment> | null;

  @prop({ ref: "SuperBill" })
  superbill_id!: Ref<SuperBill> | null;

  @prop({ ref: "User", type: mongoose.Types.ObjectId })
  createdby_id!: Ref<User> | null;

  @prop({
    enum: EPostBillingStatusValues,
    default: EPostBillingStatusValues.POSTED,
  })
  status!: string;

  @prop({
    ref: "BillingCheckout",
    type: mongoose.Types.ObjectId,
  })
  checkout_id!: Ref<BillingCheckout> | null;
}

const BILLING_POST_PAYMENT_DB_MODEL = getModelForClass(
  BillingPostPayment,
  {
    schemaOptions: {
      collection: "billingPostPayment",
      timestamps: true,
    },
  }
);

export default BILLING_POST_PAYMENT_DB_MODEL;
