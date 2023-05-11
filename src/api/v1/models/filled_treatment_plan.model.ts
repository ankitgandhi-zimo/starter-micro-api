import {
  getModelForClass,
  prop,
  Ref,
} from "@typegoose/typegoose";
import mongoose from "mongoose";
import { PaginatedModel } from "../common/pagination/pagination_configuration";
import { Appointment } from "./appointment.model";
import { Clinic } from "./clinic.model";
import { Doctor } from "./doctor.model";
import { Patients } from "./patient.model";
import { TreatmentPlan } from "./treatmentPlan.model";
import { User } from "./user.model";

export enum EProgreessStatusValues {
  DRAFT = "DRAFT",
  SAVED = "SAVED",
}
class CodesObject {
  @prop({ default: [] })
  ICD_10!: string[] | null;

  @prop({ default: [] })
  cptCode!: string[] | null;
}

export class FieldData {
  @prop({ type: mongoose.Types.ObjectId, default: null })
  id!: string;

  @prop({ default: null })
  value!: any;
}

export class FilledTreatmentPlan extends PaginatedModel {
  // @prop({
  //   enum: EProgreessStatusValues,
  //   type: String,
  //   default: EProgreessStatusValues.DRAFT,
  // })
  // status!: string;

  @prop({ type: Boolean, default: false })
  isDeleted!: boolean;

  @prop({ ref: Clinic })
  clinic_id!: Ref<Clinic> | null;

  @prop({ ref: Doctor })
  doctor_id!: Ref<Doctor> | null;

  @prop({ ref: "TreatmentPlan" })
  treatmentPlan_id!: Ref<TreatmentPlan> | null;

  @prop({ type: Boolean, default: true })
  saveAsDraft!: boolean;

  // @prop({ ref: "ClinicLocation" })
  // location_id!: Ref<ClinicLocation> | null;

  @prop({ ref: Patients })
  patient_id!: Ref<Patients> | null;

  @prop({ ref: "Appointment" })
  appointment_id!: Ref<Appointment> | null;

  @prop({ type: FieldData, default: [], required: true })
  field_data!: FieldData[];

  @prop({ ref: "User" })
  createdby_id!: Ref<User> | null;

  // @prop({ ref: "ProgressNotes" })
  // progressNote_id!: Ref<ProgressNotes> | null;

  // @prop()
  // codes!: CodesObject | null;
}

const FILLED_TREATMENT_PLAN_DB_MODEL = getModelForClass(
  FilledTreatmentPlan,
  {
    schemaOptions: {
      collection: "filledTreatmentPlan",
      timestamps: true,
    },
  }
);

export default FILLED_TREATMENT_PLAN_DB_MODEL;
