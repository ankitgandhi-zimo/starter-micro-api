import {
  getModelForClass,
  prop,
  Ref,
} from "@typegoose/typegoose";
import mongoose from "mongoose";
import { PaginatedModel } from "../common/pagination/pagination_configuration";

import { Clinic } from "./clinic.model";
import { NoteType } from "./note_type.model";
import { Patients } from "./patient.model";
import { User } from "./user.model";

export class Notes extends PaginatedModel {
  @prop({ type: String, default: null })
  notes!: string;

  @prop({ ref: NoteType, type: mongoose.Types.ObjectId })
  note_type!: Ref<NoteType> | null;

  @prop({ ref: Clinic, type: mongoose.Types.ObjectId })
  clinic_id!: Ref<Clinic> | null;

  @prop({ ref: "Patients", type: mongoose.Types.ObjectId })
  patient_id!: Ref<Patients> | null;

  @prop({ type: Boolean, default: false })
  isDeleted!: boolean;

  @prop({ type: Boolean, default: true })
  isActive!: boolean;

  @prop({ ref: "User", type: mongoose.Types.ObjectId })
  createdby_id!: Ref<User>;
}

const NOTES_DB_MODEL = getModelForClass(Notes, {
  schemaOptions: {
    collection: "notes",
    timestamps: true,
  },
});

export default NOTES_DB_MODEL;
