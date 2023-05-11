import { mongoose, Ref } from "@typegoose/typegoose";
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
  ArrayNotEmpty,
  IsArray,
  IsOptional,
} from "class-validator";
import { Clinic } from "../../models/clinic.model";
import { User } from "../../models/user.model";

export class UpdateBillingTeamViewmodel {
  @Expose()
  @Type(() => mongoose.Types.ObjectId)
  @IsDefined()
  @IsMongoId()
  @IsNotEmpty()
  _id!: string;

  @Expose()
  @Type(() => String)
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  name!: string;

  @Expose()
  @IsArray()
  @Type(() => String)
  @ArrayNotEmpty()
  @IsString({ each: true })
  @IsOptional()
  clinics!: string[];

  @Expose()
  @Type(() => Boolean)
  //@IsDefined()
  isActive!: boolean;
}
