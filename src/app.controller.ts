
/**
 * 
 * @package boilerplate-nestjs-typeorm-pino
 * @summary validateEnvironmentVariables function
 * @version 1.6
 * @description Validates environemt variables
 * 
 */

import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller('/')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('version')
  getHello() {
    return this.appService.getVersion();
  }

  @Get('health')
  getHealthChek() {
    return {status: 'ok'}
  }
}
