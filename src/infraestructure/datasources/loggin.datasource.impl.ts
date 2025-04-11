import HttpLoggin from "../../data/sequelize/models/http-loggin.model";
import { LogginDataSource } from "../../domain/datasources";

export class LogginDataSourceImpl implements LogginDataSource {
  async request(data: any): Promise<void> {
    await HttpLoggin.create(data);
  }
}
