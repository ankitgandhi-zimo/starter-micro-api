import {
  getModelForClass,
  index,
  prop,
  Ref,
} from "@typegoose/typegoose";
import { PaginatedModel } from "../common/pagination/pagination_configuration";
import { User } from "./user.model";

@index({ modifierCode: "text" })
export class Modifiers extends PaginatedModel {
  @prop({ type: String, default: null })
  description!: string;

  @prop({ type: String, default: null, unique: true })
  modifierCode!: string;

  @prop({ type: Boolean, default: true })
  isActive!: boolean;

  @prop({ type: Boolean, default: false })
  isDeleted!: boolean;

  @prop({ ref: User, default: null })
  createdby_id!: Ref<User> | null;
}

const MODIFIERS_DB_MODEL = getModelForClass(Modifiers, {
  schemaOptions: {
    collection: "modifiers",
    timestamps: true,
  },
});

export default MODIFIERS_DB_MODEL;
