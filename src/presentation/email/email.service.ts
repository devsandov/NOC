import nodemailer from 'nodemailer';
import { envs } from '../../config/plugins/envs.plugin';
import { LogRepository } from '../../domain/repository/log.repository';
import { LogEntity, LogSeverityLevel } from '../../domain/entities/log.entity';

interface SendMailOptions {
  to: string | string[];
  subject: string;
  htmlBody: string;
  attachments?: Attachment[];
}

interface Attachment {
  filename: string;
  path: string;
}

export class EmailService {
  private transport = nodemailer.createTransport({
    service: envs.MAILER_SERVICE,
    auth: {
      user: envs.MAILER_EMAIL,
      pass: envs.MAILER_SECRET_KEY,
    },
  });

  constuctor() { }

  async sendEmail(options: SendMailOptions) {
    const { to, subject, htmlBody, attachments = [] } = options;

    try {
      const sentInformation = await this.transport.sendMail({
        to: to,
        subject: subject,
        html: htmlBody,
        attachments: attachments,
      });

      return true;
    } catch (error) {

      return false;
    }
  }

  async sendEmailWithFileSystemLog(to: string | string[]) {
    const subject = 'logs from server';
    const htmlBody = '<h1>Logs from server</h1>';

    const attachments: Attachment[] = [
      {
        filename: 'logs-all.log',
        path: './logs/logs-all.log',
      },
      {
        filename: 'logs-high.log',
        path: './logs/logs-high.log',
      },
      {
        filename: 'logs-medium.log',
        path: './logs/logs-medium.log',
      }
    ];

    return this.sendEmail({ to, subject, htmlBody, attachments });
  }

}
