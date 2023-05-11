import { Expose, Type } from "class-transformer";
import { IsDefined, IsMongoId, IsNotEmpty, IsOptional } from "class-validator";

export class GetFilledProgressNoteListViewmodel {
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
  @Type(() => String)
  isActive?: string;

  @IsOptional()
  @Expose()
  @Type(() => String)
  form_title?: string;

  @Expose()
  @Type(() => String)
  @IsDefined()
  @IsMongoId()
  @IsNotEmpty()
  clinic_id!: String;

  @Expose()
  @Type(() => String)
  @IsDefined()
  @IsMongoId()
  @IsNotEmpty()
  patient_id!: String;
}
