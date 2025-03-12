/**
 *
 * @package boilerplate-nestjs-typeorm-pino
 * @summary validateEnvironmentVariables function
 * @version 1.6
 * @description Validates environemt variables
 *
 */

import { Controller, Get, Logger } from '@nestjs/common';
import { AppService } from './app.service';

@Controller('/')
export class AppController {
  private readonly logger = new Logger(AppController.name);

  constructor(private readonly appService: AppService) {}

  @Get('version')
  getVersion() {
    return this.appService.getVersion();
  }

  @Get('health')
  getHealthChek() {
    this.logger.debug('Health check');
    return { status: 'ok' };
  }
}
