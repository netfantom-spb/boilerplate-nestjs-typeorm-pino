import { Module } from '@nestjs/common';
import { RabbitMQModule } from '@golevelup/nestjs-rabbitmq';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MessagingService } from './messaging.service';

@Module({
  imports: [
    RabbitMQModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        uri: configService.get('RABBITMQ_URL'),
        connectionInitOptions: { timeout: 10000, wait: false },
        channels: {
          default: {
            prefetchCount: 1,
            default: true,
          },
          'questions.import': {
            prefetchCount: 10,
          },
        },
      }),
    }),
  ],
  providers: [MessagingService],
  exports: [MessagingModule, MessagingService],
})
export class MessagingModule {}
