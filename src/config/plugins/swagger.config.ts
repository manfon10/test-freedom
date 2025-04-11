import swaggerJSDoc from "swagger-jsdoc";

const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "API - Sistema de Tareas",
      version: "1.0.0",
      description: "Documentación de la API",
    },
    components: {
      schemas: {
        RegisterRequest: {
          type: "object",
          required: ["email", "password"],
          properties: {
            role: {
              type: "string",
              example: "ADMIN",
            },
            email: {
              type: "string",
              format: "email",
              example: "manuel@gmail.com",
            },
            password: {
              type: "string",
              format: "password",
              example: "Manuel123",
            },
          },
        },
        LoginRequest: {
          type: "object",
          required: ["email", "password"],
          properties: {
            email: {
              type: "string",
              format: "email",
              example: "manuel@gmail.com",
            },
            password: {
              type: "string",
              format: "password",
              example: "Manuel123",
            },
          },
        },
        AuthResponse: {
          type: "object",
          properties: {
            user: {
              type: "object",
              properties: {
                id: {
                  type: "string",
                  example: "60d21b4667d0d8992e610c85",
                },
                email: {
                  type: "string",
                  example: "manuel@gmail.com",
                },
              },
            },
            access_token: {
              type: "string",
              example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
            },
            refresh_token: {
              type: "string",
              example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
            },
          },
        },
        ProfileResponse: {
          type: "object",
          properties: {
            user: {
              type: "object",
              properties: {
                id: {
                  type: "string",
                  example: "60d21b4667d0d8992e610c85",
                },
                email: {
                  type: "string",
                  example: "manueld@gmail.com",
                },
                role: {
                  type: "string",
                  example: "USER",
                },
              },
            },
          },
        },
        ErrorResponse: {
          type: "object",
          properties: {
            name: {
              type: "string",
              example: "ForbiddenError",
            },
            message: {
              type: "string",
              example: "El token es requerido",
            },
          },
        },
        Task: {
          type: "object",
          properties: {
            id: {
              type: "string",
              example: "60d21b4667d0d8992e610c85",
            },
            title: {
              type: "string",
              example: "Completar informe mensual",
            },
            description: {
              type: "string",
              example: "Preparar y enviar el informe mensual de actividades al equipo directivo",
            },
            status: {
              type: "string",
              enum: ["TODO", "IN_PROGRESS", "DONE"],
              example: "IN_PROGRESS",
            },
            due_date: {
              type: "string",
              format: "date-time",
              example: "2025-04-30T23:59:59Z",
            },
            created_at: {
              type: "string",
              format: "date-time",
              example: "2025-04-11T10:30:00Z",
            },
            updated_at: {
              type: "string",
              format: "date-time",
              example: "2025-04-11T15:45:00Z",
            },
          },
        },
        CreateTaskRequest: {
          type: "object",
          required: ["title", "description", "status"],
          properties: {
            title: {
              type: "string",
              example: "Completar informe mensual",
            },
            description: {
              type: "string",
              example: "Preparar y enviar el informe mensual de actividades al equipo directivo",
            },
            status: {
              type: "string",
              enum: ["TODO", "IN_PROGRESS", "DONE"],
              example: "TODO",
            },
            due_date: {
              type: "string",
              format: "date-time",
              example: "2025-04-30T23:59:59Z",
            },
          },
        },
        UpdateTaskRequest: {
          type: "object",
          properties: {
            title: {
              type: "string",
              example: "Completar informe mensual actualizado",
            },
            description: {
              type: "string",
              example:
                "Preparar, revisar y enviar el informe mensual de actividades al equipo directivo",
            },
            status: {
              type: "string",
              enum: ["TODO", "IN_PROGRESS", "DONE"],
              example: "IN_PROGRESS",
            },
            due_date: {
              type: "string",
              format: "date-time",
              example: "2025-05-02T23:59:59Z",
            },
          },
        },
        TaskResponse: {
          type: "object",
          properties: {
            task: {
              $ref: "#/components/schemas/Task",
            },
          },
        },
        TasksResponse: {
          type: "object",
          properties: {
            tasks: {
              type: "array",
              items: {
                $ref: "#/components/schemas/Task",
              },
            },
          },
        },
      },
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
  },
  apis: ["./src/presentation/routes/*.routes.ts"],
};

export const swaggerSpec = swaggerJSDoc(swaggerOptions);
