import { Expose, Type } from "class-transformer";
import { IsDefined, IsNotEmpty, IsString, IsMongoId } from "class-validator";

export class AddCountryViewmodel {
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
  @Type(() => String)
  @IsString()
  //@IsDefined()
  @IsMongoId()
  @IsNotEmpty()
  createdby_id!: String;
}
