import { mongoose, Ref } from "@typegoose/typegoose";
import { Expose, Type } from "class-transformer";
import {
  IsArray,
  IsDateString,
  IsDefined,
  IsMongoId,
  IsNotEmpty,
  IsOptional,
  ValidateNested,
} from "class-validator";
import { Clinic } from "../../models/clinic.model";
import { Doctor } from "../../models/doctor.model";

export class ArrayOfTiming {
  @Expose()
  @IsDefined()
  @IsDateString()
  @IsNotEmpty()
  @Type(() => String)
  startTime?: string;

  @Expose()
  @IsDefined()
  @IsDateString()
  @IsNotEmpty()
  @Type(() => String)
  endTime?: string;
}

export class SelectedDayObject {
  @Expose()
  @IsDefined()
  @IsNotEmpty()
  @Type(() => Number)
  id?: number;

  @Expose()
  @IsDefined()
  @IsNotEmpty()
  @Type(() => String)
  name?: string;

  @IsDefined()
  @Expose()
  @Type(() => Boolean)
  isChecked?: boolean;

  @IsOptional()
  @IsArray()
  @ValidateNested()
  @Expose()
  @Type(() => ArrayOfTiming)
  arrayOfTimings!: ArrayOfTiming[];
}

export class GetAppointmentTypeListViewmodel {
  @IsOptional()
  @Expose()
  @IsNotEmpty()
  @Type(() => Number)
  pageNumber?: number;

  @Expose()
  @Type(() => mongoose.Types.ObjectId)
  @IsMongoId()
  @IsDefined()
  @IsNotEmpty()
  _id!: Ref<Doctor>;

  @Expose()
  @Type(() => mongoose.Types.ObjectId)
  @IsMongoId()
  @IsDefined()
  @IsNotEmpty()
  clinic_id!: Ref<Clinic>;

  @IsOptional()
  @Expose()
  @IsNotEmpty()
  @Type(() => Number)
  pageSize?: number;

  @IsOptional()
  @Expose()
  @Type(() => String)
  search?: string;

  @IsOptional()
  @Expose()
  @Type(() => Boolean)
  isDeleted?: boolean;

  @IsOptional()
  @Expose()
  @Type(() => Boolean)
  isActive?: boolean;

  @IsOptional()
  @IsArray()
  @Expose()
  @Type(() => SelectedDayObject)
  selectedDaysofWeekArr?: SelectedDayObject[];
}
