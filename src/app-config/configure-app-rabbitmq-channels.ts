/**
 * @package boilerplate-nestjs-typeorm-pino
 * @summary configureLoggingTransport function
 * @version 1.6
 * @summary Returns Pino transport configuration based on environment va
 */
import { RabbitMQChannels } from "@golevelup/nestjs-rabbitmq"
import { ConfigService } from "@nestjs/config"

export enum RabbitMQChannelsEnum {
    HELLO = 'hello-channel'
}

export const configureAppRabbitMQChannels = (configServier: ConfigService): RabbitMQChannels => {
    return {
        default: {
            prefetchCount: 1,
            default: true,
        },
        [RabbitMQChannelsEnum.HELLO]: {
            prefetchCount: 1,
        },
    }
}