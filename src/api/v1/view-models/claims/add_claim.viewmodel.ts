import { Ref } from "@typegoose/typegoose";
import { Expose, Type } from "class-transformer";
import {
  IsDefined,
  IsMongoId,
  IsNotEmpty,
  IsOptional,
} from "class-validator";
import mongoose from "mongoose";
import { Clinic } from "../../models/clinic.model";
import { SuperBill } from "../../models/super_bill.model";

export class AddClaimViewmodel {
  //   @Expose()
  //   @IsDefined()
  //   @IsNotEmpty()
  //   @IsMongoId()
  //   @Type(() => mongoose.Types.ObjectId)
  //   receiver!: Ref<InsuranceCompanies>;

  //   @Expose()
  //   @IsDefined()
  //   @IsNotEmpty()
  //   @IsMongoId()
  //   @Type(() => mongoose.Types.ObjectId)
  //   subscriber!: Ref<Patients>;

  // @Expose()
  // @IsDefined()
  // @IsNotEmpty()
  // @IsMongoId()
  // @Type(() => mongoose.Types.ObjectId)
  // dependent!: Ref<Insurance>;

  // @Expose()
  // @IsDefined()
  // @IsNotEmpty()
  // @IsMongoId()
  // @Type(() => mongoose.Types.ObjectId)
  // billingProvider!: Ref<Doctor>;

  // @Expose()
  // @IsDefined()
  // @IsNotEmpty()
  // @IsMongoId()
  // @Type(() => mongoose.Types.ObjectId)
  // referringProvider!: Ref<Doctor>;

  // @Expose()
  // @IsDefined()
  // @IsNotEmpty()
  // @IsMongoId()
  // @Type(() => mongoose.Types.ObjectId)
  // renderingProvider!: Ref<Doctor>;

  @Expose()
  @IsDefined()
  @IsNotEmpty()
  @IsMongoId()
  @Type(() => mongoose.Types.ObjectId)
  superBillId!: Ref<SuperBill>;

  @IsOptional()
  @Expose()
  @IsDefined()
  @IsNotEmpty()
  @IsMongoId()
  @Type(() => mongoose.Types.ObjectId)
  clinic_id?: Ref<Clinic>;
}
