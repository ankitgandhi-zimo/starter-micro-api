import {
  getModelForClass,
  index,
  prop,
  Ref,
} from "@typegoose/typegoose";
import mongoose from "mongoose";
import { PaginatedModel } from "../common/pagination/pagination_configuration";
import { User } from "./user.model";

@index({ name: "text" })
export class LoginToken extends PaginatedModel {
  @prop({ type: String })
  token!: string;

  @prop({ ref: User, type: mongoose.Types.ObjectId })
  user_id!: Ref<User> | null;
}

const APPOINTMENT_TYPE_DB_MODEL = getModelForClass(
  LoginToken,
  {
    schemaOptions: {
      collection: "login_token",
      timestamps: true,
    },
  }
);

export default APPOINTMENT_TYPE_DB_MODEL;
