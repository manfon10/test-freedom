import { FindOptions, WhereOptions } from "sequelize";

import Task from "../../data/sequelize/models/task.model";
import User from "../../data/sequelize/models/user.model";

import {
  PaginationParams,
  PaginatedResponse,
  TaskEntity,
  TaskDataSource,
  ITaskDto,
  IFilterTasks,
} from "../../domain";

import { Paginator } from "../../shared";

export class TaskDataSourceImpl implements TaskDataSource {
  private paginator: Paginator<Task>;

  constructor() {
    this.paginator = new Paginator<Task>(Task);
  }

  async getTasks(
    { limit, page }: PaginationParams,
    filters: IFilterTasks
  ): Promise<PaginatedResponse<TaskEntity>> {
    const optionsFilter: FindOptions = {
      attributes: ["id", "title", "description", "status", "due_date"],
      include: [
        {
          as: "user",
          attributes: ["id", "email"],
          model: User,
        },
      ],
      where: filters as WhereOptions,
    };

    const paginatedResult = await this.paginator.paginate({
      options: optionsFilter,
      currentPage: page,
      limitTo: limit,
    });

    const data = paginatedResult.data.map(TaskEntity.fromObject);

    return {
      ...paginatedResult,
      data,
    };
  }

  async getTaskById(id: number): Promise<TaskEntity> {
    const task = await Task.findOne({
      attributes: ["id", "title", "description", "status", "due_date"],
      include: [
        {
          as: "user",
          attributes: ["id", "email"],
          model: User,
        },
      ],
      where: { id },
    });

    return TaskEntity.fromObject(task!);
  }

  async getTasksByUserId(
    { limit, page }: PaginationParams,
    user_id: number
  ): Promise<PaginatedResponse<TaskEntity>> {
    const optionsFilter: FindOptions = {
      attributes: ["id", "title", "description", "status", "due_date"],
      include: [
        {
          as: "user",
          attributes: ["id", "email"],
          model: User,
        },
      ],
      where: { user_id },
    };

    const paginatedResult = await this.paginator.paginate({
      options: optionsFilter,
      currentPage: page,
      limitTo: limit,
    });

    const data = paginatedResult.data.map(TaskEntity.fromObject);

    return {
      ...paginatedResult,
      data,
    };
  }

  async createTask(data: ITaskDto): Promise<TaskEntity> {
    const task = await Task.create(data);

    return TaskEntity.fromObject(task);
  }

  async updateTask(id: number, data: ITaskDto): Promise<TaskEntity> {
    await Task.update(data, { where: { id } });

    return this.getTaskById(id);
  }

  async deleteTask(id: number): Promise<void> {
    await Task.destroy({ where: { id } });
  }
}
