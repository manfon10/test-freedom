export class UserEntity {
  constructor(
    public id: number,
    public email: string,
    public password: string,
    public role: string
  ) {}

  static fromObject(object: { [key: string]: any }): UserEntity {
    const { id, email, password, role } = object;

    return new UserEntity(id, email, password, role);
  }
}
