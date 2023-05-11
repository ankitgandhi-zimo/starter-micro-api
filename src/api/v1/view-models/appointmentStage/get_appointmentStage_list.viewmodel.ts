import { Expose, Type } from "class-transformer";
import { IsDefined, IsNotEmpty, IsOptional } from "class-validator";

export class GetAppointmentStageListViewmodel {
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
  stage?: string;

  @IsOptional()
  @Expose()
  @Type(() => String)
  search?: string;

  @IsOptional()
  @Expose()
  @Type(() => Boolean)
  isActive?: boolean;
}
