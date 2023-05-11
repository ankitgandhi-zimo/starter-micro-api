/**
 * ? *********         NOTE         **************
 *
 *  When Clinic book appointment createdby_id == clinic_id
 *  When Patient book appointment createdby_id == patient_id
 *  When Sub Admin book appointment createdby_id == Sub admin _id
 *  When Super Admin book appointment createdby_id == Super admin _id
 *
 *            ALSO
 *  A doctor book appointment with himself in case if he/she is on holiday
 *  By doing this he will no longer visible available to patients
 *
 *  And when Doctor book appointment createdby_id == doctor_id
 */

import {
  getModelForClass,
  index,
  prop,
  Ref,
} from "@typegoose/typegoose";
import mongoose from "mongoose";
import { PaginatedModel } from "../common/pagination/pagination_configuration";
import { AppointmentType } from "./appointment_types.model";
import { Clinic } from "./clinic.model";
import { Doctor } from "./doctor.model";
import { ClinicLocation } from "./location.model";
import { Patients } from "./patient.model";
import { User } from "./user.model";

export enum EBoolValues {
  TRUE = "true",
  FALSE = "false",
}
export enum EVisitTypeValues {
  PHYSICAL = "Physical",
  TELECALL = "Tele-Call",
}
export enum EPermissionValues {
  AVAILABILITY = "AVAILABILITY",
  SCHEDULER = "SCHEDULER",
  NOTES = "NOTES",
  SOAPNOTES = "SOAPNOTES",
  TREATMENTPLAN = "TREATMENTPLAN",
}

export enum ERescheduleTypeFeildValues {
  CLINIC = "CLINIC",
  PATIENT = "PATIENT",
  SUPERADMIN = "SUPER ADMIN",
}

export enum EStatusValues {
  ACCEPTED = "Accepted",
  PENDING = "Pending",
  RESCHEDULED = "Rescheduled",
  UNAVAILABILITY = "Unavailability",
  CANCELLED = "Cancelled",
  DECLINED = "Declined",
  CHECKOUT = "Checkout",
}

class EmailStatusObject {
  @prop({ type: Boolean, default: false })
  before_30_min!: boolean;

  @prop({ type: Boolean, default: false })
  before_24_hrs!: boolean;

  @prop({ type: String })
  name!: string;

  @prop({ enum: EPermissionValues })
  key!: string;
}

class RescheduleObject {
  @prop({ type: Date, default: null })
  endDateTime!: string;

  @prop({ type: Date, default: null })
  responseTime!: string;

  @prop({ type: Date, default: null })
  startDateTime!: string;

  @prop({ type: Date, default: null })
  rescheduleTime!: string;

  @prop({
    enum: ERescheduleTypeFeildValues,
    type: String,
    default: null,
  })
  type!: string;

  @prop({ ref: User, default: null })
  rescheduleby_id!: Ref<User> | null;

  @prop({ ref: User, default: null })
  responseby_id!: Ref<User> | null;
}

class CallDataObject {
  @prop({ type: String, default: null })
  password!: string;

  @prop({ type: String, default: null })
  join_url!: string;

  @prop({ type: String, default: null })
  start_url!: string;

  @prop({ type: String, default: null })
  meetingNumber!: string;
}

class AcceptedObject {
  @prop({ ref: User, default: null })
  user_id!: Ref<User> | null;

  @prop({ type: Date, default: null })
  time!: string;
}

class DeclinedObject {
  @prop({ ref: "User", default: null })
  user_id!: Ref<User> | null;

  @prop({ type: Date, default: null })
  time!: string;

  @prop({ type: String, default: null })
  reason!: string;
}

class RecurringObject {
  @prop({ type: String, default: null })
  number!: string;

  @prop({ type: Boolean, default: false })
  status!: boolean;
}

@index({ title: "text" })
export class Appointment extends PaginatedModel {
  @prop({ type: String, default: "Booked" })
  title!: string;

  @prop({ type: Number, default: 0 })
  duration!: number;

  @prop({ type: String, default: null })
  document!: string;

  @prop({ type: Date })
  startDateTime!: string;

  @prop({ type: Date })
  endDateTime!: string;

  @prop({ type: String, default: null })
  description!: string;

  @prop({ type: Boolean, default: false })
  isDeleted!: boolean;

  @prop({ type: Boolean, default: false })
  isEmergency!: boolean;

  @prop({ type: String, default: null }) // there will be no appointment type in case of unavailability( if multi patient true hai type me to check)
  appointment_type!: string;

  @prop({ type: String, default: null }) // this  appointment number and group id same if multi option true in app type 02-01-2023 GG
  groupId!: string;

  @prop({ type: String, default: null })
  appointment_number!: string;

  @prop({ ref: "User" })
  createdby_id!: Ref<User>;

  @prop({ default: null })
  emailStatus!: EmailStatusObject;

  @prop({ ref: Clinic, type: mongoose.Types.ObjectId })
  clinic_id!: Ref<Clinic> | null;

  @prop({ ref: Doctor, type: mongoose.Types.ObjectId })
  doctor_id!: Ref<Doctor> | null;

  @prop({ ref: "Patients", type: mongoose.Types.ObjectId })
  patient_id!: Ref<Patients> | null;

  @prop({
    ref: "ClinicLocation",
    type: mongoose.Types.ObjectId,
  })
  location_id!: Ref<ClinicLocation> | null;

  @prop({
    enum: EVisitTypeValues,
    type: String,
    default: EVisitTypeValues.PHYSICAL,
  })
  visitType!: string;

  @prop({
    ref: AppointmentType,
    type: mongoose.Types.ObjectId,
  }) // there will be no appointment type _id in case of unavailability
  appointmentType_id!: Ref<AppointmentType> | null;

  @prop({ default: null })
  reschedule!: RescheduleObject | null;

  @prop({
    enum: EStatusValues,
    type: String,
    default: EStatusValues.ACCEPTED,
  })
  status!: string;

  @prop({ default: null })
  callData!: CallDataObject | null;

  @prop({ default: null })
  accepted!: AcceptedObject | null;

  @prop({ type: DeclinedObject, default: null })
  declined!: DeclinedObject | null;

  @prop({ default: null })
  deleted!: AcceptedObject | null;

  @prop({ default: null })
  recurring!: RecurringObject | null;
}

const APPOINTMENT_DB_MODEL = getModelForClass(Appointment, {
  schemaOptions: {
    collection: "appointment",
    timestamps: true,
  },
});

export default APPOINTMENT_DB_MODEL;
