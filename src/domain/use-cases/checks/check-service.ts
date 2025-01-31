import { LogEntity, LogSeverityLevel } from "../../entities/log.entity";
import { LogRepository } from "../../repository/log.repository";

interface CheckServiceUseCase {
  execute(url: string): Promise<boolean>;
}

type SuccesCallback = () => void | undefined;
type ErrorCallback = (error: string) => void | undefined;
const origin = 'CheckService.ts';

export class CheckService implements CheckServiceUseCase {
  constructor(
    private readonly logRepository: LogRepository,
    private readonly successCallback: SuccesCallback,
    private readonly errorCallback: ErrorCallback
  ) { }

  public async execute(url: string): Promise<boolean> {

    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Failed to fetch ${url}`);
      }
      const log = new LogEntity({ message: `Successfully fetched ${url}`, level: LogSeverityLevel.low, origin: origin });

      this.logRepository.saveLog(log);

      this.successCallback && this.successCallback();

      return true;
    } catch (error) {

      const errorMessage = `${url} is not okay.${error}`;
      const log = new LogEntity({ message: errorMessage, level: LogSeverityLevel.high, origin: origin });
      this.logRepository.saveLog(log);
      this.errorCallback && this.errorCallback(errorMessage);

      return false;
    }
  }
}
