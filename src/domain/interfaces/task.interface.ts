export interface IFilterTasks {
  status?: "TODO" | "IN_PROGRESS" | "DONE";
  due_date?: Date;
  page?: number;
  limit?: number;
}
