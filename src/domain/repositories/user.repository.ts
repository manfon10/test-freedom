import { UserDto } from "../dtos";
import { UserEntity } from "../entities";

export abstract class UserRepository {
  abstract create(data: UserDto): Promise<UserEntity>;
  abstract findByEmail(email: string): Promise<UserEntity | null>;
  abstract fidnById(id: number): Promise<UserEntity | null>;
}
