/**
 * 
 * @package boilerplate-nestjs-typeorm-pino
 * @summary validateEnvironmentVariables function
 * @version 1.6
 * @description Validates environemt variables
 * 
 */
import { EnvironmentVariablesAppDto } from '@/bolireplate/types/dto/environment-variables.app.dto';
import { plainToInstance, Transform, Type } from 'class-transformer';
import {
  validateSync,
} from 'class-validator';

export const validateEnvironmentVariables = (
  config: Record<string, unknown>,
) => {
  const validateConfig = plainToInstance(EnvironmentVariablesAppDto, config, {
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
