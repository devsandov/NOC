
import { LogEntity, LogSeverityLevel } from "../entities/log.entity";



export abstract class LogDataSource {
  abstract savelog(log: LogEntity): void;
  abstract getLogs(severityLevel: LogSeverityLevel): Promise<LogEntity[]>;
}




