import { RabbitMQExchangesEnum } from '@/app-config/configure-app-rabbitmq-exchanges';
import { RabbitSubscribe } from '@golevelup/nestjs-rabbitmq';
import { Injectable } from '@nestjs/common';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { HelloMessageDto } from '../../producers/hello-message/dto/hello-message.dto';
import { rabbitMQQueues, RabbitMQQueuesEnum } from '@/app-config/configure-app-rabbirmq-queues';

@Injectable()
export class HelloConsumerService {
    constructor(
        @InjectPinoLogger(HelloConsumerService.name)
        private readonly logger: PinoLogger) {

    }

    @RabbitSubscribe(rabbitMQQueues[RabbitMQQueuesEnum.HELLO])
    pubSubHandler(messageDto: HelloMessageDto) {
        this.logger.debug(messageDto, `Got message`)
    }
}
