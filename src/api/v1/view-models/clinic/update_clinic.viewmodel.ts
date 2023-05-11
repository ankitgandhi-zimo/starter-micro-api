import { Ref, mongoose } from "@typegoose/typegoose";
import { Expose, Transform, TransformFnParams, Type } from "class-transformer";
import {
  IsDefined,
  IsEnum,
  IsMongoId,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from "class-validator";
import { EClinicTypeValues } from "../../models/clinic.model";

import { EBoolValues, EPermissionValues, User } from "../../models/user.model";
import { States } from "../../models/state.model";
import { Country } from "../../models/country.model";

class CancelObjectViewModel {
  @Expose()
  @IsNumber()
  @IsDefined()
  @IsNotEmpty()
  @Type(() => Number)
  hours!: number;

  @Expose()
  @IsDefined()
  isAllowed!: boolean;
}
class RescheduleObjectViewModel {
  @Expose()
  @IsNumber()
  @IsDefined()
  @IsNotEmpty()
  @Type(() => Number)
  hours!: number;

  @IsOptional()
  @Expose()
  @IsDefined()
  isAllowed!: boolean;
}

class ClinicPolicyObjectViewModel {
  @Expose()
  @IsNumber()
  @IsDefined()
  @IsNotEmpty()
  @Type(() => Number)
  noShowCharge!: number;

  @Expose()
  @IsDefined()
  isDeleted!: boolean;

  @Expose()
  @IsDefined()
  isActive!: boolean;

  @Expose()
  @ValidateNested()
  @IsDefined()
  @IsNotEmpty()
  @Type(() => CancelObjectViewModel)
  cancel!: CancelObjectViewModel;

  @Expose()
  @ValidateNested()
  @IsDefined()
  @IsNotEmpty()
  @Type(() => RescheduleObjectViewModel)
  reschedule!: RescheduleObjectViewModel;
}
export class PermissionObjectViewModel {
  // @prop({ ref: Product, type: mongoose.Types.ObjectId })
  // _id!:    | null;

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
export class UpdateClinicViewmodel {
  @Expose()
  @Type(() => String)
  @IsMongoId()
  @IsDefined()
  @IsNotEmpty()
  _id!: string;

  @IsOptional()
  @Expose()
  @Type(() => String)
  @IsString()
  @IsDefined()
  @IsNotEmpty()
  clinic_name!: string;

  // @IsOptional()
  // @Expose()
  // @Type(() => String)
  // @IsString()
  // @IsDefined()
  // @IsNotEmpty()
  // contact_person_mobile?: string;

  @IsOptional()
  @Expose()
  @Type(() => String)
  @IsString()
  @IsDefined()
  @IsNotEmpty()
  designation?: string;

  @IsOptional()
  @Expose()
  @Type(() => String)
  @IsString()
  @IsDefined()
  @IsNotEmpty()
  image?: string;

  @IsOptional()
  @Expose()
  @Type(() => String)
  @IsString()
  @IsDefined()
  @IsNotEmpty()
  last_name?: string;

  @IsOptional()
  @Expose()
  @Type(() => String)
  @IsString()
  @IsDefined()
  @IsNotEmpty()
  @Transform(({ value }: TransformFnParams) => value?.trim())
  first_name?: string;

  @IsOptional()
  @Expose()
  @IsString()
  @IsDefined()
  @IsNotEmpty()
  @Type(() => String)
  //   @Min(10)
  //   @Max(10)
  mobile_no?: string;

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

  // @IsOptional()
  // @Expose()
  // @Type(() => String)
  // @IsString()
  // @IsDefined()
  // @IsNotEmpty()
  // apartment?: string;

  // @IsOptional()
  // @Expose()
  // @Type(() => String)
  // @IsString()
  // @IsDefined()
  // @IsNotEmpty()
  // zip_code?: string;

  @IsOptional()
  @Expose()
  //   @Default("individual")
  @IsEnum(EClinicTypeValues, {
    message:
      "clinic_type values must be from one of them i.e. individual, group",
  })
  @IsDefined()
  @IsNotEmpty()
  clinic_type?: EClinicTypeValues;

  @IsOptional()
  @Expose()
  @IsDefined()
  @IsEnum(EBoolValues, {
    message: "isActive value must be boolean type i.e true or false",
  })
  isActive?: boolean;

  @Expose()
  user_id: Ref<User> | null;

  @IsOptional()
  @Expose()
  @IsDefined()
  @IsEnum(EBoolValues, {
    message: "isDeleted value must be boolean type i.e true or false",
  })
  isDeleted?: boolean;

  @IsOptional()
  @Expose()
  @ValidateNested()
  @IsDefined()
  @IsNotEmpty()
  @Type(() => ClinicPolicyObjectViewModel)
  clinicPolicy?: ClinicPolicyObjectViewModel;
  //////////////////////////////////////////////////////////

  // @IsOptional()
  // @Expose()
  // @Type(() => String)
  // @IsString()
  // @IsDefined()
  // @IsNotEmpty()
  // npiNo?: string;

  // @IsOptional()
  // @Expose()
  // @Type(() => String)
  // @IsString()
  // //@IsDefined()
  // //@IsNotEmpty()
  // taxonomy?: string;

  // @IsOptional()
  // @Expose()
  // @Type(() => String)
  // @IsString()
  // // @IsDefined()
  // // @IsNotEmpty()
  // address?: string;

  // @IsOptional()
  // @Expose()
  // @IsMongoId()
  // // @IsDefined()
  // // @IsNotEmpty()
  // @Type(() => mongoose.Types.ObjectId)
  // country?: Ref<Country> | null;

  // @IsOptional()
  // @Expose()
  // @IsMongoId()
  // // @IsDefined()
  // // @IsNotEmpty()
  // @Type(() => mongoose.Types.ObjectId)
  // state?: Ref<States> | null;

  // @IsOptional()
  // @Expose()
  // @Type(() => String)
  // @IsString()
  // // @IsDefined()
  // // @IsNotEmpty()
  // postal_code?: string;

  // @IsOptional()
  // @Expose()
  // @Type(() => String)
  // @IsString()
  // // @IsDefined()
  // // @IsNotEmpty()
  // city?: string;

  // @IsOptional()
  // @Expose()
  // @Type(() => String)
  // @IsString()
  // @IsDefined()
  // @IsEmail()
  // @IsNotEmpty()
  // email?: string;

  // @IsOptional()
  // @Expose()
  // @IsNumber()
  // @IsDefined()
  // @IsNotEmpty()
  // @Type(() => Number)
  // //   @Min(10)
  // //   @Max(10)
  // contact?: number;

  // @IsOptional()
  // @Expose()
  // @Type(() => String)
  // @IsString()
  // @IsDefined()
  // @IsNotEmpty()
  // npiNo?: string;

  // @IsOptional()
  // @Expose()
  // @Type(() => String)
  // @IsString()
  // @IsDefined()
  // @IsNotEmpty()
  // fed_id?: string;

  // @IsOptional()
  // @Expose()
  // @Type(() => String)
  // @IsString()
  // @IsDefined()
  // @IsNotEmpty()
  // taxonomy?: string;

  // @IsOptional()
  // @Expose()
  // @Type(() => String)
  // @IsString()
  // @IsDefined()
  // @IsNotEmpty()
  // address?: string;

  // @IsOptional()
  // @Expose()
  // @Type(() => String)
  // @IsString()
  // @IsDefined()
  // @IsNotEmpty()
  // city?: string;

  // @IsOptional()
  // @Expose()
  // @IsMongoId()
  // @IsDefined()
  // @IsNotEmpty()
  // @Type(() => mongoose.Types.ObjectId)
  // state?: Ref<States> | null;

  // @IsOptional()
  // @ValidateIf(
  //   (x) => x.clinic_type === EClinicTypeValues.GROUP
  // )
  // @Expose()
  // @IsMongoId()
  // @IsDefined()
  // @IsNotEmpty()
  // @Type(() => mongoose.Types.ObjectId)
  // group?: Ref<ClinicGroup> | null;

  // @IsOptional()
  // @Expose()
  // @IsMongoId()
  // @IsDefined()
  // @IsNotEmpty()
  // @Type(() => mongoose.Types.ObjectId)
  // country?: Ref<Country> | null;

  // @Expose()
  // date_of_birth!: Date;

  // @Expose()
  // isPlanCancelled!: boolean;

  // @Expose()
  // role_permission!: any;
}
