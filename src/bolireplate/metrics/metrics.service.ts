import { Injectable } from '@nestjs/common';
import { InjectMetric } from '@willsoto/nestjs-prometheus';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { Counter } from 'prom-client';

@Injectable()
export class MetricsService {
  constructor(
    @InjectMetric('stores_processed_total')
    private storesProcessedTotal: Counter,
    @InjectMetric('products_import_total') private productsImportTotal: Counter,
    @InjectMetric('feedbacks_import_total')
    private feedbackImportTotal: Counter,
  ) {}

  incStoresProcessedTotal() {
    this.storesProcessedTotal.inc();
  
  }
  incProductsImportTotal() {
    this.productsImportTotal.inc();
  }

  incFeedbacksImportTotal() {
    this.feedbackImportTotal.inc();
  }
}
