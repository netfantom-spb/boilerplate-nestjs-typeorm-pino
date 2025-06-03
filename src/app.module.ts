import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LoggerMiddleware } from './boilerplate/middlewares/logger/logger.middleware';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { validateEnvironmentVariables } from './boilerplate/validators/env.validation';
import { configurePinoLoggerTargets } from './boilerplate/helpers/configuration/configure-logging.helper';
import { configureDatabasePgHelper } from './boilerplate/helpers/configuration/configure-database-pg.helper';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LoggerModule } from 'nestjs-pino';
import { PrometheusModule } from '@willsoto/nestjs-prometheus';
import { MetricsController } from './boilerplate/modules/metrics/metrics.controller';
import { SERVICE_NAME } from '@/boilerplate/app/configs/app.config';

@Module({
  imports: [
    /**
     * Load environment variables
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
          applicationName: SERVICE_NAME,
          synchronize: false,
        }),
    }),

    /**
     * Prometheus metrics
     */
    PrometheusModule.register({
      controller: MetricsController,
      path: '/metrics',
      defaultMetrics: {
        enabled: true,
      },
    }),

    /**
     * Cache module
     */
    // CacheModule.register({
    //   isGlobal: true,
    // }),

    /**
     * Schedule modules
     */
    // ScheduleModule.forRoot(),

    /**
     * RabbitMQ modules
     */
    // MessagingModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes({ path: '*path', method: RequestMethod.ALL });
  }
}
