import {
  getModelForClass,
  index,
  prop,
  Ref,
} from "@typegoose/typegoose";
import mongoose from "mongoose";
import { PaginatedModel } from "../common/pagination/pagination_configuration";
import { Appointment } from "./appointment.model";
import { Clinic } from "./clinic.model";
import { Doctor } from "./doctor.model";
import { Patients } from "./patient.model";
import { User } from "./user.model";

@index({ medicine: "text" })
export class EPriscription extends PaginatedModel {
  @prop({ type: String, default: null })
  medicine!: string;

  @prop({ type: String, default: null })
  strength!: string;

  @prop({ type: String, default: null })
  frequency!: string;

  @prop({ type: String, default: null })
  precaution!: string;

  @prop({ ref: Clinic, type: mongoose.Types.ObjectId })
  clinic_id!: Ref<Clinic> | null;

  @prop({ ref: Doctor, type: mongoose.Types.ObjectId })
  doctor_id!: Ref<Doctor> | null;

  @prop({ ref: "Patients", type: mongoose.Types.ObjectId })
  patient_id!: Ref<Patients> | null;

  @prop({
    ref: "Appointment",
    type: mongoose.Types.ObjectId,
  })
  appointment_id!: Ref<Appointment> | null;

  @prop({ type: Boolean, default: false })
  isDeleted!: boolean;

  @prop({ type: Boolean, default: true })
  isActive!: boolean;

  @prop({ ref: "User", type: mongoose.Types.ObjectId })
  createdby_id!: Ref<User>;
}

const E_PRISCRIPTION_DB_MODEL = getModelForClass(
  EPriscription,
  {
    schemaOptions: {
      collection: "epriscription",
      timestamps: true,
    },
  }
);

export default E_PRISCRIPTION_DB_MODEL;
