import { Module } from '@nestjs/common';
import { MinutelyService } from './minutely.service';
import { HelloProducerModule } from '@/modules/rabbitmq/producers/hello-message/hello-peducer.module';

@Module({
  providers: [MinutelyService],
  imports: [HelloProducerModule]
})
export class MinutelyModule { }
