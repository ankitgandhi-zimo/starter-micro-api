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

export class UpdateCountryViewmodel {
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
  countryName!: string;

  @Expose()
  @Type(() => String)
  @IsString()
  @IsDefined()
  @IsNotEmpty()
  countryCode!: string;

  @Expose()
  @Type(() => Boolean)
  //@IsDefined()
  isActive!: boolean;
}
