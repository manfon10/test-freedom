import { LogginDataSource, LogginRepository } from "../../domain";

export class LogginRepositoryImpl implements LogginRepository {
  constructor(private readonly datasource: LogginDataSource) {}

  async request(data: any): Promise<void> {
    return await this.datasource.request(data);
  }
}
