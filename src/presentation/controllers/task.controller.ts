import { NextFunction, Response } from "express";

import { HttpRequest } from "../../domain/interfaces";
import { TaskRepository } from "../../domain/repositories";
import { TaskService } from "../../infraestructure/services";
import { NotificationPort } from "../../infraestructure";

export class TaskController {
  private taskService: TaskService;

  constructor(
    private readonly taskRepository: TaskRepository,
    private readonly notificationAdapter: NotificationPort
  ) {
    this.taskRepository = this.taskRepository;

    this.taskService = new TaskService(this.taskRepository, this.notificationAdapter);
  }

  async getTasks(req: HttpRequest, res: Response, _next: NextFunction): Promise<void> {
    const { page, limit, status, due_date } = req.query;

    const tasks = await this.taskService.getTasks({ page, limit }, { status, due_date });

    res.status(200).json({ tasks });
  }

  async getTaskById(req: HttpRequest, res: Response, next: NextFunction): Promise<void> {
    const { id } = req.params;

    try {
      const task = await this.taskService.getTaskById(id);

      res.status(200).json({ task });
    } catch (error) {
      next(error);
    }
  }

  async createTask(req: HttpRequest, res: Response, next: NextFunction): Promise<void> {
    const { id } = req.user!;

    const { title, description, status, due_date } = req.body;

    try {
      const task = await this.taskService.createTask({
        title,
        description,
        status,
        due_date,
        user_id: id,
      });

      res.status(201).json({ task });
    } catch (error) {
      next(error);
    }
  }

  async deleteTask(req: HttpRequest, res: Response, next: NextFunction): Promise<void> {
    const { id } = req.params;

    try {
      await this.taskService.deleteTask(id);

      res.status(201).json({ message: "Tarea eliminada" });
    } catch (error) {
      next(error);
    }
  }

  async updateTask(req: HttpRequest, res: Response, next: NextFunction): Promise<void> {
    const { id } = req.params;

    const { title, description, status, due_date } = req.body;

    try {
      const task = await this.taskService.updateTask(id, {
        title,
        description,
        status,
        due_date,
      });

      res.status(201).json({ task });
    } catch (error) {
      next(error);
    }
  }
}
