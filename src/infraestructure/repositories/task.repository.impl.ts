import {
  IFilterTasks,
  ITaskDto,
  IUpdateTaskDto,
  PaginatedResponse,
  PaginationParams,
  TaskDataSource,
  TaskEntity,
  TaskRepository,
} from "../../domain";

export class TaskRepositoryImpl implements TaskRepository {
  constructor(private readonly datasource: TaskDataSource) {}

  async getTasks(
    options: PaginationParams,
    filters: IFilterTasks
  ): Promise<PaginatedResponse<TaskEntity>> {
    return await this.datasource.getTasks(options, filters);
  }

  async getTaskById(id: number): Promise<TaskEntity> {
    return await this.datasource.getTaskById(id);
  }

  async getTasksByUserId(
    options: PaginationParams,
    user_id: number
  ): Promise<PaginatedResponse<TaskEntity>> {
    return await this.datasource.getTasksByUserId(options, user_id);
  }

  async createTask(data: ITaskDto): Promise<TaskEntity> {
    return await this.datasource.createTask(data);
  }

  async updateTask(id: number, data: IUpdateTaskDto): Promise<TaskEntity> {
    return await this.datasource.updateTask(id, data);
  }

  async deleteTask(id: number): Promise<void> {
    return await this.datasource.deleteTask(id);
  }
}
