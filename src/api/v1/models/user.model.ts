import {
  getModelForClass,
  index,
  prop,
  Ref,
} from "@typegoose/typegoose";
import mongoose from "mongoose";
import { PaginatedModel } from "../common/pagination/pagination_configuration";
import { Roles } from "./roles.model";

export enum EBoolValues {
  TRUE = "true",
  FALSE = "false",
}
export enum EPermissionValues {
  AVAILABILITY = "AVAILABILITY",
  SCHEDULER = "SCHEDULER",
  NOTES = "NOTES",
  SOAPNOTES = "SOAPNOTES",
  TREATMENTPLAN = "TREATMENTPLAN",
}

class PermissionObject {
  @prop({ type: String })
  name!: string;

  @prop({ type: EPermissionValues })
  key!: string;
}

export enum EAcceptedValues {
  ACCEPTED = "accepted",
  DECLINED = "declined",
  PENDING = "pending",
  SIGNUP = "signup",
}

@index({ first_name: "text" })
export class User extends PaginatedModel {
  @prop({ type: String })
  first_name!: string;

  @prop({ type: String, default: "" })
  last_name!: string;

  @prop({ type: String })
  email!: string;

  @prop({
    ref: "Roles",
    type: mongoose.Types.ObjectId,
    default: null,
  })
  role!: Ref<Roles> | null;

  @prop({ type: Number, default: null })
  mobile_no!: number;

  @prop({ type: String, default: null })
  password!: string;

  @prop({ type: String, default: null })
  image!: string;

  @prop({ ref: User, type: mongoose.Types.ObjectId })
  addedBy_id!: Ref<User> | null;

  @prop({ type: Boolean, default: true })
  isActive!: boolean;

  @prop({ type: Boolean, default: false })
  isDeleted!: boolean;

  @prop()
  role_permission!: any;
  @prop({ type: String, default: null })
  resetkey!: string;

  // @prop({
  //   enum: EAcceptedValues,
  //   type: String,
  //   default: EAcceptedValues.PENDING,
  // })
  // isAccepted!: string;

  // @prop({ type: String, default: null })
  // address!: string;

  // @prop({ type: String, default: null })
  // zip_code!: string;

  // @prop({ type: String })
  // city!: string;

  // @prop()
  // permission!: PermissionObject[] | null;

  // @prop({ type: Date, default: null })
  // date_of_birth!: Date;

  // @prop({ ref: User, type: mongoose.Types.ObjectId })
  // invitedby_id!: Ref<User> | null;

  // @prop({
  //   ref: "States",
  //   type: mongoose.Types.ObjectId,
  //   default: null,
  // })
  // state!: Ref<States> | null;

  // @prop({
  //   ref: "Country",
  //   type: mongoose.Types.ObjectId,
  //   default: null,
  // })
  // country!: Ref<Country> | null;

  // @prop({ type: String, default: null })
  // deactivateReason!: string;

  // @prop({ type: Boolean, default: false })
  // isPlanCancelled!: boolean;
}

const USER_DB_MODEL = getModelForClass(User, {
  schemaOptions: {
    collection: "users",
    timestamps: true,
  },
});

export default USER_DB_MODEL;
