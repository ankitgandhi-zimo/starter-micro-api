import { Expose, Type } from "class-transformer";
import { IsDefined, IsNotEmpty, IsOptional } from "class-validator";

export class GetBillingTeamListViewmodel {
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
  @Type(() => Boolean)
  isActive?: boolean;

  @IsOptional()
  @Expose()
  @Type(() => Boolean)
  isDeleted?: boolean;

  // @IsOptional()
  // @Expose()
  // @Type(() => String)
  // role_id?: string;
}
