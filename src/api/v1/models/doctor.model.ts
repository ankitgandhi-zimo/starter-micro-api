import { getModelForClass, prop, Ref } from "@typegoose/typegoose";
import mongoose from "mongoose";
import { PaginatedModel } from "../common/pagination/pagination_configuration";
import { AppointmentType } from "./appointment_types.model";
import { Clinic } from "./clinic.model";
import { Country } from "./country.model";
import { ClinicLocation } from "./location.model";
import { Skill } from "./skill.model";
import { States } from "./state.model";
import { User } from "./user.model";

class AdditionalSkillObject {
  @prop({ type: String, default: null })
  name!: string;
}

class AwardsObject {
  @prop({ type: String, default: null })
  name!: string;
}

class QualificationsObject {
  @prop({ type: String, default: null })
  name!: string;
}

class VideoCallCredentialObject {
  @prop({ type: Date, default: null })
  lastUpdateOn!: Date;

  @prop({ type: Boolean, default: false })
  status!: boolean;

  @prop({ type: String, default: null })
  name!: string;

  @prop({ type: String, default: null })
  email!: string;
}
class NotesObj {
  @prop({ ref: User, default: null })
  user_id!: Ref<User> | null;
}

class SkillObject {
  @prop({ ref: Skill }) // need to change refrence with specialities
  skill_id!: Ref<Skill> | null;
}
class PermissionsObj {
  @prop()
  notes!: NotesObj[] | null;

  @prop()
  schedular!: NotesObj[] | null;

  @prop()
  soapNotes!: NotesObj[] | null;

  @prop()
  availability!: NotesObj[] | null;

  @prop()
  treatmentPlan!: NotesObj[] | null;
}
class EmergencyObject {
  @prop({ type: String, default: null })
  name!: string;

  @prop({ type: Number, default: null })
  mobile_no!: number;
}

class MeetingModeObject {
  @prop({ type: Boolean, default: true })
  virtual!: boolean;

  @prop({ type: Boolean, default: false })
  physical!: boolean;
}
class SettingObject {
  @prop({ type: Boolean, default: true })
  bookAppt!: boolean;

  @prop({ type: Boolean, default: false })
  newPatient!: boolean;

  @prop({ type: Boolean, default: true })
  viewInsurance!: boolean;

  @prop({ type: Boolean, default: false })
  emergencyAppt!: boolean;

  @prop()
  meetingMode!: MeetingModeObject;

  @prop()
  permissions!: PermissionsObj;
}

export class Doctor extends PaginatedModel {
  @prop({ type: String, default: [] })
  additionalSkill!: string[];

  @prop({ ref: User })
  verifiedby_id!: Ref<User> | null;

  @prop({ ref: User })
  user_id!: Ref<User> | null;

  @prop({ ref: Clinic })
  clinic_id!: Ref<Clinic> | null;

  @prop({
    ref: ClinicLocation,
    type: mongoose.Types.ObjectId,
    default: [],
  })
  location!: Ref<ClinicLocation>[];

  @prop({ type: String, default: null })
  npiNo!: string;

  @prop({ type: String, default: null })
  deaNo!: string;

  @prop({ type: String, default: null })
  title!: string;

  @prop({ type: String, default: null })
  license!: string;

  @prop({ type: String, default: null })
  middle_name!: string;

  @prop({ type: String, default: null })
  mobile_home!: string;

  @prop({ type: String, default: null })
  address!: string;

  @prop({ type: String, default: null })
  postal_code!: string;

  @prop({ type: String, default: null })
  city!: string;

  @prop({
    ref: Country,
    type: mongoose.Types.ObjectId,
    default: null,
  })
  country!: Ref<Country>;

  @prop({
    ref: States,
    type: mongoose.Types.ObjectId,
    default: null,
  })
  state!: Ref<States>;

  @prop({ type: String, default: null })
  dob!: string;

  @prop({ type: Number, default: 0 })
  experience!: number;

  @prop({ type: Number, default: null })
  emergency_contact_number!: number;

  @prop({ type: String, default: null })
  emergency_contact_name!: string;

  @prop({ type: String, default: null })
  taxonomy!: string;

  @prop({ type: String, default: null })
  relation!: string;

  @prop({ type: Boolean, default: false })
  isVerified!: boolean;

  @prop({ default: null })
  qualifications!: string[];

  @prop({ default: null })
  awards!: string[];

  @prop({ default: null })
  videoCallCredential!: VideoCallCredentialObject;

  @prop({ default: null })
  emergency!: EmergencyObject | null;

  @prop({
    ref: AppointmentType,
    type: mongoose.Types.ObjectId,
    default: [],
  })
  assignedApptTypes!: Ref<AppointmentType>[];

  @prop({ type: [mongoose.Types.ObjectId], default: null })
  supervising!: mongoose.Types.ObjectId[] | null;

  @prop()
  settings!: SettingObject | null;

  @prop({
    ref: Skill,
    type: mongoose.Types.ObjectId,
    default: [],
  })
  skills!: Ref<Skill>[];

  @prop({
    ref: User,
    type: mongoose.Types.ObjectId,
    default: null,
  })
  createdby_id!: Ref<User> | null;

  // @prop([{ ref: Skill, type: mongoose.Types.ObjectId, default: null }])
  // skills!: Ref<Skill> | null;

  // progressNoteFields: { treatmentGoal: [{ type: String }], diagnosis: [{ type: String }], SO: [{ type: String }] },
  /***************************************************************** */
}

const DOCTOR_DB_MODEL = getModelForClass(Doctor, {
  schemaOptions: {
    collection: "doctor",
    timestamps: true,
  },
});

export default DOCTOR_DB_MODEL;
