import {
  getModelForClass,
  index,
  prop,
  Ref,
} from "@typegoose/typegoose";
import mongoose from "mongoose";
import { PaginatedModel } from "../common/pagination/pagination_configuration";
import { Clinic } from "./clinic.model";
import { User } from "./user.model";

@index({ type: "text" })
export class AppointmentType extends PaginatedModel {
  @prop({ type: Boolean, default: false })
  isDeleted!: boolean;

  @prop({ type: Boolean, default: true })
  isActive!: boolean;

  @prop({ type: String, default: null })
  type!: string;

  @prop({ type: String, default: null })
  color!: string;

  @prop({ type: Number, default: 15 })
  duration!: number;

  @prop({ ref: Clinic, type: mongoose.Types.ObjectId })
  clinic_id!: Ref<Clinic> | null;

  @prop({ ref: User, type: mongoose.Types.ObjectId })
  createdby_id!: Ref<User> | null;

  @prop({ type: Boolean, default: true }) //////////// if true then validate number_of_patients
  isMultiPatient!: boolean;

  @prop({ type: Number, default: 1 })
  number_of_patients!: number;
}

const APPOINTMENT_TYPE_DB_MODEL = getModelForClass(
  AppointmentType,
  {
    schemaOptions: {
      collection: "appointment_type",
      timestamps: true,
    },
  }
);

export default APPOINTMENT_TYPE_DB_MODEL;
