import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';
import { Injectable } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { HelloMessageDto } from './dto/hello-message.dto';
import { MessagingService } from '../../../../boilerplate/modules/messaging/messaging.service';

@Injectable()
export class HelloProducerService {
    constructor(
        private readonly messagingService: MessagingService
    ) { }

    async sendHelloMessage(message?: string) {
        const hellowMessageDto = plainToInstance(HelloMessageDto, {
            message,
            createdAt: new Date()
        }, { excludeExtraneousValues: true, enableImplicitConversion: true });

        // return this.messagingService.publishMessage(
        //     RabbitMQExchangesEnum.HELLO,
        //     'retry1',
        //     { hellowMessageDto: hellowMessageDto },
        //     {
        //         persistent: true,
        //     },
        // )
    }
}
