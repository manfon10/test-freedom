import { Router } from "express";

import { createTaskDto, getAllDto, getByIdDto } from "../../domain";
import Permission from "../../domain/constants/permission.const";
import {
  authAdapter,
  SocketNotificationAdapter,
  TaskDataSourceImpl,
  TaskRepositoryImpl,
} from "../../infraestructure/";
import { TaskController } from "../controllers";
import { PermissionHandler } from "../middlewares/permissions.handler";

export class TaskRoutes {
  static get routes(): Router {
    const router = Router();

    const taskDatasource = new TaskDataSourceImpl();
    const taskRepository = new TaskRepositoryImpl(taskDatasource);

    const notificationAdapter = new SocketNotificationAdapter();

    const taskController = new TaskController(taskRepository, notificationAdapter);

    router.use(authAdapter.checkToken);

    /**
     * @swagger
     * /tasks:
     *   get:
     *     summary: Obtener todas las tareas
     *     tags: [Tasks]
     *     security:
     *       - bearerAuth: []
     *     parameters:
     *       - in: query
     *         name: page
     *         schema:
     *           type: integer
     *           minimum: 1
     *           default: 1
     *         description: Número de página para la paginación
     *       - in: query
     *         name: limit
     *         schema:
     *           type: integer
     *           minimum: 1
     *           maximum: 100
     *           default: 10
     *         description: Cantidad de elementos por página
     *       - in: query
     *         name: status
     *         schema:
     *           type: string
     *           enum: [TODO, IN_PROGRESS, DONE]
     *         description: Filtrar tareas por estado
     *       - in: query
     *         name: due_date
     *         schema:
     *           type: string
     *           format: date
     *         description: Filtrar tareas por fecha de vencimiento (formato YYYY-MM-DD)
     *     responses:
     *       200:
     *         description: Lista de todas las tareas
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/TasksResponse'
     *       401:
     *         description: No autorizado
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/ErrorResponse'
     *       500:
     *         description: Error del servidor
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/ErrorResponse'
     * */

    router.get(
      "/",
      getAllDto.validate,
      PermissionHandler.validatePermission(Permission.GET_TASKS),
      taskController.getTasks.bind(taskController)
    );

    /**
     * @swagger
     * /tasks/my:
     *   get:
     *     summary: Obtiene las tareas del usuario autenticado
     *     tags: [Tasks]
     *     description: Retorna todas las tareas del usuario autenticado actual
     *     security:
     *       - bearerAuth: []
     *     responses:
     *       200:
     *         description: Lista de tareas del usuario obtenida con éxito
     *         content:
     *           application/json:
     *             schema:
     *               type: array
     *               items:
     *                 $ref: '#/components/schemas/Task'
     *       401:
     *         description: No autorizado, token inválido o expirado
     *       500:
     *         description: Error del servidor
     */

    router.get(
      "/my",
      PermissionHandler.validatePermission(Permission.GET_MY_TASKS),
      taskController.getTasks.bind(taskController)
    );

    /**
     * @swagger
     * /tasks/{id}:
     *   get:
     *     summary: Obtiene una tarea por ID
     *     tags: [Tasks]
     *     description: Retorna una tarea específica basada en el ID proporcionado
     *     security:
     *       - bearerAuth: []
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         schema:
     *           type: string
     *         description: ID de la tarea a obtener
     *     responses:
     *       200:
     *         description: Tarea obtenida con éxito
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/Task'
     *       404:
     *         description: Tarea no encontrada
     *       401:
     *         description: No autorizado
     *       500:
     *         description: Error del servidor
     *
     *   put:
     *     summary: Actualiza una tarea existente
     *     tags: [Tasks]
     *     description: Actualiza los datos de una tarea existente basado en el ID proporcionado
     *     security:
     *       - bearerAuth: []
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         schema:
     *           type: string
     *         description: ID de la tarea a actualizar
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             $ref: '#/components/schemas/CreateTaskRequest'
     *     responses:
     *       200:
     *         description: Tarea actualizada con éxito
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/Task'
     *       400:
     *         description: Datos inválidos
     *       404:
     *         description: Tarea no encontrada
     *       401:
     *         description: No autorizado
     *       500:
     *         description: Error del servidor
     *
     *   delete:
     *     summary: Elimina una tarea
     *     tags: [Tasks]
     *     description: Elimina una tarea basada en el ID proporcionado
     *     security:
     *       - bearerAuth: []
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         schema:
     *           type: string
     *         description: ID de la tarea a eliminar
     *     responses:
     *       200:
     *         description: Tarea eliminada con éxito
     *       404:
     *         description: Tarea no encontrada
     *       401:
     *         description: No autorizado
     *       500:
     *         description: Error del servidor
     */

    router.get(
      "/:id",
      PermissionHandler.validatePermission(Permission.GET_TASK),
      getByIdDto.validate,
      taskController.getTasks.bind(taskController)
    );

    router.put(
      "/:id",
      PermissionHandler.validatePermission(Permission.UPDATE_TASK),
      getByIdDto.validate,
      taskController.updateTask.bind(taskController)
    );

    router.delete(
      "/:id",
      PermissionHandler.validatePermission(Permission.DELETE_TASK),
      getByIdDto.validate,
      taskController.deleteTask.bind(taskController)
    );

    /**
     * @swagger
     * /tasks:
     *   get:
     *     summary: Obtiene todas las tareas
     *     tags: [Tasks]
     *     description: Retorna una lista de todas las tareas disponibles
     *     security:
     *       - bearerAuth: []
     *     responses:
     *       200:
     *         description: Lista de tareas obtenida con éxito
     *         content:
     *           application/json:
     *             schema:
     *               type: array
     *               items:
     *                 $ref: '#/components/schemas/Task'
     *       401:
     *         description: No autorizado, token inválido o expirado
     *       500:
     *         description: Error del servidor
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/ErrorResponse'
     *
     *   post:
     *     summary: Crea una nueva tarea
     *     tags: [Tasks]
     *     description: Crea una nueva tarea con los datos proporcionados
     *     security:
     *       - bearerAuth: []
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             $ref: '#/components/schemas/CreateTaskRequest'
     *     responses:
     *       201:
     *         description: Tarea creada con éxito
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/Task'
     *       400:
     *         description: Datos inválidos
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/ErrorResponse'
     *       401:
     *         description: No autorizado
     *       500:
     *         description: Error del servidor
     */

    router.post(
      "/",
      PermissionHandler.validatePermission(Permission.CREATE_TASK),
      createTaskDto.validate,
      taskController.createTask.bind(taskController)
    );

    return router;
  }
}
