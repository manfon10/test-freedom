import { Response, NextFunction } from "express";

import Permission, { permissionsByRol } from "../../domain/constants/permission.const";
import { AppError, HttpRequest } from "../../domain";

export class PermissionHandler {
  static validatePermission = (permission: Permission) => {
    return (req: HttpRequest, _res: Response, next: NextFunction) => {
      const { role } = req.user!;

      if (role) {
        const permissions = permissionsByRol[role as keyof typeof permissionsByRol];

        if (permissions.includes(Permission.ALL_PERMISSIONS) || permissions.includes(permission)) {
          return next();
        }

        next(AppError.unauthorized("No tiene acceso a este recurso."));
      }
    };
  };
}
