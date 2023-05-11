import {
  getModelForClass,
  prop,
  Ref,
} from "@typegoose/typegoose";
import mongoose from "mongoose";
import { PaginatedModel } from "../common/pagination/pagination_configuration";
import { Appointment } from "./appointment.model";
import { User } from "./user.model";

export class AppointmentStage extends PaginatedModel {
  @prop({ type: Boolean, default: false })
  isDeleted!: boolean;

  @prop({ type: Boolean, default: true })
  isActive!: boolean;

  @prop({ type: String, default: null })
  stage!: string;

  @prop({ ref: Appointment, type: mongoose.Types.ObjectId })
  appointment_id!: Ref<Appointment> | null;

  @prop({ ref: User, type: mongoose.Types.ObjectId })
  clinic_id!: Ref<User> | null;

  @prop({ ref: User, type: mongoose.Types.ObjectId })
  doctor_id!: Ref<User> | null;
}

const APPOINTMENT_STAGE_DB_MODEL = getModelForClass(
  AppointmentStage,
  {
    schemaOptions: {
      collection: "appointment_stage",
      timestamps: true,
    },
  }
);

export default APPOINTMENT_STAGE_DB_MODEL;
