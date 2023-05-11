import { Expose, Type } from "class-transformer";
import {
  IsDefined,
  IsEnum,
  IsMongoId,
  IsNotEmpty,
  IsOptional,
} from "class-validator";
import mongoose from "mongoose";
import { ECodeCategoryValues } from "../models/ict.model";

export class ListViewmodel {
  @Expose()
  @IsOptional()
  @Type(() => String)
  search?: string;

  @Expose()
  @IsOptional()
  @IsNotEmpty()
  @Type(() => String)
  ictCode?: string;

  @Expose()
  @IsOptional()
  @IsNotEmpty()
  @Type(() => String)
  cptCode?: string;

  @Expose()
  @IsOptional()
  @IsNotEmpty()
  @Type(() => String)
  modifierCode?: string;

  @Expose()
  @IsOptional()
  @IsNotEmpty()
  @Type(() => String)
  HCPCS?: string;

  @Expose()
  @IsEnum(ECodeCategoryValues, {
    message: "codeCategory can only be ICD-9/ICD-10",
  })
  @IsOptional()
  @IsNotEmpty()
  codeCategory!: string;

  @IsOptional()
  @Expose()
  @Type(() => String)
  isActive?: string;
}
