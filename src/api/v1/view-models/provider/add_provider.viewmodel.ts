import { Ref } from "@typegoose/typegoose";
import { Expose, Type } from "class-transformer";
import {
  IsDefined,
  IsEmail,
  IsEnum,
  IsInt,
  IsMongoId,
  IsNotEmpty,
  IsOptional,
  IsString,
} from "class-validator";
import { Clinic } from "../../models/clinic.model";
import { Skill } from "../../models/skill.model";
import mongoose from "mongoose";
import { States } from "../../models/state.model";

export enum TitleTypes {
  Mr = "Mr",
  Mrs = "Mrs",
}

export class AddProviderViewmodel {
  @Expose()
  @Type(() => String)
  @IsString()
  @IsDefined()
  @IsNotEmpty()
  first_name!: string; //user

  @Expose()
  @Type(() => String)
  @IsString()
  @IsDefined()
  @IsNotEmpty()
  last_name!: string; //user

  @IsOptional()
  @Expose()
  @Type(() => String)
  @IsString()
  //@IsDefined()
  middle_name!: string; //user

  @Expose()
  @Type(() => String)
  @IsMongoId()
  @IsDefined()
  @IsNotEmpty()
  clinic_id!: Ref<Clinic>;

  @IsOptional()
  @Expose()
  // @IsEnum(TitleTypes, {
  //   message: "Title can only be Mr/Mrs",
  // })
  // @IsDefined()
  // @IsNotEmpty()
  title?: string; //user

  @IsOptional()
  @Expose()
  @Type(() => String)
  @IsString()
  // @IsDefined()
  // @IsNotEmpty()
  relation?: string; //user

  @IsOptional()
  @Expose()
  @Type(() => String)
  @IsString()
  //@IsDefined({ message: "Image is required" })
  //@IsNotEmpty()
  image!: string; //user

  @Expose()
  @IsDefined()
  @IsEmail()
  @IsNotEmpty()
  @IsString()
  @Type(() => String)
  email!: string; //user

  @Expose()
  @IsDefined()
  @Type(() => Number)
  @IsNotEmpty()
  @IsInt()
  mobile_no!: number; //user

  @Expose()
  @Type(() => String)
  @IsString()
  @IsDefined()
  @IsNotEmpty()
  address!: string; //doctor

  @Expose()
  @Type(() => String)
  @IsString()
  @IsDefined()
  @IsNotEmpty()
  postal_code!: string; //doctor

  @Expose()
  @Type(() => String)
  @IsString()
  @IsDefined()
  @IsNotEmpty()
  city!: string; //doctor

  @Expose()
  @Type(() => String)
  @IsString()
  @IsDefined()
  @IsNotEmpty()
  country!: string; //doctor

  @Expose()
  @Type(() => mongoose.Types.ObjectId)
  @IsMongoId()
  @IsDefined()
  @IsNotEmpty()
  state!: Ref<States>; //doctor

  @Expose()
  @IsDefined()
  @IsString()
  //@IsDate()
  dob!: string; //doctor

  @Expose()
  @Type(() => String)
  @IsString()
  @IsDefined()
  @IsNotEmpty()
  license!: string; //doctor

  @Expose()
  @Type(() => String)
  @IsString()
  @IsDefined()
  @IsNotEmpty()
  npiNo!: string; //doctor

  @Expose()
  @Type(() => String)
  @IsString()
  @IsDefined()
  @IsNotEmpty()
  deaNo!: string; //doctor

  @IsInt()
  @Type(() => Number)
  //@Length(1, 10)
  @IsDefined()
  experience!: number; //doctor

  @IsOptional()
  @IsInt()
  //@Length(1, 10)
  @Type(() => Number)
  emergency_contact_number?: number; //doctor

  @IsOptional()
  @IsString()
  //@Length(1, 10)
  @Type(() => String)
  //@IsDefined()
  emergency_contact_name?: string; //doctor

  @Expose()
  @Type(() => String)
  //@IsDefined()
  @IsMongoId()
  @IsNotEmpty()
  user_id!: string; //from user

  // @Expose()
  // @IsString({ each: true })
  // //@IsDefined()
  // @IsNotEmpty()
  // additionalSkill!: string[];

  // @Expose()
  // @IsString({ each: true })
  // //@IsDefined()
  // @IsNotEmpty()
  // awards!: string[];

  // @Expose()
  // @IsArray()
  // @ArrayNotEmpty()
  // @IsMongoId({ each: true })
  // @IsDefined()
  // @IsNotEmpty()
  // skills!: Ref<Skill>[];

  // @Expose()
  // @IsString({ each: true })
  // //@IsDefined()
  // @IsNotEmpty()
  // qualifications!: string[];

  @Expose()
  @Type(() => String)
  @IsString()
  //@IsDefined()
  @IsMongoId()
  @IsNotEmpty()
  role!: string;

  @IsOptional()
  @Expose()
  @Type(() => String)
  @IsString()
  //@IsDefined()
  ///@IsNotEmpty()
  taxonomy?: string;

  @Expose()
  @Type(() => String)
  @IsString()
  //@IsDefined()
  @IsMongoId()
  @IsNotEmpty()
  createdby_id!: String;
}
