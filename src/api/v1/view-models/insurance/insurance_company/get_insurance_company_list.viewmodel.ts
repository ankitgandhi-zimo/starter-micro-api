import { Expose, Type } from "class-transformer";
import {
  IsDefined,
  IsNotEmpty,
  IsNumber,
  IsOptional,
} from "class-validator";

export class GetInsuranceCompanyListViewmodel {
  @IsOptional()
  @Expose()
  @IsDefined()
  @IsNumber()
  @IsNotEmpty()
  @Type(() => Number)
  pageNumber?: number;

  @IsOptional()
  @Expose()
  @IsNumber()
  @IsDefined()
  @IsNotEmpty()
  @Type(() => Number)
  pageSize?: number;

  @IsOptional()
  @Expose()
  @IsDefined()
  // @IsEnum(EBoolValues, {
  //   message:
  //     "isActive value must be boolean type i.e true or false",
  // })
  isActive?: boolean;

  @IsOptional()
  @Expose()
  @Type(() => String)
  search?: string;

  @IsOptional()
  @Expose()
  @IsDefined()
  // @IsEnum(EBoolValues, {
  //   message: "isDeleted value must be boolean type i.e true or false",
  // })
  isDeleted?: boolean;

  //   @IsOptional()
  //   @Expose()
  //   @IsMongoId()
  //   @IsDefined()
  //   @IsNotEmpty()
  //   @Type(() => mongoose.Types.ObjectId)
  //   patient_id?: Ref<Patients> | null;
}
