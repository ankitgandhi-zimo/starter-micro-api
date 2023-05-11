import {
  getModelForClass,
  prop,
  Ref,
} from "@typegoose/typegoose";
import { PaginatedModel } from "../common/pagination/pagination_configuration";
import { Clinic } from "./clinic.model";
import { FormField } from "./dynamic_form.model";
import { User } from "./user.model";

// class MultiOptionObject {
//   @prop({ type: String, default: null })
//   display!: string;

//   @prop({ type: String, default: null })
//   value!: string;
// }
// class FieldsObject {
//   @prop({ type: String, default: null })
//   constKey!: string;

//   @prop({ type: String, default: null })
//   inputType!: string;

//   @prop({ type: String, default: null })
//   inputLabel!: string;

//   @prop({ type: Boolean, default: false })
//   isDeleted!: boolean;

//   @prop()
//   multiOption!: MultiOptionObject[] | null;
// }
// export class FormField {
//   @prop({ type: String, default: null, required: true })
//   input_label!: string;

//   @prop({
//     type: String,
//     enum: ["text", "checkbox", "radio", "title", "date", "dropdown"],
//     default: null,
//     required: true,
//   })
//   input_type!: string;

//   @prop({ type: Boolean, default: false })
//   required!: boolean;

//   @prop({ type: String, default: null })
//   options!: string[];

//   @prop({ type: String, default: null })
//   default!: string;
// }

export class ProgressNotes extends PaginatedModel {
  @prop({ type: String })
  form_title!: string;

  @prop({ type: Boolean, default: true })
  isActive!: boolean;

  @prop({ type: Boolean, default: false })
  isDeleted!: boolean;

  @prop({ type: Boolean, default: false })
  saveAsDraft!: boolean;

  @prop({ type: Boolean, default: false })
  import!: boolean;

  @prop({ ref: ProgressNotes, default: null })
  progress_note_id!: Ref<ProgressNotes> | null;

  @prop({ ref: Clinic, default: null })
  clinic_id!: Ref<Clinic> | null;

  // @prop()
  // fields!: FieldsObject[] | null;

  @prop({ type: FormField, default: [] })
  fields!: FormField[];

  @prop({ ref: User })
  createdby_id!: Ref<User> | null;
}

const PROGRESS_NOTES_DB_MODEL = getModelForClass(
  ProgressNotes,
  {
    schemaOptions: {
      collection: "progressnotes",
      timestamps: true,
    },
  }
);

export default PROGRESS_NOTES_DB_MODEL;
