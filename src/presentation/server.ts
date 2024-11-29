import { CheckService } from "../domain/use-cases/checks/check-service";
import { FileSystemDataSource } from "../infrastructure/datasources/file-system.datasource";
import { LogRepositoryImpl } from "../infrastructure/respositories/log.repository.impl";
import { CronService } from "./cron/cron-service";
import { EmailService } from "./email/email.service";

const fileSystemLogRepository = new LogRepositoryImpl(new FileSystemDataSource());

export class Server {
  public static start() {
    console.log('Server started');


    const emailService = new EmailService(
      fileSystemLogRepository
    );

    emailService.sendEmailWithFileSystemLog(['davidsandoval20051@gmail.com', 'okrunate@gmail.com']);


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


