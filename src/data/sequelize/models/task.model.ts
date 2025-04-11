import { DataTypes, Model, Sequelize } from "sequelize";

import { SequelizeModel } from "..";

interface TaskAttributes {
  id: number;
  title: string;
  description: string;
  status: "TODO" | "IN_PROGRESS" | "DONE";
  due_date: Date;
  user_id: number;
}

type TaskCreationAttributes = Partial<TaskAttributes>;

class Task extends Model<TaskAttributes, TaskCreationAttributes> {
  public id!: number;
  public title!: string;
  public description!: string;
  public status!: string;
  public due_date!: Date;
  public user_id!: number;

  static associate(models: { [key: string]: SequelizeModel }) {
    Task.belongsTo(models.User, { as: "user", foreignKey: "user_id" });
  }

  static initModel(sequelize: Sequelize) {
    Task.init(
      {
        id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },
        title: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        description: {
          type: DataTypes.TEXT,
          allowNull: false,
        },
        status: {
          type: DataTypes.ENUM("TODO", "IN_PROGRESS", "DONE"),
          allowNull: false,
          defaultValue: "TODO",
        },
        due_date: {
          type: DataTypes.DATE,
          allowNull: false,
        },
        user_id: {
          type: DataTypes.INTEGER,
          allowNull: false,
          references: {
            model: "users",
            key: "id",
          },
        },
      },
      { modelName: "Task", paranoid: true, sequelize }
    );
  }
}

export default Task;
