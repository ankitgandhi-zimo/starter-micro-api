import { Expose, Type } from "class-transformer";
import {
  IsDefined,
  IsNotEmpty,
  IsNumber,
  IsOptional,
} from "class-validator";

export class GetClinicGroupListViewmodel {
  @IsOptional()
  @Expose()
  @IsDefined()
  @IsNumber()
  @IsNotEmpty()
  @Type(() => Number)
  pageNumber?: number;

  @IsOptional()
  @Expose()
  @IsNumber()
  @IsDefined()
  @IsNotEmpty()
  @Type(() => Number)
  pageSize?: number;

  @IsOptional()
  @Expose()
  @IsDefined()
  // @IsEnum(EBoolValues, {
  //   message:
  //     "isActive value must be boolean type i.e true or false",
  // })
  isActive?: boolean;

  @IsOptional()
  @Expose()
  // @IsString()
  // @IsDefined()
  // @IsNotEmpty()
  // @Type(() => String)
  group_name?: string;
}
