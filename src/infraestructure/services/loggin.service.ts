import { AppError, LogginHttpDTO, LogginRepository } from "../../domain";

export class LogginService {
  constructor(private readonly logginRepository: LogginRepository) {}

  async logRequest(data: LogginHttpDTO): Promise<void> {
    try {
      await this.logginRepository.request(data);
    } catch (error) {
      throw AppError.internalServer(error as string);
    }
  }
}
