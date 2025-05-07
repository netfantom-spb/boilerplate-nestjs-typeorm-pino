import { Controller, Get, Res, Version, VERSION_NEUTRAL } from '@nestjs/common';
import { ApiExcludeController } from '@nestjs/swagger';
import { PrometheusController } from '@willsoto/nestjs-prometheus';

@Controller('metrics')
@ApiExcludeController()
export class MetricsController extends PrometheusController {
  @Get()
  @Version(VERSION_NEUTRAL)
  async index(@Res({ passthrough: true }) response: Response) {
    return super.index(response);
  }
}
