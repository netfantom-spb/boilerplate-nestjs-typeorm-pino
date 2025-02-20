/**
 * @package boilerplate-nestjs-typeorm-pino
 * @summary Configure PostgreSQL database connection
 * @version 1.10
 * @description  Configure PostgreSQL database connection
 */

import { TypeOrmLoggerContainer } from '@/utils/type-orm-logger';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const configureDatabasePgHelper = (
  configService: ConfigService,
  overrideOptions: { applicationName: string } & TypeOrmModuleOptions,
): TypeOrmModuleOptions => {
  const options: TypeOrmModuleOptions = {
    type: 'postgres',
    host: configService.get<string>('PG_HOST'),
    port: configService.get<number>('PG_PORT'),
    username: configService.get<string>('PG_USER'),
    password: configService.get<string>('PG_PASSWORD') as string,
    database: configService.get<string>('PG_DBNAME'),
    autoLoadEntities: true,
    synchronize: false,
    logging: configService.get<boolean>('LOG_DB_QUERIES'),
    logger: TypeOrmLoggerContainer.ForConnection(
      'responses db',
      configService.get('LOG_DB_QUERIES', false),
    ),
    retryAttempts: 10,
    retryDelay: 3000,
    verboseRetryLog: true,
    
  };
  Object.assign(options, overrideOptions);
  return options;
};
