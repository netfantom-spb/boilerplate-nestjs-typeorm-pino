/**
 * @summary TestProducerModule
 * @version 1.0
 * @date 2025-06-03
 * @description RabbitMQ Producer Module
 */
import { Module } from '@nestjs/common';
import { MessagingModule } from '@/boilerplate/modules/messaging/messaging.module';
import { TestProducerService } from './test-producer.service';


@Module({
    providers: [TestProducerService,],
    imports: [MessagingModule],    
    exports: [TestProducerService,],
})
export class TestProducerModule {}
