import User from "../../data/sequelize/models/user.model";

import { UserDto, UserEntity } from "../../domain";
import { UserDataSource } from "../../domain/datasources";

export class UserDataSourceImpl implements UserDataSource {
  async create(data: UserDto): Promise<UserEntity> {
    const transcription = await User.create(data);

    return UserEntity.fromObject(transcription);
  }

  async findByEmail(email: string): Promise<UserEntity | null> {
    const user = await User.findOne({ where: { email } });

    return user ? UserEntity.fromObject(user) : null;
  }

  async fidnById(id: number): Promise<UserEntity | null> {
    const user = await User.findOne({ where: { id } });

    return user ? UserEntity.fromObject(user) : null;
  }
}
