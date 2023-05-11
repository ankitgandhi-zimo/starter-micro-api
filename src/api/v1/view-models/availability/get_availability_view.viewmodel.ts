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
  IsDateString,
  IsEnum,
} from "class-validator";
import { EVisitTypeValues } from "../../models/appointment.model";

export class GetAvailabilityViewViewmodel {
  @Expose()
  @Type(() => String)
  @IsString()
  @IsDefined()
  @IsNotEmpty()
  timezone!: string;

  @Expose()
  @Type(() => String)
  @IsDateString()
  @IsOptional()
  @IsNotEmpty()
  selectedDate!: string;

  @Expose()
  @Type(() => mongoose.Types.ObjectId)
  @IsMongoId()
  @IsOptional()
  @IsNotEmpty()
  availability_id!: mongoose.Schema.Types.ObjectId;

  @Expose()
  @Type(() => mongoose.Types.ObjectId)
  @IsMongoId()
  @IsDefined()
  @IsNotEmpty()
  doctor_id!: mongoose.Schema.Types.ObjectId;

  @Expose()
  @Type(() => mongoose.Types.ObjectId)
  @IsMongoId()
  @IsOptional()
  @IsNotEmpty()
  location_id!: mongoose.Schema.Types.ObjectId;

  @Expose()
  @Type(() => mongoose.Types.ObjectId)
  @IsMongoId()
  @IsDefined()
  @IsNotEmpty()
  clinic_id!: mongoose.Schema.Types.ObjectId;

  @Expose()
  @Type(() => String)
  @IsString()
  @IsOptional()
  @IsEnum(EVisitTypeValues, {
    message: "visitType value must be from one of them i.e Physical,Tele-Call",
  })
  @IsNotEmpty()
  visitType!: string;
}
