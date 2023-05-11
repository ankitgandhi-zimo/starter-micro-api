import { mongoose } from "@typegoose/typegoose";
import { Expose, Type } from "class-transformer";
import {
  IsDefined,
  IsNotEmpty,
  IsString,
  IsArray,
  ValidateNested,
  IsOptional,
  IsNumber,
  IsMongoId,
} from "class-validator";

export class ArrayOfTimings {
  @Expose()
  @Type(() => String)
  @IsString()
  @IsDefined()
  @IsNotEmpty()
  startTime!: string; //like  "09:00"

  @Expose()
  @Type(() => String)
  @IsString()
  @IsDefined()
  @IsNotEmpty()
  endTime!: string;
}

export class SelectedDaysofWeekArr {
  @Expose()
  @Type(() => Number)
  @IsNumber()
  @IsDefined()
  @IsNotEmpty()
  id!: number;

  @Expose()
  @Type(() => String)
  @IsString()
  @IsDefined()
  @IsNotEmpty()
  name!: string;

  @Expose()
  @Type(() => Boolean)
  @IsDefined()
  @IsNotEmpty()
  isChecked!: boolean;

  @Expose()
  @Type(() => ArrayOfTimings)
  @IsArray()
  @ValidateNested()
  @IsOptional()
  @IsNotEmpty()
  arrayOfTimings?: ArrayOfTimings[];

  @Expose()
  @Type(() => Boolean)
  @IsDefined()
  @IsNotEmpty()
  isSelectedForSlots?: boolean;

  @Expose()
  @Type(() => Number)
  @IsArray()
  @IsOptional()
  @IsNotEmpty()
  slotsArr?: number[];

  @Expose()
  @Type(() => Number)
  @IsArray()
  @IsOptional()
  @IsNotEmpty()
  unselectedSlots?: number[];
}

export class ApptTypeWithSelectedDays {
  @Expose()
  @Type(() => mongoose.Types.ObjectId)
  @IsMongoId()
  @IsDefined()
  @IsNotEmpty()
  _id!: mongoose.Schema.Types.ObjectId;

  @Expose()
  @Type(() => String)
  @IsString()
  @IsDefined()
  @IsNotEmpty()
  type!: string;

  @Expose()
  @Type(() => String)
  @IsString()
  @IsDefined()
  @IsNotEmpty()
  color!: string;

  @Expose()
  @Type(() => String)
  @IsString()
  @IsDefined()
  @IsNotEmpty()
  duration!: string;

  @Expose()
  @Type(() => SelectedDaysofWeekArr)
  @IsArray()
  @ValidateNested()
  @IsDefined()
  @IsNotEmpty()
  selectedDaysofWeekArr!: SelectedDaysofWeekArr[];
}

export class GetTimeSlotsViewmodel {
  @Expose()
  @Type(() => String)
  @IsString()
  @IsDefined()
  @IsNotEmpty()
  timezone!: string;

  @Expose()
  @Type(() => String)
  @IsString()
  @IsDefined()
  @IsNotEmpty()
  today!: string;

  @Expose()
  @Type(() => ApptTypeWithSelectedDays)
  @IsArray()
  @ValidateNested()
  @IsDefined()
  @IsNotEmpty()
  apptTypeWithSelectedDays!: ApptTypeWithSelectedDays[];
}
