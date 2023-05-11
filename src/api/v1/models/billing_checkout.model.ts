import {
  getModelForClass,
  prop,
  Ref,
} from "@typegoose/typegoose";
import { PaginatedModel } from "../common/pagination/pagination_configuration";
import { Appointment } from "./appointment.model";
import { CPTCodes } from "./cpt.model";
import { FinancialClass } from "./financialclass.model";
import { ICTCodes } from "./ict.model";
import { ClinicLocation } from "./location.model";
import { Patients } from "./patient.model";
import { User } from "./user.model";

export enum EBatchValues {
  DONE = "DONE",
  PENDING = "PENDING",
}

export enum EAssignmentValues {
  A = "A",
  C = "C",
}

export enum EResubmissionCodeValues {
  ONE = "1",
  SEVEN = "7",
  EIGHT = "8",
}

export enum EBillingCoverageValues {
  Primary = "Primary",
  Secondary = "Secondary",
  Tertiary = "Tertiary",
  NULL = "null",
}

export enum EResponsiblePartyValues {
  FAMILY = "FAMILY",
  INSURANCE = "INSURANCE",
  NULL = "null",
}

export enum EInsuranceBatchValues {
  COMPLETE = "COMPLETE",
  EDI_AND_CMS_DONE = "EDI_AND_CMS_DONE",
  AR_APPROVED = "AR_APPROVED",
  CLINIC_APPROVED = "CLINIC_APPROVED",
  CLINIC_APPROVAL_PENDING = "CLINIC_APPROVAL_PENDING",
}

export enum EAcknowledgementStatusValues {
  CH_ACCEPTED = "CH_ACCEPTED",
  CH_REJECTED = "CH_REJECTED",
  CH_ACCEPTED_WITH_ERROR = "CH_ACCEPTED_WITH_ERROR",
  SEND_TO_PAYER = "SEND_TO_PAYER",
  PAYER_RECEIVED = "PAYER_RECEIVED",
  PAYER_ACCEPTED = "PAYER_ACCEPTED",
  PAYER_REJECTED = "PAYER_REJECTED",
  NULL = "null",
}

export enum EClaimStatusValues {
  PATIENT_RESPONSIBLE = "PATIENT_RESPONSIBLE",
  BILLED_TO_PATIENT = "BILLED_TO_PATIENT",
  CLAIM_GENRATED = "CLAIM_GENRATED",
  SEND_ON_PAPER = "SEND_ON_PAPER",
  SEND_TO_CH = "SEND_TO_CH",
  CH_SCRUB_ERROR = "CH_SCRUB_ERROR",
  CH_CONFIRMED = "CH_CONFIRMED",
  PAID = "PAID",
  REJECTED = "REJECTED",
  COMPLETED = "COMPLETED",
  NULL = "null",
}
class LinkObject {
  @prop({ type: String, default: null })
  url!: string;

  @prop({ type: String, default: null })
  id!: string;

  @prop({ type: String, default: null })
  resetKey!: string;
}

export enum EFullObjTypeValues {
  CASH = "CASH",
  CARD = "CARD",
  CHEQUE = "CHEQUE",
  LINK = "LINK",
}
class FullObject {
  // @prop({ ref: cards })
  // card_id!: Ref<cards> ;

  @prop({ type: String, default: null })
  email!: string;

  @prop({ type: String, default: null })
  cheque!: string;

  @prop({ type: LinkObject })
  link!: LinkObject;

  @prop({ type: Boolean, default: false })
  status!: boolean;

  @prop({ enum: EFullObjTypeValues })
  type!: string;

  @prop({ type: String, default: "" })
  notes!: string;
}
export enum EPaymentModeValues {
  CASH = "CASH",
  CARD = "CARD",
  CHECQUE = "CHECQUE",
  LINK = "LINK",
}
class ReceiveObject {
  @prop({ enum: EPaymentModeValues })
  paymentMode!: string;

  @prop({ type: Number, default: 0 })
  amount!: number;

  @prop({ type: Date, default: null })
  date!: string;
}
class CptCodeObject {
  @prop({ type: Number, default: 1 })
  unit!: number;
  @prop({ ref: CPTCodes })
  code_id!: Ref<CPTCodes>;

  @prop({ type: [Number] })
  icd!: number[];

