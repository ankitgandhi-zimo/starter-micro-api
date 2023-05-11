import {
  getModelForClass,
  prop,
  Ref,
} from "@typegoose/typegoose";
import mongoose from "mongoose";
import { PaginatedModel } from "../common/pagination/pagination_configuration";
import { Appointment } from "./appointment.model";
import { CPTCodes } from "./cpt.model";
import { Doctor } from "./doctor.model";
import { FieldData } from "./filled_dynamic_form.model";
import { ICTCodes } from "./ict.model";
import { Patients } from "./patient.model";
import { ProgressNotes } from "./progress_notes.model";
import { TreatmentPlan } from "./treatmentPlan.model";
import { User } from "./user.model";

export enum EProgreessStatusValues {
  DRAFT = "DRAFT",
  SAVED = "SAVED",
}
class CodesObject {
  // @prop({ ref: () => ICTCodes })
  // ICD_10!: Ref<ICTCodes>[];

  // @prop({ ref: () => CPTCodes })
  // cptCode!: Ref<CPTCodes>[];

  @prop({
    ref: ICTCodes,
    type: mongoose.Types.ObjectId,
    default: [],
  })
  ICD_10!: Ref<ICTCodes>[];

  @prop({
    ref: CPTCodes,
    type: mongoose.Types.ObjectId,
    default: [],
  })
  cptCode!: Ref<ICTCodes>[];
}

// export class FieldData {
//   @prop({ type: mongoose.Types.ObjectId, default: null })
//   id!: string;

//   @prop({ default: null })
//   value!: any;
// }

export class FilledProgressNotes extends PaginatedModel {
  // @prop({
  //   enum: EProgreessStatusValues,
  //   type: String,
  //   default: EProgreessStatusValues.DRAFT,
  // })
  // status!: string;

  @prop({ _id: false, type: CodesObject, default: null })
  codes!: CodesObject;

  @prop({ type: Boolean, default: false })
  isDeleted!: boolean;

  @prop({ ref: User })
  clinic_id!: Ref<User> | null;

  @prop({ ref: Doctor })
  doctor_id!: Ref<Doctor> | null;

  @prop({ ref: "ProgressNotes" })
  progressNote_id!: Ref<ProgressNotes> | null;

  @prop({ ref: Patients })
  patient_id!: Ref<Patients> | null;

  @prop({ ref: "Appointment" })
  appointment_id!: Ref<Appointment> | null;

  @prop({ ref: "TreatmentPlan" })
  treatmentPlan_id!: Ref<TreatmentPlan> | null;

  @prop({ type: String, default: null })
  session_narrative!: string;

  @prop({ type: String, default: null })
  treatment_goal!: string;

  @prop({ type: FieldData, default: [], required: true })
  field_data!: FieldData[];

  @prop({ ref: "User" })
  createdby_id!: Ref<User> | null;
}

const FILLED_PROGRESS_NOTES_DB_MODEL = getModelForClass(
  FilledProgressNotes,
  {
    schemaOptions: {
      collection: "filledProgressNotes",
      timestamps: true,
    },
  }
);

export default FILLED_PROGRESS_NOTES_DB_MODEL;
