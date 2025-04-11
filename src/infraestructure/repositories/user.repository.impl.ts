import { UserDto, UserEntity } from "../../domain";
import { UserDataSource } from "../../domain/datasources";
import { UserRepository } from "../../domain/repositories";

export class UserRepositoryImpl implements UserRepository {
  constructor(private readonly datasource: UserDataSource) {}

  async create(data: UserDto): Promise<UserEntity> {
    return await this.datasource.create(data);
  }

  async findByEmail(email: string): Promise<UserEntity | null> {
    return await this.datasource.findByEmail(email);
  }

  async fidnById(id: number): Promise<UserEntity | null> {
    return await this.datasource.fidnById(id);
  }
}
