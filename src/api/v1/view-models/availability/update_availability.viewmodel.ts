import { mongoose } from "@typegoose/typegoose";
import { Expose, Type } from "class-transformer";
import {
  IsDefined,
  IsEnum,
  IsNotEmpty,
  IsString,
  Matches,
  IsEmail,
  IsInt,
  IsDate,
  Length,
  Min,
  Max,
  MinLength,
  MaxLength,
  IsMongoId,
  IsDateString,
  IsOptional,
  IsArray,
} from "class-validator";
import { EVisitTypeValues } from "../../models/appointment.model";
import { SelectedDaysofWeekArr } from "./get_time_slots.viewmodel";
import { AvailableSlots } from "./set_availability.viewmodel";

export class UpdateAvailabilityViewmodel {
  @Expose()
  @Type(() => mongoose.Types.ObjectId)
  @IsMongoId()
  @IsDefined()
  @IsNotEmpty()
  availability_id!: mongoose.Schema.Types.ObjectId;

  @Expose()
  @Type(() => SelectedDaysofWeekArr)
  @IsArray()
  @IsDefined()
  @IsNotEmpty()
  week!: SelectedDaysofWeekArr[];

  @Expose()
  @Type(() => AvailableSlots)
  @IsArray()
  @IsDefined()
  @IsNotEmpty()
  availableSlots!: AvailableSlots[];

  @Expose()
  @Type(() => String)
  @IsDateString()
  @IsDefined()
  @IsNotEmpty()
  startDate!: string;

  @Expose()
  @Type(() => String)
  @IsDateString()
  @IsDefined()
  @IsNotEmpty()
  endDate!: string;

  // @Expose()
  // @Type(() => String)
  // @IsString()
  // @IsDefined()
  // @IsNotEmpty()
  // timezone!: string;

  @Expose()
  @Type(() => mongoose.Types.ObjectId)
  @IsMongoId()
  @IsDefined()
  @IsNotEmpty()
  timezone!: mongoose.Schema.Types.ObjectId;

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
  location!: mongoose.Schema.Types.ObjectId;

  @Expose()
  @Type(() => mongoose.Types.ObjectId)
  @IsMongoId()
  @IsDefined()
  @IsNotEmpty()
  clinic_id!: mongoose.Schema.Types.ObjectId;

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
