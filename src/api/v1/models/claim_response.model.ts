import {
  getModelForClass,
  index,
  prop,
  Ref,
} from "@typegoose/typegoose";
import { PaginatedModel } from "../common/pagination/pagination_configuration";
import { Clinic } from "./clinic.model";
import { SuperBill } from "./super_bill.model";

export class PayerObject {
  @prop({ type: String })
  payerName!: string;

  @prop({ type: String })
  payerID!: string;
}

export enum EClaimType {
  PRO = "PRO",
  INST = "INST",
}
export class ClaimReferenceObject {
  @prop({ type: String })
  correlationId!: string;

  @prop({ type: String })
  submitterId!: string;

  @prop({ type: String })
  customerClaimNumber!: string;

  @prop({ type: String })
  patientControlNumber!: string;

  @prop({ type: Date })
  timeOfResponse!: string;

  @prop({ enum: EClaimType, type: String })
  claimType!: string;

  @prop({ type: String })
  formatVersion!: string;

  @prop({ type: String })
  rhclaimNumber!: string;
}

export class MetaObject {
  @prop({ type: String })
  submitterId!: string;

  @prop({ type: String })
  senderId!: string;

  @prop({ type: String })
  billerId!: string;

  @prop({ type: String })
  traceId!: string;

  @prop({ type: String })
  controlNumber!: string;

  @prop({ type: String })
  applicationMode!: string;
}
@index({ status: "text" })
export class ClaimResponse extends PaginatedModel {
  @prop({ type: String })
  status!: string;

  @prop({ type: String })
  controlNumber!: string;

  @prop({ type: String })
  invoice!: string;

  @prop({ type: String })
  tradingPartnerServiceId!: string;

  @prop({ type: ClaimReferenceObject })
  claimReference!: ClaimReferenceObject;

  @prop({ type: MetaObject })
  meta!: MetaObject;

  @prop({ type: String, default: "FALSE" })
  editStatus!: string;

  @prop({ type: PayerObject })
  payer!: PayerObject;

  @prop({ ref: SuperBill })
  superBillId!: Ref<SuperBill> | null;

  @prop({ ref: Clinic, default: null })
  clinic_id!: Ref<Clinic> | null;

  // Added new feilds  by charnjit

  // @prop({ ref: User })
  // createdby_id!: Ref<User> | NullableBoolean;

  // @prop({ ref: Patients })
  // patient_id!: Ref<Patients> | null;

  // @prop({
  //   ref: Doctor,
  //   type: mongoose.Types.ObjectId,
  //   field: "user_id",
  // })
  // rendering_provider_id!: Ref<Doctor> | null;

  // @prop({
  //   ref: Doctor,
  //   type: mongoose.Types.ObjectId,
  //   field: "user_id",
  // })
  // billing_provider_id!: Ref<Doctor> | null;

  // @prop({ type: Date, default: null })
  // startDateTime!: string;

  // @prop({ type: Date, default: null })
  // endDateTime!: string;

  // @prop({
  //   ref: "ClinicLocation",
  //   type: mongoose.Types.ObjectId,
  // })
  // location_id!: Ref<ClinicLocation> | null;

  // @prop({ ref: "Patients", type: mongoose.Types.ObjectId })
  // patient_id!: Ref<Patients> | null;

  // @prop({
  //   enum: EVisitTypeValues,
  //   type: String,
  // })
  // visitType!: string;

  // @prop({
  //   ref: AppointmentType,
  //   type: mongoose.Types.ObjectId,
  // })
  // appointmentType_id!: Ref<AppointmentType> | null;

  // @prop()
  // cptCode!: mongoose.Types.ObjectId[];
}

const CLAIM_RESPONSE_DB_MODEL = getModelForClass(
  ClaimResponse,
  {
    schemaOptions: {
      collection: "claim_response",
      timestamps: true,
      strict: false,
    },
  }
);

export default CLAIM_RESPONSE_DB_MODEL;
