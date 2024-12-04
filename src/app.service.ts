/**
 * 
 * @package boilerplate-nestjs-typeorm-pino
 * @summary validateEnvironmentVariables function
 * @version 1.6
 * @description Validates environemt variables
 * 
 */

import { Injectable, Logger } from '@nestjs/common';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { APP_NAME, APP_VERSION, APP_BUILD_DATE } from './version';

@Injectable()
export class AppService {
  getVersion() {
    return { name: APP_NAME, version: APP_VERSION, date: APP_BUILD_DATE };
  }
}
