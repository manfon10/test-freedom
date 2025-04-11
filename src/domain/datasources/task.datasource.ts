import { ITaskDto, IUpdateTaskDto } from "../dtos";
import { TaskEntity } from "../entities";
import { IFilterTasks, PaginatedResponse, PaginationParams } from "../interfaces";

export abstract class TaskDataSource {
  abstract getTasks(
    options: PaginationParams,
    filters: IFilterTasks
  ): Promise<PaginatedResponse<TaskEntity>>;
  abstract getTaskById(id: number): Promise<TaskEntity>;
  abstract getTasksByUserId(
    options: PaginationParams,
    user_id: number
  ): Promise<PaginatedResponse<TaskEntity>>;
  abstract createTask(data: ITaskDto): Promise<TaskEntity>;
  abstract updateTask(id: number, data: IUpdateTaskDto): Promise<TaskEntity>;
  abstract deleteTask(id: number): Promise<void>;
}
