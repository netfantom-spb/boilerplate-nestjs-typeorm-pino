/**
 * @version 1.13.0
 */
import { AmqpConnection, MessageOptions } from '@golevelup/nestjs-rabbitmq';
import { Injectable, OnModuleInit } from '@nestjs/common';
import { Options } from 'amqplib';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';

@Injectable()
export class MessagingService {
    constructor(
        @InjectPinoLogger(MessagingService.name) private readonly logger: PinoLogger,
        private readonly ampqConnection: AmqpConnection
    ) {

    }

    async publishMessage <T>(exchange: string, routingKey: string, message: T, options: Options.Publish)  {
        return this.ampqConnection.publish(
            exchange,
            routingKey,
            message,
            options
        )
    }
}
