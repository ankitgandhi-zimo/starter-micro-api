import {
  getModelForClass,
  prop,
  Ref,
} from "@typegoose/typegoose";
import { PaginatedModel } from "../common/pagination/pagination_configuration";
import { Clinic } from "./clinic.model";
import { FormField } from "./dynamic_form.model";
import { User } from "./user.model";

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

// export enum EAcceptedValues {
//   ACCEPTED = "accepted",
//   DECLINED = "declined",
//   PENDING = "pending",
//   SIGNUP = "signup",
// }

export class TreatmentPlan extends PaginatedModel {
  @prop({ type: String, default: "Treatment Plan" })
  form_title!: string;

  @prop({ type: Boolean, default: true })
  isActive!: boolean;

  @prop({ type: Boolean, default: false })
  isDeleted!: boolean;

  @prop({ ref: Clinic, default: null })
  clinic_id!: Ref<Clinic> | null;

  @prop({ type: Boolean, default: false })
  saveAsDraft!: boolean;

  @prop({ type: Boolean, default: false })
  import!: boolean;

  // @prop()
  // fields!: FieldsObject[] | null;

  @prop({ type: FormField, default: [] })
  fields!: FormField[];

  @prop({ ref: TreatmentPlan })
  treatment_plan_id!: Ref<TreatmentPlan> | null;

  @prop({ ref: User })
  createdby_id!: Ref<User> | null;

  // @prop()
  // graphicalArr!: GraphicalArrObject[] | null;
}

const TREATMENT_PLAN_DB_MODEL = getModelForClass(
  TreatmentPlan,
  {
    schemaOptions: {
      collection: "treatmentplan",
      timestamps: true,
    },
  }
);

export default TREATMENT_PLAN_DB_MODEL;
