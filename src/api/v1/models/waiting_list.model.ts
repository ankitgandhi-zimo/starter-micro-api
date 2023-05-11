import {
  getModelForClass,
  prop,
  Ref,
} from "@typegoose/typegoose";
import mongoose from "mongoose";
import { PaginatedModel } from "../common/pagination/pagination_configuration";
import { AppointmentType } from "./appointment_types.model";
import { Clinic } from "./clinic.model";
import { Doctor } from "./doctor.model";
import { Patients } from "./patient.model";
import { User } from "./user.model";

export class WaitingList extends PaginatedModel {
  @prop({ type: Boolean, default: false })
  isDeleted!: boolean;

  @prop({ type: Boolean, default: true })
  isActive!: boolean;

  @prop({ type: String, default: null })
  notes!: string;

  @prop({ ref: Clinic, type: mongoose.Types.ObjectId })
  clinic_id!: Ref<Clinic> | null;

  @prop({ ref: Doctor, type: mongoose.Types.ObjectId })
  doctor_id!: Ref<Doctor> | null;

  @prop({ ref: User, type: mongoose.Types.ObjectId })
  createdby_id!: Ref<User> | null;

  @prop({ ref: Patients, type: mongoose.Types.ObjectId })
  patient_id!: Ref<Patients> | null;

  @prop({
    ref: AppointmentType,
    type: mongoose.Types.ObjectId,
  })
  apptType_id!: Ref<AppointmentType> | null;
}

const WAITING_LIST_DB_MODEL = getModelForClass(
  WaitingList,
  {
    schemaOptions: {
      collection: "waiting_list",
      timestamps: true,
    },
  }
);

export default WAITING_LIST_DB_MODEL;
