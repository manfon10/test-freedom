# Proyecto Node.js con Docker

Este proyecto está construido con **Node.js** y utiliza **Docker** para facilitar el despliegue y configuración del entorno.

## 🚀 Requisitos

Asegúrate de tener instalados los siguientes programas antes de ejecutar el proyecto:

- **Node.js** v18 o superior
- **Docker**
- **Docker Compose**

## ⚙️ Configuración del entorno

1. Copia el archivo `.env.example` y renómbralo según el entorno que vayas a utilizar:

   - Para desarrollo: `.env.development`
   - Para producción: `.env.production`

2. Completa las variables de entorno con los valores adecuados. Puedes guiarte por el archivo `.env.example`.

> ⚠️ **Importante:** Las variables relacionadas con la base de datos (como nombre de base de datos, usuario, contraseña, host y puerto) deben coincidir con las asignadas por los contenedores en el archivo `docker-compose.yml`.

🏃‍♂️ Ejecución del proyecto

Clona el repositorio:

```bash
git clone <URL_DEL_REPOSITORIO>
cd <NOMBRE_DEL_REPOSITORIO>
```

🧩 Instalación de dependencias

```bash
npm install
```

🐳 Levantar servicios con Docker

⚠️ **Importante:** Las variables deben estar creadas en su respectivo .env.development o .env.production

Para iniciar los servicios (por ejemplo, base de datos) definidos en `docker-compose.yml`, ejecuta:

En modo desarrollo

```bash
npm run dev
```

En modo producción

```bash
npm  start
```

📚 Documentación de la API

Una vez levantado el proyecto, puedes acceder a la documentación de la API en:

```bash
http://localhost:PUERTO/api
```

(Reemplaza PUERTO con el puerto correspondiente definido en tu archivo .env).
