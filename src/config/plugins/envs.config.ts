import dotenv from "dotenv";
import { get } from "env-var";
import path from "path";

const env = process.env.NODE_ENV || "development";

const envPath = path.resolve(__dirname, `../../../.env.${env}`);

dotenv.config({ path: envPath });

export const envs = {
  NODE_ENV: get("NODE_ENV").default("development").asString(),
  APP_PORT: get("APP_PORT").required().asPortNumber(),
  DB_USER: get("DB_USER").required().asString(),
  DB_PASSWORD: get("DB_PASSWORD").required().asString(),
  DB_HOST: get("DB_HOST").required().asString(),
  DB_PORT: get("DB_PORT").required().asPortNumber(),
  DB_NAME: get("DB_NAME").required().asString(),
  JWT_SECRET: get("JWT_SECRET").required().asString(),
  JWT_ACCESS_EXPIRES: get("JWT_ACCESS_EXPIRES").required().asString() as any,
  JWT_REFRESH_EXPIRES: get("JWT_REFRESH_EXPIRES").required().asString() as any,
};
