import { Module } from '@nestjs/common';
import { RabbitMQModule, RabbitMQChannels, RabbitMQExchangeBindingConfig, RabbitMQExchangeConfig } from '@golevelup/nestjs-rabbitmq';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MessagingService } from './messaging.service';
import { RabbitMQInitAppConfig } from '@/boilerplate/app/configs/rabbitmq/rabbitmq.init.config';
import { RabbitMQChannelsAppConfig } from '@/boilerplate/app/configs/rabbitmq/rabbitmq.channels.config';
import { RabbitMQExchangesAppConfig } from '@/boilerplate/app/configs/rabbitmq/rabbitmq.exchanges.config';

@Module({
  imports: [
    RabbitMQModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        uri: configService.get('RABBITMQ_URL'),
        connectionInitOptions: {
          timeout: 15000,
          wait: true,
          skipConnectionFailedLogging: false,
          reject: true,
          ...RabbitMQInitAppConfig,
        },
        channels: {
          default: {
            prefetchCount: 1,
            default: true,
          },
          ...RabbitMQChannelsAppConfig,
        },
        exchanges: RabbitMQExchangesAppConfig
      }),
    }),
  ],
  providers: [MessagingService],
  exports: [MessagingModule, MessagingService],
})
export class MessagingModule {}
