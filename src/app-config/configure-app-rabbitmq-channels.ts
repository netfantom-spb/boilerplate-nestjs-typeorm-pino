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