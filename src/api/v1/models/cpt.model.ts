import {
  getModelForClass,
  index,
  prop,
  Ref,
} from "@typegoose/typegoose";
import { PaginatedModel } from "../common/pagination/pagination_configuration";
import { User } from "./user.model";

@index({ cptCode: "text" })
export class CPTCodes extends PaginatedModel {
  @prop({ type: Number, default: 0 })
  price!: number;

  @prop({ type: String, default: null, unique: true })
  cptCode!: string;

  @prop({ type: String, default: null })
  description!: string;

  @prop({ type: Boolean, default: true })
  isActive!: boolean;

  @prop({ type: Boolean, default: false })
  isDeleted!: boolean;

  @prop({ ref: User, default: null })
  createdby_id!: Ref<User> | null;
}

const CPT_CODE_DB_MODEL = getModelForClass(CPTCodes, {
  schemaOptions: {
    collection: "cpt",
    timestamps: true,
  },
});

export default CPT_CODE_DB_MODEL;
