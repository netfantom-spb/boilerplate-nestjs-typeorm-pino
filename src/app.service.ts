import { Injectable, Logger } from '@nestjs/common';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { APP_VERSION, BUILD_DATE } from './version';

@Injectable()
export class AppService {
  private readonly logger = new Logger(AppService.name);

  constructor(
    @InjectPinoLogger(AppService.name)
    private readonly pinoLogger: PinoLogger,
  ) {}

  getVersion() {
      return {version: APP_VERSION, date: BUILD_DATE};
  }
}
