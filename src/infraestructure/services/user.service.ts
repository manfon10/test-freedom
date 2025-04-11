import { AppError, UserEntity, UserRepository } from "../../domain";

export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async findById(id: number): Promise<UserEntity> {
    const user = await this.userRepository.fidnById(id);

    if (!user) {
      throw AppError.badRequest("Usuario no Existe");
    }

    return user;
  }
}
