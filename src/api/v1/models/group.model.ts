import {
  getModelForClass,
  index,
  prop,
} from "@typegoose/typegoose";
import { PaginatedModel } from "../common/pagination/pagination_configuration";

@index({ name: "text" })
export class ClinicGroup extends PaginatedModel {
  @prop({ type: String })
  name!: string;

  @prop({ type: String })
  group_id!: string;

  // @prop({ ref: "Clinic", unique: true })
  // associated_clinics!: Ref<Clinic>[] | null;

  @prop({ type: Boolean, default: true })
  isActive!: boolean;

  @prop({ type: Boolean, default: false })
  isDeleted!: boolean;

  // @prop({ ref: User, default: null })
  // createdby_id!: Ref<User> | null;
}

const GROUP_DB_MODEL = getModelForClass(ClinicGroup, {
  schemaOptions: {
    collection: "clinic_groups",
    timestamps: true,
  },
});

export default GROUP_DB_MODEL;
