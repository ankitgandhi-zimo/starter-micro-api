import { Expose, Type } from "class-transformer";
import { IsDefined, IsEnum, IsNotEmpty, IsOptional } from "class-validator";
import { EBoolValues } from "../../models/user.model";

export class GetFilledTreatmentPlanListViewmodel {
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
  @Type(() => String)
  search?: string;

  @IsOptional()
  @Expose()
  @IsEnum(EBoolValues, {
    message: "isActive value must be boolean type i.e true or false",
  })
  isActive?: boolean;

  @IsOptional()
  @Expose()
  @Type(() => String)
  form_title?: string;

  @IsOptional()
  @Expose()
  @Type(() => String)
  clinic_id?: string;

  @IsOptional()
  @Expose()
  @Type(() => String)
  patient_id?: string;
}
