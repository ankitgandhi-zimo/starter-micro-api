import {
  getModelForClass,
  index,
  prop,
  Ref,
} from "@typegoose/typegoose";
import { PaginatedModel } from "../common/pagination/pagination_configuration";
import { User } from "./user.model";

export enum ECodeCategoryValues {
  ICD_9 = "ICD-9",
  ICD_10 = "ICD-10",
}

@index({ ictCode: "text" })
export class ICTCodes extends PaginatedModel {
  @prop({ type: String, default: null })
  ictCode!: string;

  @prop({ type: String, default: null })
  description!: string;
  @prop({ type: Boolean, default: true })
  isActive!: boolean;

  @prop({ type: Boolean, default: false })
  isDeleted!: boolean;

  @prop({ ref: User, default: null })
  createdby_id!: Ref<User> | null;

  @prop({
    enum: ECodeCategoryValues,
    type: String,
    default: null,
  })
  codeCategory!: string;
}

const ICT_CODE_DB_MODEL = getModelForClass(ICTCodes, {
  schemaOptions: {
    collection: "icts",
    timestamps: true,
  },
});

export default ICT_CODE_DB_MODEL;
