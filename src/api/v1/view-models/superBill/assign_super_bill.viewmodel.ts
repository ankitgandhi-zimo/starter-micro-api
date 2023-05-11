import { mongoose, Ref } from "@typegoose/typegoose";
import { User } from "aws-sdk/clients/appstream";
import { Expose, Type } from "class-transformer";
import {
  IsDefined,
  IsMongoId,
  IsNotEmpty,
  IsOptional,
  IsString,
} from "class-validator";
import { BillingTeam } from "../../models/billing_team.model";
import { SuperBill } from "../../models/super_bill.model";

export class AssignSuperBillViewmodel {
  @IsOptional()
  @Expose()
  @Type(() => String)
  @IsString()
  @IsDefined()
  @IsNotEmpty()
  discription?: string;

  @Expose()
  @Type(() => mongoose.Types.ObjectId)
  @IsDefined()
  @IsMongoId()
  @IsNotEmpty()
  superbillId!: Ref<SuperBill> | null;

  @Expose()
  @Type(() => mongoose.Types.ObjectId)
  @IsDefined()
  @IsMongoId()
  @IsNotEmpty()
  assignedTo!: Ref<User> | null;

  @Expose()
  @Type(() => mongoose.Types.ObjectId)
  @IsDefined()
  @IsMongoId()
  @IsNotEmpty()
  teamId!: Ref<BillingTeam> | null;

  @Expose()
  createdby_id!: Ref<User> | null;
}
