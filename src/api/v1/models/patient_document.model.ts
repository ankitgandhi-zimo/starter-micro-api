import {
  getModelForClass,
  index,
  prop,
  Ref,
} from "@typegoose/typegoose";
import { PaginatedModel } from "../common/pagination/pagination_configuration";
import { Patients } from "./patient.model";
import { User } from "./user.model";

@index({ title: "text" })
export class PatientsDoc extends PaginatedModel {
  @prop({ type: String })
  title!: string;

  @prop({ type: String })
  document!: string;

  @prop({ type: String })
  description!: string;

  @prop({ type: Boolean, default: false })
  isDeleted!: boolean;

  @prop({ ref: User })
  clinic_id!: Ref<User> | null;

  @prop({ ref: Patients })
  patient_id!: Ref<Patients> | null;

  @prop({ ref: User })
  createdby_id!: Ref<User> | null;
}

const PATIENT_DOC_DB_MODEL = getModelForClass(PatientsDoc, {
  schemaOptions: {
    collection: "patientdocs",
    timestamps: true,
  },
});

export default PATIENT_DOC_DB_MODEL;
