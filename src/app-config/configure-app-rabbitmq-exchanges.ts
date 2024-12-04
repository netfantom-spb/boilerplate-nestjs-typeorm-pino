/**
 * @package boilerplate-nestjs-typeorm-pino
 * @summary configureLoggingTransport function
 * @version 1.6
 * @summary Returns Pino transport configuration based on environment va
 */
import { RabbitMQExchangeConfig } from "@golevelup/nestjs-rabbitmq"
import { ConfigService } from "@nestjs/config"

export enum RabbitMQExchangesEnum {
    HELLO = 'hello'
}

export enum RabbitMQExchangesDLXEnum {
    HELLO_DLX = 'hello-dlx'
}


export const configureAppRabbitMQExchanges = (config: ConfigService): RabbitMQExchangeConfig[] => {
    return [
        {
            name: RabbitMQExchangesEnum.HELLO,
            type: 'fanout',
        },
    ]
}

