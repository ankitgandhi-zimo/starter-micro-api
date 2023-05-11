import {
  getModelForClass,
  index,
  prop,
  Ref,
} from "@typegoose/typegoose";
import mongoose from "mongoose";
import { PaginatedModel } from "../common/pagination/pagination_configuration";
import { User } from "./user.model";

@index({ skillName: "text" })
export class Skill extends PaginatedModel {
  @prop({ type: String, default: null })
  skillName!: string;

  @prop({ type: Boolean, default: false })
  isDeleted!: boolean;

  @prop({ type: Boolean, default: true })
  isActive!: boolean;

  @prop({ ref: "Users", type: mongoose.Types.ObjectId })
  createdby_id!: Ref<User> | null;
}

const SKILL_DB_MODEL = getModelForClass(Skill, {
  schemaOptions: {
    collection: "skill",
    timestamps: true,
  },
});

export default SKILL_DB_MODEL;
