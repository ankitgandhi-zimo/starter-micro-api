import { Ref } from "@typegoose/typegoose";
import { Expose, Type } from "class-transformer";
import { IsDefined, IsMongoId, IsNotEmpty } from "class-validator";
import mongoose from "mongoose";
import { Appointment } from "../../models/appointment.model";
import { ClaimResponse } from "../../models/claim_response.model";
import { Doctor } from "../../models/doctor.model";
import { Insurance } from "../../models/insurance/insurance.model";

export class GetClaimDetailsViewmodel {
  @Expose()
  @IsDefined()
  @IsNotEmpty()
  @IsMongoId()
  @Type(() => mongoose.Types.ObjectId)
  claimId!: Ref<ClaimResponse>;

  @Expose()
  @IsDefined()
  @IsNotEmpty()
  @IsMongoId()
  @Type(() => mongoose.Types.ObjectId)
  dependent!: Ref<Insurance>;

  @Expose()
  @IsDefined()
  @IsNotEmpty()
  @IsMongoId()
  @Type(() => mongoose.Types.ObjectId)
  billingProvider!: Ref<Doctor>;

  @Expose()
  @IsDefined()
  @IsNotEmpty()
  @IsMongoId()
  @Type(() => mongoose.Types.ObjectId)
  serviceProvider!: Ref<Doctor>;

  // @Expose()
  // @IsDefined()
  // @IsNotEmpty()
  // @IsMongoId()
  // @Type(() => mongoose.Types.ObjectId)
  // claimInformation!: Ref<DoctorCheckout>;

  @Expose()
  @IsDefined()
  @IsNotEmpty()
  @IsMongoId()
  @Type(() => mongoose.Types.ObjectId)
  appointmentId!: Ref<Appointment>;

  // @Expose()
  // @IsDefined()
  // @IsNotEmpty()
  // @IsMongoId()
  // @Type(() => mongoose.Types.ObjectId)
  // superBillId!: Ref<SuperBill>;
}
