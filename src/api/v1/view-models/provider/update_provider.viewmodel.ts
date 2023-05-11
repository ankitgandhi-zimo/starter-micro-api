import { Ref } from "@typegoose/typegoose";
import { Expose, Type } from "class-transformer";
import {
  ArrayNotEmpty,
  IsArray,
  IsDefined,
  IsEnum,
  IsInt,
  IsMongoId,
  IsOptional,
  IsNotEmpty,
  IsString,
} from "class-validator";
import mongoose from "mongoose";
import { Clinic } from "../../models/clinic.model";
import { Country } from "../../models/country.model";
import { Skill } from "../../models/skill.model";
import { States } from "../../models/state.model";

export enum TitleTypes {
  Mr = "Mr",
  Mrs = "Mrs",
}

export class UpdateProviderViewmodel {
  @Expose()
  @IsMongoId()
  @IsDefined()
  @IsNotEmpty()
  @Type(() => mongoose.Types.ObjectId)
  _id?: string;

  @Expose()
  @IsMongoId()
  //@IsDefined()
  @IsNotEmpty()
  clinic_id!: Ref<Clinic>;

  @Expose()
  @Type(() => String)
  @IsString()
  //@IsDefined()
  @IsNotEmpty()
  address!: string; //doctor

  @Expose()
  @Type(() => String)
  @IsString()
  //@IsDefined()
  @IsNotEmpty()
  first_name!: string; //doctor

  @Expose()
  @Type(() => String)
  @IsString()
  //@IsDefined()
  @IsNotEmpty()
  last_name!: string; //doctor

  @IsOptional()
  @Expose()
  @Type(() => String)
  @IsString()
  //@IsDefined()
  middle_name!: string; //user

  @Expose()
  @Type(() => String)
  @IsString()
  //@IsDefined()
  @IsNotEmpty()
  mobile_no!: string; //doctor

  @IsOptional()
  @Expose()
  // @IsEnum(TitleTypes, {
  //   message: "Title can only be Mr/Mrs",
  // })
  //@IsDefined()
  //@IsNotEmpty()
  title?: string; //user

  @Expose()
  @Type(() => String)
  @IsString()
  //@IsDefined()
  @IsNotEmpty()
  image!: string; //user

  @IsOptional()
  @Expose()
  @Type(() => String)
  @IsString()
  //@IsDefined()
  relation?: string; //doctor

  @Expose()
  @Type(() => String)
  @IsString()
  //@IsDefined()
  @IsNotEmpty()
  postal_code!: string; //doctor

  @Expose()
  @Type(() => String)
  @IsString()
  //@IsDefined()
  @IsNotEmpty()
  city!: string; //doctor

  @Expose()
  @Type(() => mongoose.Types.ObjectId)
  @IsMongoId()
  @IsOptional()
  @IsNotEmpty()
  country!: Ref<Country>; //doctor; //doctor

  @Expose()
  @IsOptional()
  @Type(() => mongoose.Types.ObjectId)
  @IsMongoId()
  @IsNotEmpty()
  state!: Ref<States>; //doctor

  @Expose()
  @IsOptional()
  @IsString()
  //@IsDate()
  dob!: string; //doctor

  @Expose()
  @IsOptional()
  @Type(() => String)
  @IsString()
  //@IsDefined()
  @IsNotEmpty()
  license!: string; //doctor

  @Expose()
  @IsOptional()
  @Type(() => String)
  @IsString()
  //@IsDefined()
  @IsNotEmpty()
  npiNo!: string; //doctor

  @Expose()
  @IsOptional()
  @Type(() => String)
  @IsString()
  //@IsDefined()
  @IsNotEmpty()
  deaNo!: string; //doctor

  @Expose()
  @IsOptional()
  @IsInt()
  @Type(() => Number)
  //@Length(1, 10)
  //@IsDefined()
  experience!: number; //doctor

  @IsOptional()
  @Expose()
  @IsInt()
  //@Length(1, 10)
  @Type(() => Number)
  emergency_contact_number?: number; //doctor

  @IsOptional()
  @Expose()
  //@Length(1, 10)
  @Type(() => String)
  //@IsDefined()
  emergency_contact_name?: string; //doctor

  @Expose()
  @IsOptional()
  @IsString({ each: true })
  //@IsDefined()
  @IsNotEmpty()
  additionalSkill!: string[];

  @Expose()
  @IsOptional()
  @IsString({ each: true })
  //@IsDefined()
  @IsNotEmpty()
  awards!: string[];

  @Expose()
  @IsOptional()
  @IsArray()
  @ArrayNotEmpty()
  @IsMongoId({ each: true })
  //@IsDefined()
  @IsNotEmpty()
  skills!: Ref<Skill>[];

  @Expose()
  @IsOptional()
  @IsString({ each: true })
  //@IsDefined()
  @IsNotEmpty()
  qualifications!: string[];

  @IsOptional()
  @Expose()
  @Type(() => Boolean)
  isActive?: boolean;

  @IsOptional()
  @Expose()
  @Type(() => String)
  @IsString()
  //@IsDefined()
  ///@IsNotEmpty()
  taxonomy?: string;

  @IsOptional()
  @Expose()
  @Type(() => Boolean)
  isDeleted?: boolean;
}
