import { LogginHttpDTO } from "../dtos/loggin.dto";

export abstract class LogginRepository {
  abstract request(data: LogginHttpDTO): Promise<void>;
}
