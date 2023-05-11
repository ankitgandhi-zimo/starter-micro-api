import {
  getModelForClass,
  index,
  prop,
  Ref,
} from "@typegoose/typegoose";
import { User } from "./user.model";
class PermissionValues {
  @prop({ type: String, default: null })
  label!: string;

  @prop({ type: Boolean, default: true })
  read!: boolean;

  @prop({ type: Boolean, default: true })
  write!: boolean;
}
class PermissionSchema {
  [key: string]: PermissionValues;
}
@index({ roleTitle: "text" })
export class Roles {
  @prop({ type: String, default: null })
  roleTitle!: string;

  @prop({ type: String, default: null })
  roleName!: string;

  @prop({ type: Boolean, default: true })
  isActive!: boolean;

  @prop({ type: Boolean, default: false })
  isDeleted!: boolean;

  @prop({ type: Boolean, default: false })
  isBillingTeam!: boolean;

  @prop({ ref: User, default: null })
  createdby_id!: Ref<User> | null;

  @prop({ _id: false })
  permission!: any; //PermissionSchema;
}
const ROLES_DB_MODEL = getModelForClass(Roles, {
  schemaOptions: {
    collection: "roles",
    timestamps: true,
  },
});
export default ROLES_DB_MODEL;