  // @prop({ ref: "modifiers", default:null })
  // modifier!: Ref<modifiers>[];
}
class BillingCodesObject {
  @prop({ ref: ICTCodes })
  ICD_9!: Ref<ICTCodes>;

  @prop({ ref: ICTCodes })
  ICD_10!: Ref<ICTCodes>;

  @prop({ type: CptCodeObject })
  cptCode!: CptCodeObject[] | null;
}

class EInsuranceObject {
  @prop({ type: Boolean, default: false })
  status!: boolean;

  @prop({ type: Number, default: 0 })
  amount!: number;

  @prop({ type: Number, default: 0 })
  receive!: number;

  @prop({ type: Date, default: null })
  date!: string;

  @prop({
    enum: EBillingCoverageValues,
    default: EBillingCoverageValues.NULL,
  })
  coverage!: string;

  @prop({
    type: String,
    default: EAcknowledgementStatusValues.NULL,
  })
  acknowledgementStatus!: string;

  @prop({
    type: String,
    default: EClaimStatusValues.NULL,
  })
  claimStatus!: string;

  @prop({
    type: String,
    default: EInsuranceBatchValues.CLINIC_APPROVAL_PENDING,
  })
  batch!: string;
}

class CopayObject {
  @prop({ type: Number, default: 0 })
  amount!: number;

  @prop({ type: String, default: "" })
  notes!: string;

  @prop({ type: Boolean, default: false })
  status!: boolean;

  @prop({ type: String, default: "FULL" })
  type!: string;

  // : { type: String, enum: ['FULL' /*, 'EMI', 'SPLIT'*/] },
  @prop({
    enum: EBatchValues,
    default: EBatchValues.PENDING,
  })
  batch!: string;

  @prop({ type: FullObject })
  full!: FullObject;

  @prop({ type: ReceiveObject })
  receive!: ReceiveObject;
}

// @index({ placeOfService: "text" })
export class BillingCheckout extends PaginatedModel {
  // @prop({ type: Date, default: null })
  // endDate!: string;

  // @prop({ type: mongoose.Types.ObjectId })
  // createdby_id!: mongoose.Types.ObjectId;

  @prop({ type: Number, default: 0 })
  duration!: number;

  @prop({ type: Date, default: null })
  runDate!: string;

  @prop({ type: Number, default: 0 })
  totalAmount!: number;

  @prop({ type: String, default: null })
  placeOfService!: string;

  @prop({ type: String, default: "MEDICALCARE" })
  typeOfService!: string;

  @prop({
    enum: EBatchValues,
    default: EBatchValues.PENDING,
  })
  batch!: string;

  @prop({ type: Date, default: null })
  toDOS!: string;

  @prop({ type: Boolean, default: false })
  paper!: boolean;

  @prop({ type: Boolean, default: false })
  noShow!: boolean;

  @prop({ type: String, default: null })
  orignalRefNo!: string;

  @prop({ ref: User, default: null })
  clinic_id!: Ref<User> | null;

  @prop({ ref: "User" })
  doctor_id!: Ref<User> | null;

  @prop({ ref: "Patients" })
  patient_id!: Ref<Patients> | null;

  @prop({ ref: "ClinicLocation" })
  location_id!: Ref<ClinicLocation> | null;

  @prop({ ref: "Appointment" })
  appointment_id!: Ref<Appointment> | null;

  @prop({ ref: "FinancialClass", default: null })
  financialClass_id!: Ref<FinancialClass> | null;

  @prop({ ref: "User" })
  associate_id!: Ref<User> | null;

  @prop({
    enum: EAssignmentValues,
    default: EAssignmentValues.A,
  })
  acceptAssignment!: string;

  @prop({
    enum: EResubmissionCodeValues,
    default: EResubmissionCodeValues.ONE,
  })
  resubmissionCode!: string;

  @prop({
    enum: EResponsiblePartyValues,
    default: EResponsiblePartyValues.NULL,
  })
  responsibleParty!: string;

  @prop()
  insurance!: EInsuranceObject;

  @prop({ type: BillingCodesObject })
  codes!: BillingCodesObject;

  @prop({ type: CopayObject })
  copay!: CopayObject;
}

const BILLING_CHECKOUT_DB_MODEL = getModelForClass(
  BillingCheckout,
  {
    schemaOptions: {
      collection: "billingCheckout",
      timestamps: true,
    },
  }
);

export default BILLING_CHECKOUT_DB_MODEL;
