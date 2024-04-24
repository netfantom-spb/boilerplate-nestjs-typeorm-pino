import { Injectable, Logger } from '@nestjs/common';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';

@Injectable()
export class AppService {
  private readonly logger = new Logger(AppService.name);

  constructor(
    @InjectPinoLogger(AppService.name)
    private readonly pinoLogger: PinoLogger,
  ) {}

  getHello(): string {
    const obj = { msg: 'I am Object' };
    this.logger.debug({ obj }, 'Hello world');
    this.pinoLogger.assign({ userID: '42' });
    this.pinoLogger.trace({ obj }, 'Trace log', { obj });
    return 'Hello World!';
  }
}
