import { Injectable, Logger, NestMiddleware } from '@nestjs/common';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  private logger = new Logger('API');
  use(req: Request, res: Response, next: () => void) {
    this.logger.log(req.url);
    next();
  }
}
