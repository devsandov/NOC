import { EmailService } from "../../../presentation/email/email.service";
import { LogEntity, LogSeverityLevel } from "../../entities/log.entity";
import { LogRepository } from "../../repository/log.repository";


interface SendLogEmailUseCase {
  execute: (to: string | string[]) => Promise<boolean>;
}

export class SendEmailLogs implements SendLogEmailUseCase {
  constructor(
    private readonly emailService: EmailService,
    private readonly logRepository: LogRepository,
  ) { }

  async execute(to: string | string[]) {

    try {
      const sent = await this.emailService.sendEmailWithFileSystemLog(to);
      if (!sent) {
        throw new Error('Failed to send email');
      }

      const log = new LogEntity({ message: `Email sent to ${to}`, level: LogSeverityLevel.low, origin: 'SendEmailLogs' });
      this.logRepository.saveLog(log);

      return true;

    } catch (error) {

      const log = new LogEntity({ message: `Failed to send email to ${to}`, level: LogSeverityLevel.high, origin: 'SendEmailLogs' });
      this.logRepository.saveLog(log);
      return false;
    }
  }
}
