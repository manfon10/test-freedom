import { DataTypes, Model, Sequelize } from "sequelize";

import { SequelizeModel } from "..";

interface UserAttributes {
  id: number;
  email: string;
  password: string;
  role: "USER" | "ADMIN";
}

type UserCreationAttributes = Partial<UserAttributes>;

class User extends Model<UserAttributes, UserCreationAttributes> {
  public id!: number;
  public email!: string;
  public password!: string;
  public role!: string;

  static associate(models: { [key: string]: SequelizeModel }) {
    User.hasMany(models.Task, { as: "tasks", foreignKey: "user_id" });

    User.hasOne(models.HttpLoggin, {
      as: "http_loggin",
      foreignKey: { name: "user_id", allowNull: true },
    });
  }

  static initModel(sequelize: Sequelize) {
    User.init(
      {
        id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },
        email: {
          type: DataTypes.TEXT,
          allowNull: false,
        },
        password: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        role: {
          type: DataTypes.ENUM("USER", "ADMIN"),
          allowNull: false,
          defaultValue: "USER",
        },
      },
      { modelName: "User", paranoid: true, sequelize }
    );
  }
}

export default User;
