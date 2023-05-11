import { getModelForClass, mongoose, prop, Ref } from "@typegoose/typegoose";
import { PaginatedModel } from "../common/pagination/pagination_configuration";
import { Clinic } from "./clinic.model";
import { User } from "./user.model";

export enum EStatusValues {
  PENDING = "PENDING",
  SUCCESS = "SUCCESS",
  FAILED = "FAILED",
}

export enum ETypeValues {
  PROVIDER = "PROVIDER",
  PATIENT = "PATIENT",
  APPOINTMENT = "APPOINTMENT",
  DOCTORCHECKOUT = "DOCTORCHECKOUT",
}

export class FetchData extends PaginatedModel {
  @prop({
    enum: ETypeValues,
    type: String,
    default: null,
  })
  type!: string;

  @prop({ type: Date, default: null })
  fetch_time!: Date;

  @prop({ type: Date, default: null })
  last_fetch_time!: Date;

  @prop({ type: mongoose.Types.ObjectId, default: [] })
  conflicted_ids!: mongoose.Types.ObjectId[];

  // @prop({
  //   enum: EStatusValues,
  //   type: String,
  //   default: EStatusValues.PENDING,
  // })
  // status!: string;

  @prop({ ref: User, default: null })
  createdby_id!: Ref<User> | null;

  @prop({ ref: Clinic, type: mongoose.Types.ObjectId })
  clinic_id!: Ref<Clinic> | null;
}

const FETCH_DATA_DB_MODEL = getModelForClass(FetchData, {
  schemaOptions: {
    collection: "fetch_data",
    timestamps: true,
  },
});

export default FETCH_DATA_DB_MODEL;
