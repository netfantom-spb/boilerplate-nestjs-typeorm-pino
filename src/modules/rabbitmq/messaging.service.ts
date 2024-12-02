import { configureAppRebbitMQProvisioning, RabbiMQExchange } from '@/app-config/configure-app-rabbitmq-provisioning';
import { AmqpConnection, MessageOptions } from '@golevelup/nestjs-rabbitmq';
import { Injectable, OnModuleInit } from '@nestjs/common';
import { Options } from 'amqplib';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';

@Injectable()
export class MessagingService implements OnModuleInit {
    constructor(
        @InjectPinoLogger(MessagingService.name) private readonly logger: PinoLogger,
        private readonly ampqConnection: AmqpConnection
    ) {

    }

    onModuleInit() {

        const provisioning = async () => {
            if (this.ampqConnection.connected) {
                const channel = this.ampqConnection.channel;

                const config = configureAppRebbitMQProvisioning();
                for (const exchangeItem of config.exchanges) {

                    if (typeof (exchangeItem.exchange) === 'string') {
                        const exchange: RabbiMQExchange = exchangeItem as RabbiMQExchange;
                        await channel.assertExchange(
                            exchange.exchange,
                            exchange.type,
                            exchange.options,
                        );
                    }
                    else {

                    }
                }

                await channel.assertExchange(
                    'test',
                    'fanout'
                );
                await channel.assertQueue(
                    'test', {
                    durable: true
                }
                );
                await channel.bindQueue('test', 'test', '');
            }
            else {
                setInterval(async () => {
                    await provisioning();
                }, 1000)
            }
        }

        provisioning();

    }

    private

    publishMessage = <T>(exchange: string, routingKey: string, message: T, options: Options.Publish) => {
        this.ampqConnection.publish(
            exchange,
            routingKey,
            message,
            options
        )
    }
}
