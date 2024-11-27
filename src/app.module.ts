import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LoggerMiddleware } from './middlewares/logger/logger.middleware';
import { LoggerModule } from 'nestjs-pino';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ScheduleModule } from '@nestjs/schedule';
import { CacheModule } from '@nestjs/cache-manager';
import { TestModule } from './modules/api/test/test.module';
import {
  LogType,
  validateEnvironmentVariables,
} from './validators/env.validation';
import { v4 as uuidv4 } from 'uuid';
import { TestExceptionsModule } from './modules/api/test-exceptions/test-exceptions.module';
import { LogLevel } from 'typeorm';

/**
 * Configure logging by environment variables
 * @param logLevel {LogLevel} Logging level
 * @param logFile {LogType} Log file format configuration
 * @param logConsole {LogType} Log console format configuration
 * @returns 
 */
const configureLogging = (logLevel: LogLevel, logFile: LogType, logConsole: LogType) => {
  const config = [];

  switch (logFile) {
    case LogType.Pretty:
      config.push({
        level: logLevel,
        target: 'pino-pretty',
        options: { destination: './logs/root.log', colorize: false },
      },);
      config.push({
        level: 'error',
        target: 'pino-pretty',
        options: { destination: './logs/error.log', colorize: false },
      },);
      break;
    case LogType.Json:
      config.push({
        level: logLevel,
        target: 'pino/file',
        options: { destination: './logs/root.log' },
      }, {
        level: 'error',
        target: 'pino/file',
        options: { destination: './logs/error.log' },
      },)
      break;
    case LogType.None:
      console.warn('Logging in file is disabled');
      break;
  }

  switch (logConsole) {
    case LogType.Pretty:
      config.push({
        level: logLevel,
        target: 'pino-pretty',
        options: {
          colorize: true,
          colorizeObjects: true,
          singleLine: false,
          sync: true,
        },
      })
      break;
    case LogType.Json:
      config.push({
        level: logLevel,
        target: 'pino/file',
        options: {
          destination: 1,
        },
      },)
      break;
    case LogType.None:
      console.warn('Logging in console is disabled');
      break;
  }
  return config;
}

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env', '.env.local'],
      isGlobal: true,
      validate: validateEnvironmentVariables,
    }),

    LoggerModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        pinoHttp: {
          level: 'trace',
          useLevel: 'trace',
          autoLogging: true,
          genReqId: (request) =>
            request.headers['x-correlation-id'] || uuidv4(),
          transport: {
            targets: configureLogging(configService.get('LOG_LEVEL'), configService.get('LOG_FILE'), configService.get('LOG_CONSOLE'))
          },
        },
      }),
    }),

    CacheModule.register(),

    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('PG_HOST'),
        port: configService.get<number>('PG_PORT'),
        username: configService.get<string>('PG_USER'),
        password: configService.get<string>('PG_PASSWORD'),
        database: configService.get<string>('PG_DBNAME'),
        autoLoadEntities: true,
        synchronize: true,
        logging: configService.get<boolean>('LOG_DB_QUERIES'),
        logger: 'advanced-console',
        retryAttempts: 3,
      }),
    }),

    ScheduleModule.forRoot(),

    TestModule,

    TestExceptionsModule,
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
// export class AppModule {}
