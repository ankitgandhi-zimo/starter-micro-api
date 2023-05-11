import {
  getModelForClass,
  index,
  mongoose,
  prop,
  Ref,
} from "@typegoose/typegoose";
import { PaginatedModel } from "../common/pagination/pagination_configuration";
import { Clinic } from "./clinic.model";
import { User } from "./user.model";

@index({ category: "text" })
export class FormCategory extends PaginatedModel {
  @prop({ type: String, default: null })
  category!: string;

  @prop({ type: Boolean, default: true })
  isActive!: boolean;

  @prop({ type: Boolean, default: false })
  isDeleted!: boolean;

  @prop({ ref: User, default: null })
  createdby_id!: Ref<User> | null;

  @prop({ ref: Clinic, type: mongoose.Types.ObjectId })
  clinic_id!: Ref<Clinic> | null;
}

const FORM_CATEGORY_DB_MODEL = getModelForClass(
  FormCategory,
  {
    schemaOptions: {
      collection: "form_category",
      timestamps: true,
    },
  }
);

export default FORM_CATEGORY_DB_MODEL;
