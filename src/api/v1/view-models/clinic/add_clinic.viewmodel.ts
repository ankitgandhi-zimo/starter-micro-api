import { Ref } from "@typegoose/typegoose";
import { Expose, Transform, TransformFnParams, Type } from "class-transformer";
import {
  IsDefined,
  IsEmail,
  IsEnum,
  IsMongoId,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  ValidateIf,
} from "class-validator";
import mongoose from "mongoose";
import { EClinicTypeValues } from "../../models/clinic.model";
import { ClinicGroup } from "../../models/group.model";

import { EPermissionValues, User } from "../../models/user.model";
import { States } from "../../models/state.model";
import { Country } from "../../models/country.model";

export class PermissionObjectViewModel {
  @Expose()
  @Type(() => String)
  @IsString()
  @IsDefined()
  @IsNotEmpty()
  name!: string;

  @Expose()
  @Type(() => String)
  @IsString()
  @IsDefined()
  @IsEnum(EPermissionValues, {
    message:
      "key value must be from one of them i.e AVAILABILITY,SCHEDULER,NOTES,SOAPNOTES,TREATMENTPLAN",
  })
  @IsNotEmpty()
  key!: string;
}
export class AddClinicViewmodel {
  // @Expose()
  // @Type(() => String)
  // @IsString()
  // @IsDefined()
  // @IsNotEmpty()
  // npiNo!: string;

  // @IsOptional()
  // @Expose()
  // @Type(() => String)
  // @IsString()
  // //@IsDefined()
  // //@IsNotEmpty()
  // taxonomy?: string;

  // @Expose()
  // @Type(() => String)
  // @IsString()
  // @IsDefined()
  // @IsNotEmpty()
  // address!: string;

  // @Expose()
  // @IsMongoId()
  // @IsDefined()
  // @IsNotEmpty()
  // @Type(() => mongoose.Types.ObjectId)
  // country!: Ref<Country> | null;

  // @Expose()
  // @IsMongoId()
  // @IsDefined()
  // @IsNotEmpty()
  // @Type(() => mongoose.Types.ObjectId)
  // state!: Ref<States> | null;

  // @Expose()
  // @Type(() => String)
  // @IsString()
  // @IsDefined()
  // @IsNotEmpty()
  // postal_code!: string;

  // @Expose()
  // @Type(() => String)
  // @IsString()
  // @IsDefined()
  // @IsNotEmpty()
  // city!: string;

  @Expose()
  @Type(() => String)
  @IsString()
  @IsDefined()
  @IsNotEmpty()
  @Transform(({ value }: TransformFnParams) => value?.trim())
  first_name!: string;

  @Expose()
  @Type(() => String)
  @IsString()
  @IsDefined()
  @IsNotEmpty()
  last_name!: string;

  @Expose()
  @Type(() => String)
  @IsString()
  @IsDefined()
  @IsNotEmpty()
  clinic_name!: string;

  @Expose()
  @Type(() => String)
  @IsString()
  @IsDefined()
  @IsEmail()
  @IsNotEmpty()
  email!: string;

  @Expose()
  @IsNumber()
  @IsDefined()
  @IsNotEmpty()
  @Type(() => Number)
  //   @Min(10)
  //   @Max(10)
  contact!: number;

  @IsOptional()
  @Expose()
  @Type(() => String)
  @IsString()
  //@IsDefined({ message: "Image is required" })
  //@IsNotEmpty()
  image?: string;

  // @Expose()
  // @Type(() => String)
  // @IsString()
  // @IsDefined()
  // @IsNotEmpty()
  // contact_person_mobile!: string;

  @Expose()
  @Type(() => String)
  @IsString()
  @IsDefined()
  @IsNotEmpty()
  mobile_no!: string;

  @Expose()
  @Type(() => String)
  @IsString()
  @IsDefined()
  @IsNotEmpty()
  designation!: string;

  @ValidateIf((x) => x.clinic_type === EClinicTypeValues.GROUP)
  @Expose()
  @IsMongoId()
  @IsDefined()
  @IsNotEmpty()
  @Type(() => mongoose.Types.ObjectId)
  group!: Ref<ClinicGroup> | null;

  @Expose()
  //   @Default("individual")
  @IsEnum(EClinicTypeValues, {
    message:
      "clinic_type values must be from one of them i.e. individual, group",
  })
  @IsDefined()
  @IsNotEmpty()
  clinic_type!: EClinicTypeValues;

  @IsOptional()
  @Expose()
  @Type(() => String)
  @IsString()
  @IsDefined()
  @IsNotEmpty()
  fax?: string;

  @IsOptional()
  @Expose()
  @Type(() => String)
  @IsString()
  @IsDefined()
  @IsNotEmpty()
  office?: string;

  ///////////////////////////////////////////////////////////////////////////////////////////////

  // @Expose()
  // @Type(() => String)
  // @IsString()
  // @IsDefined()
  // @IsNotEmpty()
  // apartment!: string;

  // @Expose()
  // @Type(() => String)
  // @IsString()
  // @IsDefined()
  // @IsNotEmpty()
  // npiNo!: string;

  // @Expose()
  // @Type(() => String)
  // @IsString()
  // @IsDefined()
  // @IsNotEmpty()
  // fed_id!: string;

  // @Expose()
  // @Type(() => String)
  // @IsString()
  // @IsDefined()
  // @IsNotEmpty()
  // taxonomy!: string;

  // @Expose()
  // @Type(() => String)
  // @IsString()
  // @IsDefined()
  // @IsNotEmpty()
  // address!: string;

  // @Expose()
  // @Type(() => String)
  // @IsString()
  // @IsDefined()
  // @IsNotEmpty()
  // zip_code!: string;

  // @Expose()
  // @Type(() => String)
  // @IsString()
  // @IsDefined()
  // @IsNotEmpty()
  // city!: string;

  // @Expose()
  // @IsMongoId()
  // @IsDefined()
  // @IsNotEmpty()
  // @Type(() => mongoose.Types.ObjectId)
  // state!: Ref<States> | null;

  //   @Expose()
  //   @IsMongoId()
  //   @IsDefined()
  //   @IsNotEmpty()
  //   @Type(() => mongoose.Types.ObjectId)
  //   role!: Ref<Roles> | null;

  // @Expose()
  // @IsMongoId()
  // @IsDefined()
  // @IsNotEmpty()
  // @Type(() => mongoose.Types.ObjectId)
  // country!: Ref<Country> | null;

  @Expose()
  date_of_birth!: Date;

  @Expose()
  isPlanCancelled!: boolean;

  @Expose()
  role_permission!: any;

  @Expose()
  isActive!: boolean;

  @Expose()
  user_id: Ref<User> | null;

  @Expose()
  // @IsDefined()

  // @IsEnum(EBoolValues, {
  //   message:
  //     "isDeleted value must be boolean type i.e true or false",
  // })
  isDeleted!: boolean;

  @Expose()
  clinicPolicy!: any;

  //   @IsOptional()
  //   @Expose()
  //   @IsDefined()
  //   @MinLength(8, {
  //     message:
  //       "Password length can not less than 8 character",
  //   })
  //   @MaxLength(20, {
  //     message:
  //       "Password length can not greater than 20 character",
  //   })
  //   @Matches(
  //     /^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]/,
  //     {
  //       message:
  //         "Password must have one number and one capital letter and one special character.",
  //     }
  //   )
  //   @IsNotEmpty()
  //   @IsString()
  //   @Type(() => String)
  //   password?: string;
}
