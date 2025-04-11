import { DataTypes, Model, Sequelize } from "sequelize";

import { SequelizeModel } from "..";

interface HttpLogginAttributes {
  id: number;
  method: string;
  path: string;
  response_time: number;
  user_id: number | null;
}

type HttpLogginCreationAttributes = Partial<HttpLogginAttributes>;

class HttpLoggin extends Model<HttpLogginAttributes, HttpLogginCreationAttributes> {
  public id!: number;
  public method!: string;
  public path!: string;
  public response_time!: number;
  public user_id!: number;

  static associate(models: { [key: string]: SequelizeModel }) {
    HttpLoggin.belongsTo(models.User, {
      as: "user",
      foreignKey: { name: "user_id", allowNull: true },
    });
  }

  static initModel(sequelize: Sequelize) {
    HttpLoggin.init(
      {
        id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },
        method: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        path: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        response_time: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        user_id: {
          type: DataTypes.INTEGER,
          allowNull: true,
          references: {
            model: "users",
            key: "id",
          },
        },
      },
      { modelName: "HttpLoggin", paranoid: true, sequelize }
    );
  }
}

export default HttpLoggin;
