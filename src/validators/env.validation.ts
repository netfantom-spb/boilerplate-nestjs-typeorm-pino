import { ToBoolean } from '@/decorators/to-boolean';
import { Expose, plainToInstance, Transform, Type } from 'class-transformer';
import {
  IsBoolean,
  IsEnum,
  IsNumber,
  IsString,
  Max,
  Min,
  validateSync,
} from 'class-validator';

enum Environment {
  Development = 'development',
  Production = 'production',
  Staging = 'staging',
  Test = 'test'
}

enum LogLevel {
  Trace = 'trace',
  Debug = 'debug',
  Info = 'info',
  Error = 'error',
}

export enum LogType {
  Pretty = 'pretty',
  Json = 'json',
  None = 'none'
}

class EnvironmentVariables {
  @Expose()
  @IsEnum(Environment)
  NODE_ENV: Environment;

  @Expose()
  @IsNumber()
  @Min(0)
  @Max(65535)
  PORT: number;

  @Expose()
  @IsNumber()
  @Min(0)
  @Max(65535)
  PG_PORT: number;

  @Expose()
  @IsString()
  PG_HOST: string;

  @Expose()
  @IsString()
  PG_USER: string;

  @Expose()
  @IsString()
  PG_PASSWORD: string;

  @Expose()
  @IsString()
  PG_DBNAME: string;

  @Expose()
  @IsEnum(LogLevel)
  LOG_LEVEL: LogLevel;

  @Expose()
  @IsEnum(LogType)
  LOG_CONSOLE: LogType;

  @Expose()
  @IsEnum(LogType)
  LOG_FILE: LogType;

  @Expose()
  @IsBoolean()
  @ToBoolean()
  LOG_DB_QUERIES: boolean;
}

export const validateEnvironmentVariables = (
  config: Record<string, unknown>,
) => {
  const validateConfig = plainToInstance(EnvironmentVariables, config, {
    enableImplicitConversion: true,
    excludeExtraneousValues: false,
  });

  const errors = validateSync(validateConfig, { skipMissingProperties: false });

  if (errors.length > 0) {
    console.error(errors.toString());
    throw new Error(errors.toString());
  }

  return validateConfig;
};
