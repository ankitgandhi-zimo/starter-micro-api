import {
  getModelForClass,
  prop,
  Ref,
} from "@typegoose/typegoose";
import mongoose from "mongoose";
import { PaginatedModel } from "../common/pagination/pagination_configuration";
import { Clinic } from "./clinic.model";
import { FormCategory } from "./form_category.model";
import { User } from "./user.model";

export class FormField {
  @prop({ type: String, default: null, required: true })
  input_label!: string;

  @prop({
    type: String,
    enum: [
      "text",
      "checkbox",
      "radio",
      "title",
      "date",
      "dropdown",
    ],
    default: null,
    required: true,
  })
  input_type!: string;

  @prop({ type: Boolean, default: false })
  required!: boolean;

  @prop({ type: String, default: null })
  options!: string[];

  @prop({ default: null })
  default!: any;
}

export class DynamicForm extends PaginatedModel {
  @prop({ type: Boolean, default: false })
  isDeleted!: boolean;

  @prop({ type: Boolean, default: true })
  isActive!: boolean;

  @prop({ type: Boolean, default: false })
  saveAsDraft!: boolean;

  @prop({ type: Boolean, default: false })
  import!: boolean;

  @prop({ type: String, default: null })
  form_title!: string;

  @prop({ ref: FormCategory, default: null })
  category!: Ref<FormCategory> | null;

  @prop({ type: FormField, default: [], required: true })
  fields!: FormField[];

  //Used when importing form
  @prop({ ref: DynamicForm, default: null })
  form_id!: Ref<DynamicForm> | null;

  @prop({ ref: Clinic, default: null })
  clinic_id!: Ref<Clinic> | null;

  @prop({ ref: User, type: mongoose.Types.ObjectId })
  createdby_id!: Ref<User> | null;
}

const DYNAMIC_FORM_DB_MODEL = getModelForClass(
  DynamicForm,
  {
    schemaOptions: {
      collection: "dynamic_form",
      timestamps: true,
    },
  }
);

export default DYNAMIC_FORM_DB_MODEL;
