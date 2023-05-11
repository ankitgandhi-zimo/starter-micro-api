import { Expose, Type } from "class-transformer";
import { IsDefined, IsMongoId, IsNotEmpty, IsOptional } from "class-validator";

export class GetBillingTeamClinicsListViewmodel {
  @Expose()
  @Type(() => String)
  @IsDefined()
  @IsMongoId()
  @IsNotEmpty()
  team_id!: string;

  @Expose()
  @Type(() => String)
  @IsOptional()
  search!: string;

  @IsOptional()
  @Expose()
  @Type(() => Boolean)
  //@IsDefined()
  isActive?: boolean;

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
}
