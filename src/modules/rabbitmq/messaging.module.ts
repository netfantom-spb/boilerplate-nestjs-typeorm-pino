import { Module, OnModuleInit } from '@nestjs/common';
import { RabbitMQModule } from '@golevelup/nestjs-rabbitmq';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { configureAppRabbitMQExchanges } from '@/app-config/configure-app-rabbitmq-exchanges';
import { configureAppRabbitMQChannels } from '@/app-config/configure-app-rabbitmq-channels';
import { MessagingService } from './messaging.service';

@Module({
  imports: [
    RabbitMQModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        exchanges: configureAppRabbitMQExchanges(configService),
        uri: configService.get('RABBITMQ_URL'),
        connectionInitOptions: { timeout: 10000, wait: false },
        channels: configureAppRabbitMQChannels(configService),
      }),
    }),
  ],
  providers: [MessagingService],
  exports: [MessagingModule, MessagingService],
})
export class MessagingModule {}
