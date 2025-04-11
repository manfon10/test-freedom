import { UserEntity } from "./user.entity";

export class TaskEntity {
  constructor(
    public id: number,
    public title: string,
    public description: string,
    public status: string,
    public due_date: Date,
    public user: UserEntity
  ) {}

  static fromObject(object: { [key: string]: any }): TaskEntity {
    const { id, title, description, status, due_date, user } = object;

    return new TaskEntity(id, title, description, status, due_date, user);
  }
}
