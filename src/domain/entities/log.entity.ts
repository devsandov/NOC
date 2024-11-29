
export enum LogSeverityLevel {
  low = 'low',
  medium = 'medium',
  high = 'high',
}

export interface LogEntituOptions {
  level: LogSeverityLevel;
  message: string;
  origin: string;
  createdAt?: Date;
}

export class LogEntity {
  public level: LogSeverityLevel;
  public message: string;
  public createdAt: Date;
  public origin: string;

  constructor(options: LogEntituOptions) {
    const { level, message, origin, createdAt = new Date() } = options;
    this.level = level;
    this.createdAt = createdAt;
    this.message = message;
    this.origin = origin;
  }

  /**
   * Creates a LogEntity instance from a JSON string.
   * 
   * @param {string} json - The JSON string to parse.
   * @returns {LogEntity} - The created LogEntity instance.
   */
  static fromJson = (json: string): LogEntity => {
    const { message, level, createdAt, origin } = JSON.parse(json);

    const log = new LogEntity({
      message,
      level,
      origin,
      createdAt,
    });

    return log;
  }
}
