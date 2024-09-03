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
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ScheduleModule } from '@nestjs/schedule';
import { CacheModule } from '@nestjs/cache-manager';
import { TestModule } from './modules/api/test/test.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env.local', '.env'],
      isGlobal: true,
    }),

    LoggerModule.forRoot({
      pinoHttp: {
        level: 'trace',
        useLevel: 'trace',
        transport: {
          targets: [
            {
              level: 'trace',
              target: 'pino/file',
              options: { destination: './logs/root.log' },
            },
            {
              level: 'error',
              target: 'pino/file',
              options: { destination: './logs/error.log' },
            },
            {
              level: 'info',
              target: 'pino-pretty',
              options: {
                colorize: true,
                colorizeObjects: true,
                singleLine: false,
              },
            },
          ],
        },
      },
    }),

    CacheModule.register(),

    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.PG_HOST,
      port: Number.parseInt(process.env.PG_PORT, 10) || 5432,
      username: process.env.PG_USER,
      password: process.env.PG_PASSWORD,
      database: process.env.PG_DBNAME,
      autoLoadEntities: true,
      synchronize: true,
      logging: true,
      logger: 'advanced-console',
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
