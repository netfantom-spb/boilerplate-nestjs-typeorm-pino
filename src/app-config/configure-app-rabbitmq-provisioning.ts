/**
 * @package boilerplate-nestjs-typeorm-pino
 * @summary configureLoggingTransport function
 * @version 1.6
 * @summary Returns Pino transport configuration based on environment va
 */
import { Options } from 'amqplib';
import { RabbitMQExchangesDLXEnum as RabbitMQExchangesDlxEnum, RabbitMQExchangesEnum } from './configure-app-rabbitmq-exchanges';
import { RabbitMQQueuesDlxEnum, RabbitMQQueuesEnum } from './configure-app-rabbirmq-queues';

export type RabbiMQExchange = { exchange: string, type: "direct" | "topic" | "headers" | "fanout" | "match" | string, options?: Options.AssertExchange };
export type RabbitMQQueue = { queue: string, options?: Options.AssertQueue };
export type RabbitMQBind = { queue: string, source: string, pattern: string, args?: any };

type RabbitMQProvisioning = {
    exchanges?: RabbiMQExchange[] |
    { exchange: RabbiMQExchange, queues: { queue: RabbitMQQueue, binds?: Pick<RabbitMQBind, 'pattern' | 'args'>[] }[] }[],
    queues?: (RabbitMQQueue | { queue: RabbitMQQueue, binds?: Pick<RabbitMQBind, 'source' | 'pattern' | 'args'>[] })[],
    binds?: RabbitMQBind[]
}

export const configureAppRebbitMQProvisioning = (): RabbitMQProvisioning => {
    return {
        exchanges: [
            {
                exchange: {
                    exchange: RabbitMQExchangesDlxEnum.HELLO_DLX,
                    type: 'fanout',
                    options: {
                        durable: true
                    },
                },
                queues: [{
                    queue: {
                        queue: RabbitMQQueuesDlxEnum.HELLO_DLX,
                        options: {
                            durable: true
                        }
                    },
                    binds: [{
                        pattern: ''
                    }]
                }]
            }
        ],
    };

}