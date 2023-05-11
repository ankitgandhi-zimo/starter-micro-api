import { getModelForClass, index, prop, Ref } from "@typegoose/typegoose";
import mongoose from "mongoose";
import { PaginatedModel } from "../common/pagination/pagination_configuration";
import { User } from "./user.model";

@index({ name: "text" })
export class Permission extends PaginatedModel {
  @prop({ type: String, default: null })
  name!: string;

  @prop({ type: Boolean, default: true })
  isActive!: boolean;

  @prop({ type: Boolean, default: false })
  isDeleted!: boolean;

  @prop({ ref: "Users", type: mongoose.Types.ObjectId })
  createdby_id!: Ref<User> | null;
}

const PERMISSION_DB_MODEL = getModelForClass(Permission, {
  schemaOptions: {
    collection: "permission",
    timestamps: true,
  },
});

export default PERMISSION_DB_MODEL;
