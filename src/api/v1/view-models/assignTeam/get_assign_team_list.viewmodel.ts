import { Expose, Type } from "class-transformer";
import { IsDefined, IsNotEmpty, IsOptional } from "class-validator";

export class GetAssignTeamListViewmodel {
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
}
