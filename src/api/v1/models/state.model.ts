import {
  getModelForClass,
  index,
  prop,
  Ref,
} from "@typegoose/typegoose";
import mongoose from "mongoose";
import { PaginatedModel } from "../common/pagination/pagination_configuration";
import { Country } from "./country.model";
import { User } from "./user.model";

@index({ stateName: "text" })
export class States extends PaginatedModel {
  @prop({ type: String, default: null })
  stateName!: string;

  @prop({ type: String, default: null })
  stateCode!: string;

  @prop({ type: Boolean, default: false })
  isDeleted!: boolean;

  @prop({ type: Boolean, default: true })
  isActive!: boolean;

  @prop({ ref: User, type: mongoose.Types.ObjectId })
  createdby_id!: Ref<User> | null;

  @prop({ ref: "Country", type: mongoose.Types.ObjectId })
  countryId!: Ref<Country> | null;
}

const STATE_DB_MODEL = getModelForClass(States, {
  schemaOptions: {
    collection: "states",
    timestamps: true,
  },
});

export default STATE_DB_MODEL;
