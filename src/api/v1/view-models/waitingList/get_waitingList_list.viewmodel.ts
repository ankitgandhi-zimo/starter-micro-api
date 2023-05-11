import { Expose, Type } from "class-transformer";
import {
  IsDefined,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsMongoId,
} from "class-validator";

export class GetWaitingListViewmodel {
  @IsOptional()
  @Expose()
  @IsDefined()
  @IsNotEmpty()
  @Type(() => Number)
  pageNumber?: number;

  @IsOptional()
  @Expose()
  @IsDefined()
  @IsNotEmpty()
  @Type(() => Number)
  pageSize?: number;

  @IsOptional()
  @Expose()
  //@IsDefined()
  @IsNotEmpty()
  @Type(() => String)
  notes?: string;

  @IsOptional()
  @Expose()
  @Type(() => String)
  search?: string;

  @IsOptional()
  @Expose()
  @Type(() => Boolean)
  isActive?: boolean;

  @Expose()
  @Type(() => String)
  @IsString()
  @IsDefined()
  @IsMongoId()
  @IsNotEmpty()
  doctor_id!: String;
}
