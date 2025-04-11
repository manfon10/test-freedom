import { FindOptions } from "sequelize";

export interface PaginatedResponse<T> {
  last_page: number;
  total_records: number;
  current_page: number;
  has_more_pages: boolean;
  data: T[];
}

export interface PaginationParams {
  page: number;
  limit: number;
}

export interface paginateOptions {
  currentPage?: number;
  limitTo?: number;
  options: FindOptions;
}
