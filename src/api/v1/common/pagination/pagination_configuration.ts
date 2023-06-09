import { plugin } from "@typegoose/typegoose";
import { FilterQuery, PaginateOptions, PaginateResult } from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

type PaginateMethod<T> = (
  query?: FilterQuery<T>,
  options?: PaginateOptions,
  callback?: (err: any, result: PaginateResult<T>) => void
) => Promise<PaginateResult<T>>;

@plugin(mongoosePaginate)
export class PaginatedModel {
  static paginate: PaginateMethod<PaginatedModel>;
}

export const PaginationDefaultOptions = {
  page: 1,
  limit: 50,
};
