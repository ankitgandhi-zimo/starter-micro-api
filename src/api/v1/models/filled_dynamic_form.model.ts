import {
  getModelForClass,
  prop,
  Ref,
} from "@typegoose/typegoose";
import mongoose from "mongoose";
import { PaginatedModel } from "../common/pagination/pagination_configuration";
import { Clinic } from "./clinic.model";
import { Doctor } from "./doctor.model";
import { DynamicForm } from "./dynamic_form.model";
import { Patients } from "./patient.model";
import { User } from "./user.model";

export class FieldData {
  @prop({
    type: mongoose.Types.ObjectId,
    default: null,
    required: true,
  })
  id!: string;

  @prop({ default: null })
  value!: any;
}

export class Remark {
  @prop({ type: String, default: null })
  remark!: string;

  @prop({ type: Date, default: Date.now() })
  date!: Date;

  @prop({ ref: User, type: mongoose.Types.ObjectId })
  by!: Ref<User> | null;
}
export enum EStatusValues {
  VIEWED = "VIEWED",
  SHARED = "SHARED",
  REJECTED = "REJECTED",
}

export class FilledDynamicForm extends PaginatedModel {
  @prop({ type: Boolean, default: false })
  isDeleted!: boolean;

  @prop({ type: Boolean, default: true })
  isActive!: boolean;

  @prop({
    enum: EStatusValues,
    type: String,
    default: EStatusValues.SHARED,
  })
  status!: string;

  @prop({ type: Number, default: 0 })
  filledPercentage!: number;

  @prop({ type: FieldData, default: [], required: true })
  field_data!: FieldData[];

  @prop({ ref: Clinic, default: null })
  clinic_id!: Ref<Clinic> | null;

  @prop({ ref: Patients, default: null })
  patient_id!: Ref<Patients> | null;

  @prop({ ref: Doctor, default: null })
  provider_id!: Ref<Doctor> | null;

  @prop({ ref: DynamicForm, default: null })
  form_id!: Ref<DynamicForm> | null;

  @prop({ type: Remark, default: [] })
  remarks!: Remark[];

  @prop({ type: Date, default: null })
  received_date!: Date;

  @prop({ ref: User, type: mongoose.Types.ObjectId })
  createdby_id!: Ref<User> | null;
}

const FILLED_DYNAMIC_FORM_DB_MODEL = getModelForClass(
  FilledDynamicForm,
  {
    schemaOptions: {
      collection: "filled_dynamic_form",
      timestamps: true,
      //strict: false,
    },
  }
);

export default FILLED_DYNAMIC_FORM_DB_MODEL;
