import {
  getModelForClass,
  prop,
  Ref,
} from "@typegoose/typegoose";
import mongoose from "mongoose";
import { PaginatedModel } from "../common/pagination/pagination_configuration";

import { Clinic } from "./clinic.model";
import { User } from "./user.model";

export class NoteType extends PaginatedModel {
  @prop({ type: String, default: null })
  type!: string;

  @prop({ type: Boolean, default: false })
  isDeleted!: boolean;

  @prop({ type: Boolean, default: true })
  isActive!: boolean;

  @prop({ ref: Clinic, type: mongoose.Types.ObjectId })
  clinic_id!: Ref<Clinic>;

  @prop({ ref: "User", type: mongoose.Types.ObjectId })
  createdby_id!: Ref<User>;
}

const NOTE_TYPE_DB_MODEL = getModelForClass(NoteType, {
  schemaOptions: {
    collection: "note_type",
    timestamps: true,
  },
});

export default NOTE_TYPE_DB_MODEL;
