import { CheckService } from "../domain/use-cases/checks/check-service";
import { FileSystemDataSource } from "../infrastructure/datasources/file-system.datasource";
import { LogRepositoryImpl } from "../infrastructure/respositories/log.repository.impl";
import { CronService } from "./cron/cron-service";

const fileSystemLogRepository = new LogRepositoryImpl(new FileSystemDataSource());

export class Server {
  public static start() {
    console.log('Server started');

    CronService.createJob('*/5 * * * * *', () => {
      const url = 'https://www.google.com';
      new CheckService(
        fileSystemLogRepository,
        () => console.log(`Successfully fetched ${url}`),
        (error) => console.log(error)
      ).execute(url);
    });

  }
}


