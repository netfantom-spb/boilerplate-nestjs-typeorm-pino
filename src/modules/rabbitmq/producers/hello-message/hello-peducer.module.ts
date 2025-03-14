import { Module } from '@nestjs/common';
import { HelloProducerService } from './hello-producer.service';
import { MessagingModule } from '../../messaging/messaging.module';

@Module({
  providers: [HelloProducerService],
  imports: [MessagingModule],
  exports: [HelloProducerService]
})
export class HelloProducerModule { }
