enum Permission {
  // SUPER ADMIN

  ALL_PERMISSIONS = "ALL_PERMISSIONS",

  // TASKS

  CREATE_TASK = "CREATE_TASK",
  DELETE_TASK = "DELETE_TASK",
  GET_TASKS = "GET_TASKS",
  GET_MY_TASKS = "GET_MY_TASKS",
  GET_TASK = "GET_TASK",
  UPDATE_TASK = "UPDATE_TASK",
}

export default Permission;

export const permissionsByRol: Record<"USER" | "ADMIN", Permission[]> = {
  USER: [
    Permission.CREATE_TASK,
    Permission.DELETE_TASK,
    Permission.GET_MY_TASKS,
    Permission.UPDATE_TASK,
  ],
  ADMIN: [Permission.GET_TASKS, Permission.UPDATE_TASK, Permission.GET_TASK],
};
