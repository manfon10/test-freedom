import { Router } from "express";

import { AuthController } from "../controllers";

import { authAdapter, UserDataSourceImpl, UserRepositoryImpl } from "../../infraestructure";

export class AuthRoutes {
  static get routes(): Router {
    const router = Router();

    const userDatasource = new UserDataSourceImpl();
    const userRepository = new UserRepositoryImpl(userDatasource);

    const authController = new AuthController(userRepository);

    /**
     * @swagger
     * /auth/profile:
     *   get:
     *     summary: Obtiene los datos del perfil del usuario autenticado
     *     tags: [Auth]
     *     security:
     *       - bearerAuth: []
     *     responses:
     *       200:
     *         description: Datos del perfil
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/ProfileResponse'
     *       403:
     *        description: Token inválido o no proporcionado
     *        content:
     *          application/json:
     *           schema:
     *             $ref: '#/components/schemas/ErrorResponse'
     */

    router.get(
      "/profile",
      authAdapter.checkToken,
      authController.getProfileData.bind(authController)
    );

    /**
     * @swagger
     * /auth/register:
     *   post:
     *     summary: Registra un nuevo usuario
     *     tags: [Auth]
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             $ref: '#/components/schemas/RegisterRequest'
     *     responses:
     *       201:
     *         description: Usuario registrado correctamente
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/AuthResponse'
     *       400:
     *         description: Datos inválidos o usuario ya existente
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/ErrorResponse'
     */

    router.post("/register", authController.register.bind(authController));

    /**
     * @swagger
     * /auth/login:
     *   post:
     *     summary: Inicia sesión de usuario
     *     tags: [Auth]
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             $ref: '#/components/schemas/LoginRequest'
     *     responses:
     *       200:
     *         description: Login exitoso
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/AuthResponse'
     *       401:
     *         description: Datos Incorrectos
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/ErrorResponse'
     */

    router.post("/login", authController.login.bind(authController));

    return router;
  }
}
