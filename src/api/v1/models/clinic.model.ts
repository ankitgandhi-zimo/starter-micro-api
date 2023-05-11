import { getModelForClass, index, prop, Ref } from "@typegoose/typegoose";
import mongoose from "mongoose";
import { PaginatedModel } from "../common/pagination/pagination_configuration";
import { TreatmentPlan } from "./treatmentPlan.model";
import { User } from "./user.model";
import { Country } from "./country.model";
import { States } from "./state.model";
class TreatmentPlanObject {
  @prop({ ref: "TreatmentPlan", default: null })
  plan_id!: Ref<TreatmentPlan> | null;

  @prop({ type: Boolean, default: false })
  isDeleted!: boolean;
  @prop({ type: Boolean, default: true })
  isActive!: boolean;
}
class CancelObject {
  @prop({ type: Number, default: 24 })
  hours!: number;

  @prop({ type: Boolean, default: true })
  isAllowed!: boolean;
}
class RescheduleObject {
  @prop({ type: Number, default: 24 })
  hours!: number;

  @prop({ type: Boolean, default: false })
  isAllowed!: boolean;
}

class ClinicPolicyObject {
  @prop({ type: Number, default: 50 })
  noShowCharge!: number;

  @prop({ type: Boolean, default: false })
  isDeleted!: boolean;

  @prop({ type: Boolean, default: true })
  isActive!: boolean;

  @prop()
  cancel!: CancelObject;

  @prop()
  reschedule!: RescheduleObject;
}

export enum EClinicTypeValues {
  INDIVIDUAL = "individual",
  GROUP = "group",
}

@index({ clinic_name: "text" })
export class Clinic extends PaginatedModel {
  @prop({ type: String, default: null })
  clinic_name!: string;

  @prop({ type: String, default: null })
  image!: string;

  // @prop({ type: String, default: null })
  // contact_person_name!: string;

  // @prop({ type: String, default: null })
  // contact_person_mobile!: string;

  @prop({ type: String })
  mobile_no!: string;

  @prop({ type: String, default: null })
  designation!: string;

  @prop({
    enum: EClinicTypeValues,
    type: String,
    default: EClinicTypeValues.INDIVIDUAL,
  })
  clinic_type!: string;

  @prop({ ref: User, default: null })
  user_id!: Ref<User> | null;

  @prop({ type: Boolean, default: false })
  isDeleted!: boolean;

  @prop({ type: Boolean, default: true })
  isActive!: boolean;

  @prop({ type: String, default: null })
  office!: string;

  @prop({ type: String, default: null })
  fax!: string;

  // @prop({ type: String })
  // apartment!: string;

  // @prop({ type: String })
  // zip_code!: string;

  // @prop({ type: String, default: null })
  // taxonomy!: string;

  // // @prop({ type: String, default: null })
  // // fed_id!: string;

  // @prop({ type: String, default: null })
  // npiNo!: string;

  // @prop({ type: String, default: null })
  // address!: string;

  // @prop({ type: String, default: null })
  // postal_code!: string;

  // @prop({ type: String, default: null })
  // city!: string;

  // @prop({
  //   ref: Country,
  //   type: mongoose.Types.ObjectId,
  //   default: null,
  // })
  // country!: Ref<Country>;

  // @prop({
  //   ref: States,
  //   type: mongoose.Types.ObjectId,
  //   default: null,
  // })
  // state!: Ref<States>;

  // @prop()
  // treatmentPlan!: TreatmentPlanObject[] | null;

  @prop({ default: null })
  clinicPolicy!: ClinicPolicyObject | null;

  // @prop({ type: String, default: null })
  // randomClinicId!: string;

  // @prop({ type: String, default: null })
  // mobile_office!: string;

  // @prop({ type: String, default: null })
  // mobile_other!: string;

  // @prop({ type: String, default: null })
  // last_name!: string;
}
const CLINIC_DB_MODEL = getModelForClass(Clinic, {
  schemaOptions: {
    collection: "clinic",
    timestamps: true,
  },
});

export default CLINIC_DB_MODEL;
