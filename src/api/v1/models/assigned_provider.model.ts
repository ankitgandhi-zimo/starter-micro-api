import {
  getModelForClass,
  prop,
  Ref,
} from "@typegoose/typegoose";
import { PaginatedModel } from "../common/pagination/pagination_configuration";
import { Patients } from "./patient.model";
import { User } from "./user.model";

export class AssignProvider extends PaginatedModel {
  @prop({ ref: User })
  clinic_id!: Ref<User> | null;

  @prop({ ref: User })
  doctor_id!: Ref<User> | null;

  @prop({ ref: User })
  createdby_id!: Ref<User> | null;

  @prop({ ref: Patients })
  patient_id!: Ref<Patients> | null;
}

const ASSIGNED_PROVIDERS_DB_MODEL = getModelForClass(
  AssignProvider,
  {
    schemaOptions: {
      collection: "assignedProvider",
      timestamps: true,
    },
  }
);

export default ASSIGNED_PROVIDERS_DB_MODEL;
