import { Expose, Type } from "class-transformer";
import { IsDefined, IsNotEmpty, IsOptional } from "class-validator";

export class PaginationViewModel {
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
