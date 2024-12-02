import { Module } from '@nestjs/common';
import { HelloConsumerService } from './hello-consumer.service';
import { MessagingModule } from '../../messaging.module';

@Module({
  providers: [HelloConsumerService],
  imports: [MessagingModule]
})
export class HelloConsumerModule { }
