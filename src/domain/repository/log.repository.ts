
import { LogEntity, LogSeverityLevel } from "../entities/log.entity";



export abstract class LogRepository {
  abstract saveLog(log: LogEntity): void;
  abstract getLogs(severityLevel: LogSeverityLevel): Promise<LogEntity[]>;
}

