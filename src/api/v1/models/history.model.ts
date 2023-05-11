import { getModelForClass, prop, Ref } from "@typegoose/typegoose";
import mongoose from "mongoose";
import { PaginatedModel } from "../common/pagination/pagination_configuration";
import { Appointment } from "./appointment.model";
import { Patients } from "./patient.model";
import { User } from "./user.model";

export enum EHistoryActivityTypeValues {
  CLINIC = "clinic",
  PATIENT = "patient",
  PROVIDER = "provider",
  USER = "user",
  APPOINTMENT = "appointment",
  SUPERBILL = "superbill",
  CLAIM = "claim",
  PAYMENT = "payment",
  CHECKOUT = "checkout",
  BillingTeam = "billingteam",
  ANNOUNCEMENT = "announcement",
}

export class ActivityHistory extends PaginatedModel {
  @prop({ ref: User }) // person who is performed action(activity by)
  user_id!: Ref<User>;

  @prop({ ref: User, default: null })
  doctor_id!: Ref<User> | null;

  @prop({ ref: Patients, default: null })
  patient_id!: Ref<Patients> | null;

  @prop({ ref: Appointment, default: null })
  appointment_id!: Ref<Appointment> | null;

  @prop({ type: String })
  description!: string;

  @prop({
    enum: EHistoryActivityTypeValues,
    type: String,
    require: true,
  })
  type!: EHistoryActivityTypeValues;

  @prop({ type: mongoose.Types.ObjectId, default: null })
  type_id!: mongoose.Types.ObjectId; /// this is person on which action is performed

  @prop({ _id: false, default: null })
  data!: any;
}

const ACTIVITY_HISTORY_DB_MODEL = getModelForClass(ActivityHistory, {
  schemaOptions: {
    collection: "activity_history",
    timestamps: true,
    strict: false,
  },
});

export default ACTIVITY_HISTORY_DB_MODEL;
