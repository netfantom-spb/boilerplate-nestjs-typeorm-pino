import { Module } from '@nestjs/common';
import { MetricsService } from './metrics.service';
import { MetricsController } from './metrics.controller';
import {
  makeCounterProvider,
  PrometheusModule,
} from '@willsoto/nestjs-prometheus';

@Module({
  controllers: [MetricsController],
  providers: [
    MetricsService,
    makeCounterProvider({
      name: 'stores_processed_total',
      help: 'Store process counter'
    }),
    makeCounterProvider({
      name: 'products_import_total',
      help: 'Total imported product'
    }),
    makeCounterProvider({
      name: 'feedbacks_import_total',
      help: 'Total imported feedbacks'
    })
  ],
  imports: [
    PrometheusModule.register({
      controller: MetricsController,
      defaultMetrics: {
        enabled: true,
      },
    }),
  ],
  exports: [MetricsService],
})
export class MetricsModule {}
