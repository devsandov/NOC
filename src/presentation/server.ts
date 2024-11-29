import { CheckService } from "../domain/use-cases/checks/check-service";
import { SendEmailLogs } from "../domain/use-cases/email/send-email-logs";
import { FileSystemDataSource } from "../infrastructure/datasources/file-system.datasource";
import { LogRepositoryImpl } from "../infrastructure/respositories/log.repository.impl";
import { CronService } from "./cron/cron-service";
import { EmailService } from "./email/email.service";

const fileSystemLogRepository = new LogRepositoryImpl(new FileSystemDataSource());
const emailService = new EmailService();

export class Server {
  public static start() {
    console.log('Server started');

    new SendEmailLogs(emailService, fileSystemLogRepository)
      .execute(['davidsandoval20051@gmail.com']);

    // emailService.sendEmailWithFileSystemLog(['davidsandoval20051@gmail.com', 'okrunate@gmail.com']);


    // CronService.createJob('*/5 * * * * *', () => {
    //   const url = 'https://www.google.com';
    //   // const url = 'http://localhost:3000';
    //   new CheckService(
    //     fileSystemLogRepository,
    //     () => console.log(`Successfully fetched ${url}`),
    //     (error) => console.log(error)
    //   ).execute(url);
    // });

  }
}


