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
  LogConsole,
  validateEnvironmentVariables,
} from './validators/env.validation';
import { v4 as uuidv4 } from 'uuid';

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
            targets: [
              {
                level: configService.get('LOG_LEVEL'),
                target: 'pino/file',
                options: { destination: './logs/root.log' },
              },
              {
                level: 'error',
                target: 'pino/file',
                options: { destination: './logs/error.log', sync: true },
              },
              configService.get('LOG_CONSOLE') === LogConsole.Pretty
                ? {
                    level: configService.get('LOG_LEVEL'),
                    target: 'pino-pretty',
                    options: {
                      colorize: true,
                      colorizeObjects: true,
                      singleLine: false,
                      sync: true,
                    },
                  }
                : {
                    level: configService.get('LOG_LEVEL'),
                    target: 'pino/file',
                    options: {
                      destination: 1,
                    },
                  },
            ],
          },
        },
      }),
    }),

    CacheModule.register(),

    // TypeOrmModule.forRoot({
    //   type: 'postgres',
    //   host: process.env.PG_HOST,
    //   port: Number.parseInt(process.env.PG_PORT, 10) || 5432,
    //   username: process.env.PG_USER,
    //   password: process.env.PG_PASSWORD,
    //   database: process.env.PG_DBNAME,
    //   autoLoadEntities: true,
    //   synchronize: true,
    //   logging: true,
    //   logger: 'advanced-console',
    // }),
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
