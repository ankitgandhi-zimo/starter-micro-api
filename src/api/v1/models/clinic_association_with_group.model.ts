import {
  getModelForClass,
  prop,
  Ref,
} from "@typegoose/typegoose";
import { PaginatedModel } from "../common/pagination/pagination_configuration";
import { Clinic } from "./clinic.model";
import { ClinicGroup } from "./group.model";

export class ClinicAssociationGroup extends PaginatedModel {
  @prop({ ref: "ClinicGroup" })
  group_id!: Ref<ClinicGroup> | null;

  @prop({ ref: "Clinic" })
  clinic_id!: Ref<Clinic> | null;

  //   @prop({ type: Boolean, default: true })
  //   isActive!: boolean;

  @prop({ type: Boolean, default: false })
  isDeleted!: boolean;

  //   @prop({ ref: User, default: null })
  //   createdby_id!: Ref<User> | null;
}

const GROUP_ASSOCIATION_DB_MODEL = getModelForClass(
  ClinicAssociationGroup,
  {
    schemaOptions: {
      collection: "clinic_association_groups",
      timestamps: true,
    },
  }
);

export default GROUP_ASSOCIATION_DB_MODEL;
