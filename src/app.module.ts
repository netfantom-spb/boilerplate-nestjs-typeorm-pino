import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LoggerMiddleware } from './middlewares/logger/logger.middleware';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ScheduleModule } from '@nestjs/schedule';
import { CacheModule } from '@nestjs/cache-manager';
import { TestModule } from './modules/api/test/test.module';
import {
  validateEnvironmentVariables,
} from './validators/env.validation';

import { TestExceptionsModule } from './modules/api/test-exceptions/test-exceptions.module';
import { configurePinoLoggerTargets } from './app-config/configure-app-logging-transports';
import { configureDatabase } from './app-config/configure-app-database';
import { MinutelyModule } from './modules/schedulers/minutely/minutely.module';
import { MessagingModule } from './modules/rabbitmq/messaging.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LoggerModule } from 'nestjs-pino';
import { HelloProducerModule } from './modules/rabbitmq/producers/hello-message/hello-peducer.module';
import { HelloConsumerModule } from './modules/rabbitmq/consumers/hello-consumer/hello-consumer.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env.local', '.env'],
      isGlobal: true,
      validate: validateEnvironmentVariables,
    }),

    CacheModule.register(),
    LoggerModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => configurePinoLoggerTargets(configService)
    }),

    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => configureDatabase(configService),
    }),


    ScheduleModule.forRoot(),


    TestModule,
    TestExceptionsModule,

    // MessagingModule,
    // HelloProducerModule,
    MinutelyModule,
    // HelloConsumerModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}

