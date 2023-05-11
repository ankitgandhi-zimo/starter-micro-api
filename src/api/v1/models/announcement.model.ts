import { getModelForClass, index, prop, Ref } from "@typegoose/typegoose";
import { PaginatedModel } from "../common/pagination/pagination_configuration";
import { User } from "./user.model";

@index({ title: "text" })
export class Announcement extends PaginatedModel {
  @prop({ type: String, default: null })
  title!: string;

  @prop({ type: String, default: null })
  description!: string;

  @prop({ type: String, default: null })
  image!: string;

  @prop({ type: Boolean, default: true })
  isActive!: boolean;

  @prop({ type: Boolean, default: false })
  isDeleted!: boolean;

  @prop({ ref: "User" })
  createdby_id!: Ref<User>;
}

const ANNOUNCEMENT_DB_MODEL = getModelForClass(Announcement, {
  schemaOptions: {
    collection: "announcement",
    timestamps: true,
  },
});

export default ANNOUNCEMENT_DB_MODEL;
