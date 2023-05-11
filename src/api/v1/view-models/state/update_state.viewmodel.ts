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
} from "class-validator";

export class UpdateStateViewmodel {
  @Expose()
  @Type(() => String)
  @IsString()
  @IsDefined()
  @IsMongoId()
  @IsNotEmpty()
  _id!: string;

  @Expose()
  @Type(() => String)
  @IsString()
  @IsDefined()
  @IsNotEmpty()
  stateName!: string;

  @Expose()
  @Type(() => String)
  @IsString()
  @IsDefined()
  @IsNotEmpty()
  stateCode!: string;

  @Expose()
  @Type(() => String)
  @IsString()
  //@IsDefined()
  @IsMongoId()
  @IsNotEmpty()
  countryId!: String;

  @Expose()
  @Type(() => Boolean)
  //@IsDefined()
  isActive!: boolean;
}
