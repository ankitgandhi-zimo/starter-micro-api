import { Ref } from "@typegoose/typegoose";
import { User } from "aws-sdk/clients/budgets";
import { Expose, Type } from "class-transformer";
import {
  ArrayNotEmpty,
  IsArray,
  IsDate,
  IsDateString,
  IsDefined,
  IsEnum,
  IsMongoId,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from "class-validator";
import mongoose from "mongoose";

export enum Status {
  Unavailable = "Unavailable",
}

export class DeleteUnavailabilityViewmodel {
  @Expose()
  @IsDefined()
  @IsNotEmpty()
  @Type(() => String)
  appointment_number?: string;

  /////////////////////////////////////////////////////////////////////
}
