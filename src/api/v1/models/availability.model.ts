import {
  getModelForClass,
  prop,
  Ref,
} from "@typegoose/typegoose";
import mongoose from "mongoose";
import { PaginatedModel } from "../common/pagination/pagination_configuration";
import { EVisitTypeValues } from "./appointment.model";
import { Clinic } from "./clinic.model";
import { Doctor } from "./doctor.model";
import { ClinicLocation } from "./location.model";
import { Timezone } from "./timezone.model";
import { User } from "./user.model";

export enum DaysName {
  Sunday = "Sunday",
  Monday = "Monday",
  Tuesday = "Tuesday",
  Wednesday = "Wednesday",
  Thursday = "Thursday",
  Friday = "Friday",
  Saturday = "Saturday",
}

export class SelectedDays {
  @prop({ type: Number, default: 0 })
  id!: number;

  @prop({ enum: DaysName })
  name!: string;

  @prop({ type: Number })
  unselectedSlots!: number[];
}

export class ArrayOfTimings {
  @prop({ type: Date })
  startTime!: string;

  @prop({ type: Date })
  endTime!: string;
}

export class AvailableSlots {
  @prop({
    ref: ClinicLocation,
    type: mongoose.Types.ObjectId,
  })
  apptType_id!: Ref<ClinicLocation>;

  @prop({ type: SelectedDays })
  selectedDays!: SelectedDays[];
}

export class AvailableDays {
  @prop({ type: Number, default: 0 })
  id!: number;

  @prop({ type: String, default: "Sunday" })
  name!: string;

  @prop({ type: Boolean, default: false })
  isChecked!: boolean;

  @prop({ type: ArrayOfTimings })
  arrayOfTimings!: ArrayOfTimings[];
}

export class Availability extends PaginatedModel {
  @prop({ type: Date })
  toDateTime!: Date;

  @prop({ type: Date })
  fromDateTime!: Date;

  // @prop({ type: String, default: "" })
  // timezone!: string;

  @prop({ ref: Timezone, type: mongoose.Types.ObjectId })
  timezone!: Ref<Timezone> | null;

  @prop({ ref: User, type: mongoose.Types.ObjectId })
  setby_id!: Ref<User> | null;

  @prop({ ref: Doctor, type: mongoose.Types.ObjectId })
  doctor_id!: Ref<Doctor>;

  @prop({ ref: Clinic, type: mongoose.Types.ObjectId })
  clinic_id!: Ref<Clinic>;

  @prop({
    ref: ClinicLocation,
    type: mongoose.Types.ObjectId,
  })
  location!: Ref<ClinicLocation>;

  @prop({ type: AvailableDays })
  available_days!: AvailableDays[];
  // [
  //   {
  //     id: 0;
  //     name: { type: String; default: "Sunday" };
  //     isChecked: { type: Boolean; default: false };
  //     arrayOfTimings: [
  //       {
  //         startTime: { type: Date };
  //         endTime: { type: Date };
  //       }
  //     ];
  //   },
  //   {
  //     id: 1;
  //     name: { type: String; default: "Monday" };
  //     isChecked: { type: Boolean; default: false };
  //     arrayOfTimings: [
  //       {
  //         startTime: { type: Date };
  //         endTime: { type: Date };
  //       }
  //     ];
  //   },
  //   {
  //     id: 2;
  //     name: { type: String; default: "Tuesday" };
  //     isChecked: { type: Boolean; default: false };
  //     arrayOfTimings: [
  //       {
  //         startTime: { type: Date };
  //         endTime: { type: Date };
  //       }
  //     ];
  //   },
  //   {
  //     id: 3;
  //     name: { type: String; default: "Wednesday" };
  //     isChecked: { type: Boolean; default: false };
  //     arrayOfTimings: [
  //       {
  //         startTime: { type: Date };
  //         endTime: { type: Date };
  //       }
  //     ];
  //   },
  //   {
  //     id: 4;
  //     name: { type: String; default: "Thursday" };
  //     isChecked: { type: Boolean; default: false };
  //     arrayOfTimings: [
  //       {
  //         startTime: { type: Date };
  //         endTime: { type: Date };
  //       }
  //     ];
  //   },
  //   {
  //     id: 5;
  //     name: { type: String; default: "Friday" };
  //     isChecked: { type: Boolean; default: false };
  //     arrayOfTimings: [
  //       {
  //         startTime: { type: Date };
  //         endTime: { type: Date };
  //       }
  //     ];
  //   },
  //   {
  //     id: 6;
  //     name: { type: String; default: "Saturday" };
  //     isChecked: { type: Boolean; default: false };
  //     arrayOfTimings: [
  //       {
  //         startTime: { type: Date };
  //         endTime: { type: Date };
  //       }
  //     ];
  //   }
  // ];
  @prop({ type: AvailableSlots })
  availableSlots!: AvailableSlots[];
  //  [
  //   {
  //     apptType_id: { type: mongoose.Schema.Types.ObjectId; ref: "location" };
  //     selectedDays: [
  //       {
  //         id: { type: Number };
  //         name: {
  //           type: String;
  //           enum: [
  //             "Sunday",
  //             "Monday",
  //             "Tuesday",
  //             "Wednesday",
  //             "Thursday",
  //             "Friday",
  //             "Saturday"
  //           ];
  //         };
  //         unselectedSlots: [Number];
  //       }
  //     ];
  //   }
  // ];

  @prop({
    enum: EVisitTypeValues,
    type: String,
    default: EVisitTypeValues.PHYSICAL,
  })
  visitType!: string;

  @prop({ type: Boolean, default: false })
  isDeleted!: boolean;

  @prop({ type: Boolean, default: true })
  isActive!: boolean;

  // @prop({ ref: User, type: mongoose.Types.ObjectId })
  // createdby_id!: Ref<User> | null;
}

const AVAILABILITY_DB_MODEL = getModelForClass(
  Availability,
  {
    schemaOptions: {
      collection: "availabilities",
      timestamps: true,
    },
  }
);

export default AVAILABILITY_DB_MODEL;
