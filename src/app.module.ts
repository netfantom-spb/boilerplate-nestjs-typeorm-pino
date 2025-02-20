import {
  Inject,
  Logger,
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
import { validateEnvironmentVariables } from './validators/env.validation';

import { TestExceptionsModule } from './modules/api/test-exceptions/test-exceptions.module';
import { configurePinoLoggerTargets } from './bolireplate/configuration-helpers/configure-logging.helper';
import { configureDatabasePgHelper } from './bolireplate/configuration-helpers/configure-database-pg.helper';
import { MinutelyModule } from './modules/schedulers/minutely/minutely.module';
import { MessagingModule } from './modules/rabbitmq/messaging.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LoggerModule } from 'nestjs-pino';
import { HelloProducerModule } from './modules/rabbitmq/producers/hello-message/hello-peducer.module';
import { HelloConsumerModule } from './modules/rabbitmq/consumers/hello-consumer/hello-consumer.module';
import { DataSource } from 'typeorm';

@Module({
  imports: [
    /**
     * Load environment vaiables
     */
    ConfigModule.forRoot({
      envFilePath: ['.env.global', '.env'],
      isGlobal: true,
      validate: validateEnvironmentVariables,
    }),

    /**
     * Configure logging
     */
    LoggerModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) =>
        configurePinoLoggerTargets(configService),
    }),

    /**
     * Configure database connections
     */
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) =>
        configureDatabasePgHelper(configService, {
          applicationName: 'example-application-name',
          synchronize: true,
        }),
    }),

    // Cache module
    CacheModule.register(),

    // Shedule module
    ScheduleModule.forRoot(),

    // Example modules
    // TestModule,
    // TestExceptionsModule,
    // MessagingModule,
    // HelloProducerModule,
    // MinutelyModule,
    // HelloConsumerModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes({ path: '/*', method: RequestMethod.ALL });
  }
}
