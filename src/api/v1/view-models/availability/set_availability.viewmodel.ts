import { mongoose } from "@typegoose/typegoose";
import { Expose, Type } from "class-transformer";
import {
  IsDefined,
  IsNotEmpty,
  IsString,
  IsMongoId,
  IsInt,
  IsArray,
  IsNumber,
  ValidateNested,
  IsEnum,
} from "class-validator";
import { EVisitTypeValues } from "../../models/appointment.model";
import { SelectedDaysofWeekArr } from "./get_time_slots.viewmodel";

export class AvailableSlots {
  @Expose()
  @Type(() => mongoose.Types.ObjectId)
  @IsMongoId()
  @IsDefined()
  @IsNotEmpty()
  apptType_id!: mongoose.Schema.Types.ObjectId;

  @Expose()
  @Type(() => SelectedDaysofWeekArr)
  @IsArray()
  //@ValidateNested()
  @IsDefined()
  @IsNotEmpty()
  selectedDaysofWeekArr!: SelectedDaysofWeekArr[];
}

export class SetAvailabilityViewmodel {
  @Expose()
  @Type(() => String)
  @IsString()
  @IsDefined()
  @IsNotEmpty()
  startDate!: string;

  @Expose()
  @Type(() => String)
  @IsString()
  @IsDefined()
  @IsNotEmpty()
  endDate!: string;

  @Expose()
  @Type(() => mongoose.Types.ObjectId)
  @Type(() => String)
  @IsString()
  //@IsMongoId()
  @IsDefined()
  @IsNotEmpty()
  timezone!: string;
  //timezone!: mongoose.Schema.Types.ObjectId;

  @Expose()
  @Type(() => mongoose.Types.ObjectId)
  @IsMongoId()
  @IsDefined()
  @IsNotEmpty()
  doctor_id!: mongoose.Schema.Types.ObjectId;

  @Expose()
  @Type(() => mongoose.Types.ObjectId)
  @IsMongoId()
  @IsDefined()
  @IsNotEmpty()
  clinic_id!: mongoose.Schema.Types.ObjectId;

  @Expose()
  @Type(() => mongoose.Types.ObjectId)
  @IsMongoId()
  @IsDefined()
  @IsNotEmpty()
  location!: mongoose.Schema.Types.ObjectId;

  @Expose()
  @Type(() => SelectedDaysofWeekArr)
  @IsArray()
  @IsDefined()
  @IsNotEmpty()
  week!: SelectedDaysofWeekArr[];

  @Expose()
  @Type(() => mongoose.Types.ObjectId)
  @IsMongoId()
  @IsNotEmpty()
  setby_id!: mongoose.Schema.Types.ObjectId;

  @Expose()
  @Type(() => AvailableSlots)
  @IsArray()
  @IsDefined()
  @IsNotEmpty()
  availableSlots!: AvailableSlots[];

  @Expose()
  @Type(() => String)
  @IsString()
  @IsDefined()
  @IsEnum(EVisitTypeValues, {
    message: "visitType value must be from one of them i.e Physical,Tele-Call",
  })
  @IsNotEmpty()
  visitType!: string;
}
