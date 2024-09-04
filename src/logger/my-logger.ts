import { ConsoleLogger } from '@nestjs/common';
import fs from 'fs';

export class MyLogger extends ConsoleLogger {
  constructor() {
    super();
  }

  log(message: any, stack?: string, context?: string) {
    fs.writeFileSync('./logs/core.log', `${message}:${context}`);
    super.log(message, stack, context);
  }

  error(message: any, stack?: string, context?: string) {
    fs.writeFileSync('./logs/core.log', message);
    super.error(message, stack, context);
  }
}
