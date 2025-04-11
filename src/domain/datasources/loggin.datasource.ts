import { LogginHttpDTO } from "../dtos/loggin.dto";

export abstract class LogginDataSource {
  abstract request(data: LogginHttpDTO): Promise<void>;
}
