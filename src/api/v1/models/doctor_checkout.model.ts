import {
  getModelForClass,
  index,
  mongoose,
  prop,
  Ref,
} from "@typegoose/typegoose";
import { PaginatedModel } from "../common/pagination/pagination_configuration";
import { Appointment } from "./appointment.model";
import { Clinic } from "./clinic.model";
import { CPTCodes } from "./cpt.model";
import { ICTCodes } from "./ict.model";
import { Insurance } from "./insurance/insurance.model";
import { ClinicLocation } from "./location.model";
import { Patients } from "./patient.model";
import { User } from "./user.model";

export class CodesObject {
  @prop({
    ref: ICTCodes,
    type: mongoose.Types.ObjectId,
    default: [],
  })
  ICD_10!: Ref<ICTCodes>[];

  @prop({
    ref: ICTCodes,
    type: mongoose.Types.ObjectId,
    default: [],
  })
  ICD_9!: Ref<ICTCodes>[];

  @prop({
    ref: CPTCodes,
    type: mongoose.Types.ObjectId,
    default: [],
  })
  cptCode!: Ref<CPTCodes>[];
}

@index({ placeOfService: "text" })
export class DoctorCheckout extends PaginatedModel {
  @prop({ type: String, default: null })
  notes!: string;

  @prop({ type: Number, default: 0 })
  duration!: number;

  @prop({ type: String, default: null })
  placeOfService!: string;

  @prop({ type: String, default: null })
  remark!: string;

  @prop({ type: Date })
  checkoutTime!: string;

  @prop({ ref: Clinic })
  clinic_id!: Ref<Clinic> | null;

  @prop({ ref: User })
  doctor_id!: Ref<User> | null;

  @prop({ ref: User })
  createdby_id!: Ref<User> | null;

  @prop({ ref: "Patients" })
  patient_id!: Ref<Patients> | null;

  @prop({ ref: "ClinicLocation" })
  location_id!: Ref<ClinicLocation> | null;

  @prop({ ref: "Appointment" })
  appointment_id!: Ref<Appointment> | null;

  @prop({ type: Boolean, default: false })
  noShow!: boolean;

  @prop({ type: Boolean, default: false })
  followUp!: boolean;

  @prop({ type: Boolean, default: false })
  chargePatient!: boolean;

  //@prop()
  @prop({ type: CodesObject })
  codes!: CodesObject;

  //ADDED BY CHARANJIT 12 April,23
  @prop({ type: Boolean, default: false })
  billGenerated!: boolean;

  @prop({ type: String, default: null })
  payer_id!: string;

  @prop({ type: String, default: null })
  insurance_name!: string;

  @prop({ ref: "Insurance", default: null })
  insurance_id!: Ref<Insurance> | null;
}

const DOCTOR_CHECKOUT_DB_MODEL = getModelForClass(DoctorCheckout, {
  schemaOptions: {
    collection: "doctorcheckout",
    timestamps: true,
  },
});

export default DOCTOR_CHECKOUT_DB_MODEL;
