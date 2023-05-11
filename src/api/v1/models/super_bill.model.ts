import { getModelForClass, index, prop, Ref } from "@typegoose/typegoose";
import mongoose from "mongoose";
import { PaginatedModel } from "../common/pagination/pagination_configuration";
import { Appointment } from "./appointment.model";
import { EBillingModeValues, EBillMethodValues } from "./billing_payment.model";
import { Clinic } from "./clinic.model";
import { CPTCodes } from "./cpt.model";
import { Doctor } from "./doctor.model";
import { FinancialClass } from "./financialclass.model";
import { ICTCodes } from "./ict.model";
import { Insurance } from "./insurance/insurance.model";
import { ClinicLocation } from "./location.model";
import { Modifiers } from "./modifiers.model";
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

  @prop({ type: String, default: null }) //null
  type?: string;

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
export class LinkedICDS {
  @prop({ type: Number, default: null })
  icd!: number[];

  @prop({ type: Number, default: 0 })
  pos!: number;

  @prop({ type: Number, default: null })
  quantity!: number;

  @prop({ type: Number, default: null })
  charges!: number;
}

export class CPT {
  @prop({
    ref: CPTCodes,
    type: mongoose.Types.ObjectId,
    default: null,
  })
  cpt_code_id!: Ref<CPTCodes> | null;

  // @prop({ type: String, default: null })
  // cptCode!: string;

  // @prop({ type: String, default: null })
  // description!: string;

  // @prop({ type: Number, default: 0 })
  // fee!: number;

  @prop({ type: Number, default: null })
  unit!: number;

  @prop({
    ref: Modifiers,
    type: mongoose.Types.ObjectId,
    default: [],
  })
  modifier!: Ref<Modifiers>[];

  @prop({ type: Number, default: [] })
  icd!: number[];
  // @prop({ type: LinkedICDS, default: null })
  // linkedIcd?: LinkedICDS;
}

export class ICD {
  @prop({
    ref: ICTCodes,
    type: mongoose.Types.ObjectId,
    default: null,
  })
  icd_id!: Ref<ICTCodes> | null;

  @prop({ type: String, default: null })
  icdCode!: string;

  @prop({ type: String, default: null })
  description!: string;
}

export class ClaimStatusObjectValues {
  @prop({ type: String, default: null })
  claimStatus!: string;

  @prop({ type: Date, default: null })
  submitDate!: string;
}

export enum BillStatus {
  QUICKSAVE = "quickSave",
  QUICKSAVEANDSIGNOF = "quickSaveSignOff",
  LINKANDSAVE = "linkAndSave",
  LINKSAVESIGNOFF = "linkSaveSignOff",
  NOLINKSAVE = "noLinkSave",
}
export enum EAssignedStatus {
  ASSIGNED = "assigned",
  UNASSIGNED = "unassigned",
}
@index({ status: "text" })
export class SuperBill extends PaginatedModel {
  @prop({ type: Boolean, default: false })
  isDeleted!: boolean;

  @prop({ type: Boolean, default: true })
  isActive!: boolean;

  @prop({
    enum: BillStatus,
    type: String,
    default: BillStatus.QUICKSAVE,
  })
  status!: string;

  @prop({ type: Boolean, default: false })
  resubmit!: boolean;

  // patient detail
  @prop({ ref: Patients, type: mongoose.Types.ObjectId })
  patient_id!: Ref<Patients> | null;

  @prop({ ref: Appointment, type: mongoose.Types.ObjectId })
  appointment_id!: Ref<Appointment> | null;

  @prop({ ref: Clinic, type: mongoose.Types.ObjectId })
  clinic_id!: Ref<Clinic> | null;

  @prop({
    type: String,
    default: null,
  })
  payer_id!: string;

  @prop({ type: String, default: null })
  responsible_party_name!: string;

  @prop({ type: String, default: null })
  insurance_name!: string;

  @prop({
    ref: Insurance,
    type: mongoose.Types.ObjectId,
  })
  insurance_id!: Ref<Insurance> | null;

  //patient detail end

