/**
 * @package boilerplate-nestjs-typeorm-pino
 * @summary configureLoggingTransport function
 * @version 1.13
 * @summary Returns Pino transport configuration based on environment va
 */
import { Injectable, Logger, NestMiddleware } from '@nestjs/common';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  private logger = new Logger('API');
  use(req: Request, res: Response, next: () => void) {
    if (['/health', '/metics'].includes(req.url)) {
      this.logger.verbose(req.url);
    }
    else {
      this.logger.debug(req.url);
    }
    next();
  }
}
