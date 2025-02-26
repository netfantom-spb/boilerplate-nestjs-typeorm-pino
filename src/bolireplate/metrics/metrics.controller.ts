import { Controller, Get, Res, Version, VERSION_NEUTRAL } from '@nestjs/common';
import { PrometheusController } from '@willsoto/nestjs-prometheus';
import { Response } from 'express';

@Controller()
export class MetricsController extends PrometheusController {

  @Get()
  @Version(VERSION_NEUTRAL)
  async index(@Res({ passthrough: true }) response: Response) {
    return super.index(response);
  }
}