  // @prop({ type: Patient_Details, default: null })
  // patient_details!: Patient_Details;

  // provider detail

  @prop({
    ref: Doctor,
    type: mongoose.Types.ObjectId,
    /// field: "user_id",
  })
  referring_provider_id!: Ref<Doctor> | null; //provider in appointment

  @prop({
    ref: Doctor,
    type: mongoose.Types.ObjectId,
    //field: "user_id",
  })
  rendering_provider_id!: Ref<Doctor> | null;

  @prop({
    ref: Doctor,
    type: mongoose.Types.ObjectId,
    //field: "user_id",
  })
  billing_provider_id!: Ref<Doctor> | null;

  @prop({ type: Date, default: null })
  fromDate!: string;

  @prop({ type: Date, default: null })
  toDate!: string;

  @prop({ type: Number, default: 0 })
  duration!: number;

  @prop({ type: String, default: "MEDICALCARE" })
  type_of_service!: string;

  @prop({ type: String, default: null })
  place_of_service!: string;

  @prop({ type: CPT })
  cpt!: CPT[];

  // @prop({ type: ICD })
  // icd!: ICD[];

  @prop({
    ref: ICTCodes,
    type: mongoose.Types.ObjectId,
    default: [],
  })
  icd!: Ref<ICTCodes>[];

  @prop({ ref: FinancialClass, default: null })
  financial_class_id!: Ref<FinancialClass>;

  @prop({ type: Number, default: 0 })
  total_amount!: number;

  @prop({ type: Boolean, default: true })
  responsible_party!: boolean;

  @prop({ type: Boolean, default: true })
  accept_assignment!: boolean;

  //provider detail ends
  // @prop({ type: Provider_Details, default: [] })
  // provider_details!: Provider_Details[];

  // @prop({ type: Number, default: 0 })
  // total_amount!: number;

  //copay details
  // @prop({
  //   enum: EBillMethodValues,
  //   type: String,
  //   default: EBillMethodValues.FULL,
  // })
  // payment_option!: string;

  // //@prop({ type: String, default: null })
  // @prop({
  //   enum: EBillingModeValues,
  //   type: String,
  //   default: EBillingModeValues.CASH,
  // })
  // payment_mode!: string;

  @prop({ type: Boolean, default: false })
  received_cash!: boolean;

  //resubmissionCode: { type: String, enum: ['1', '7', '8'], default: '1' },

  //@prop({ type: String, default: "" })
  @prop({
    enum: EResubmissionCodeValues,
    type: String,
    default: EResubmissionCodeValues.ONE,
  })
  resubmissionCode!: string;

  // @prop({ type: Number, default: 0 })
  // copay!: number;

  // @prop({ type: String, default: null })
  // cheque_number!: string;

  @prop({ type: String, default: null })
  notes!: string;

  // @prop({ type: String, default: null })
  // email!: string;

  @prop({ type: Boolean, default: false })
  marked_as_printed!: boolean;
  // copay details ends

  // @prop({ type: CoPay, default: null })
  // copay_details!: CoPay;

  @prop({ ref: User, type: mongoose.Types.ObjectId })
  createdby_id!: Ref<User> | null;

  @prop({
    enum: EAssignedStatus,
    type: String,
    default: EAssignedStatus.UNASSIGNED,
  })
  assignedStatus!: string;

  @prop()
  insurance!: EInsuranceObject;

  @prop({ type: CopayObject })
  copay!: CopayObject;
  @prop({
    type: ClaimStatusObjectValues,
    default: () => ({}),
    _id: false,
  })
  ClaimStatusObject!: ClaimStatusObjectValues;

  @prop({
    ref: ClinicLocation,
    type: mongoose.Types.ObjectId,
  })
  location_id!: Ref<ClinicLocation> | null;

  @prop({ type: Boolean, default: false })
  noShow!: boolean;
}

const SUPER_BILL_DB_MODEL = getModelForClass(SuperBill, {
  schemaOptions: {
    collection: "super_bill",
    timestamps: true,
  },
});

export default SUPER_BILL_DB_MODEL;
