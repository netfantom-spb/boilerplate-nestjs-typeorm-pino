/**
 * @package boilerplate-nestjs-typeorm-pino
 * @summary configureLoggingTransport function
 * @version 1.6
 * @summary Returns Pino transport configuration based on environment va
 */
import { RabbitHandlerConfig } from "@golevelup/nestjs-rabbitmq";
import { RabbitMQExchangesDLXEnum, RabbitMQExchangesEnum } from "./configure-app-rabbitmq-exchanges";

export enum RabbitMQQueuesEnum {
    HELLO = 'hello',
}

export enum RabbitMQQueuesDlxEnum {
    HELLO_DLX = 'hello-failed'
}

export const rabbitMQQueues: Record<RabbitMQQueuesEnum, Pick<RabbitHandlerConfig, "queue" | "name" | "deserializer" | "connection" | "exchange" | "routingKey" | "queueOptions" | "errorBehavior" | "errorHandler" | "assertQueueErrorHandler" | "createQueueIfNotExists" | "allowNonJsonMessages" | "usePersistentReplyTo" | "batchOptions">> = {
    [RabbitMQQueuesEnum.HELLO]: {
        exchange: RabbitMQExchangesEnum.HELLO,
        routingKey: '',
        queue: RabbitMQQueuesEnum.HELLO,
        queueOptions: {
            channel: 'store-new-channel',
            durable: true,
            deadLetterExchange: RabbitMQExchangesDLXEnum.HELLO_DLX,
            deadLetterRoutingKey: 'failed',
        },
    }
}