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
import { StringDecoder } from "string_decoder";
import { BillingTeam } from "../../models/billing_team.model";
import { Clinic } from "../../models/clinic.model";
import { Roles } from "../../models/roles.model";
import { User } from "../../models/user.model";

export class AssignMemberViewmodel {
  @Expose()
  @Type(() => mongoose.Types.ObjectId)
  @IsDefined()
  @IsMongoId()
  @IsNotEmpty()
  team_id!: Ref<BillingTeam>;

  @Expose()
  @Type(() => String)
  @IsDefined()
  @IsString()
  @IsNotEmpty()
  first_name!: string;

  @Expose()
  @Type(() => String)
  @IsDefined()
  @IsString()
  @IsNotEmpty()
  last_name!: string;

  @Expose()
  @Type(() => String)
  @IsDefined()
  @IsEmail()
  @IsString()
  @IsNotEmpty()
  email!: string;

  @Expose()
  @Type(() => mongoose.Types.ObjectId)
  @IsDefined()
  @IsMongoId()
  @IsNotEmpty()
  role_id!: Ref<Roles>;

  @Expose()
  @Type(() => Boolean)
  //@IsDefined()
  isActive!: boolean;
}
