import { mongoose, Ref } from "@typegoose/typegoose";
import { Expose, Type } from "class-transformer";
import {
  ArrayNotEmpty,
  IsArray,
  IsDateString,
  IsDefined,
  IsEnum,
  IsMongoId,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from "class-validator";
import { SuperBill } from "../../models/super_bill.model";

export class MarkPrintedViewmodel {
  @Expose()
  @Type(() => mongoose.Types.ObjectId)
  @IsDefined()
  @IsArray()
  @IsNotEmpty()
  super_bill_ids!: Ref<SuperBill>[];
}
