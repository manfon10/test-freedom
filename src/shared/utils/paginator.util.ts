import { Model, ModelStatic } from "sequelize";

import { PaginatedResponse, paginateOptions } from "../../domain";

export class Paginator<T extends Model> {
  private model: ModelStatic<T>;

  constructor(model: ModelStatic<T>) {
    this.model = model;
  }

  async paginate({
    currentPage = 1,
    limitTo = 10,
    options,
  }: paginateOptions): Promise<PaginatedResponse<T>> {
    const offset = (currentPage - 1) * limitTo;

    const data = await this.model.findAll<T>(options);

    const totalRecords = data.length;

    const result = await this.model.findAll<T>({ ...options, offset, limit: limitTo });

    const lastPage = totalRecords > 0 ? Math.ceil(totalRecords / limitTo) : 0;

    const hasMorePages = currentPage < lastPage;

    return {
      last_page: lastPage,
      total_records: totalRecords,
      current_page: +currentPage,
      has_more_pages: hasMorePages,
      data: result,
    };
  }
}
