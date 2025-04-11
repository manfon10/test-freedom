import {
  AppError,
  IFilterTasks,
  ITaskDto,
  IUpdateTaskDto,
  PaginatedResponse,
  PaginationParams,
  TaskEntity,
  TaskRepository,
} from "../../domain";

import { NotificationPort } from "../adapters";

export class TaskService {
  constructor(
    private readonly taskRepository: TaskRepository,
    private readonly notificationPort: NotificationPort
  ) {}

  async getTaskById(id: number): Promise<TaskEntity> {
    const task = await this.taskRepository.getTaskById(id);

    if (!task) {
      throw AppError.badRequest("La tarea no existe");
    }

    return task;
  }

  async getTasks(
    options: PaginationParams,
    filters: IFilterTasks
  ): Promise<PaginatedResponse<TaskEntity>> {
    const filtersQuery = {
      ...(filters.status && { status: filters.status }),
      ...(filters.due_date && { due_date: filters.due_date }),
    };

    const tasks = await this.taskRepository.getTasks(options, filtersQuery);

    return tasks;
  }

  async getTasksByUserId(
    page: number,
    limit: number,
    user_id: number
  ): Promise<PaginatedResponse<TaskEntity>> {
    const tasks = await this.taskRepository.getTasksByUserId({ page, limit }, user_id);

    return tasks;
  }

  async createTask(data: ITaskDto): Promise<TaskEntity> {
    const task = await this.taskRepository.createTask(data);

    this.notificationPort.notifyAdmins("channel-admins", "task-created", {
      task_id: task.id,
      data,
    });

    return task;
  }

  async updateTask(id: number, data: IUpdateTaskDto): Promise<TaskEntity> {
    const taskExist = await this.taskRepository.getTaskById(id);

    if (!taskExist) {
      throw AppError.badRequest("La tarea no existe");
    }

    const task = await this.taskRepository.updateTask(id, data);

    this.notificationPort.notifyAdmins("channel-admins", "task-updated", {
      task_id: task.id,
      data,
    });

    return task;
  }

  async deleteTask(id: number): Promise<void> {
    const task = await this.taskRepository.getTaskById(id);

    if (!task) {
      throw AppError.badRequest("La tarea no existe");
    }

    await this.taskRepository.deleteTask(id);
  }
}
