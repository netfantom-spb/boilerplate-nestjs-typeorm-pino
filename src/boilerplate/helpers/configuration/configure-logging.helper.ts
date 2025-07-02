/**
 * @package boilerplate-nestjs-typeorm-pino
 * @summary configureLoggingTransport function
 * @version 1.15
 * @summary Returns Pino transport configuration based on environment va
 */
import { LogLevelEnum } from '@/boilerplate/common/enums/log-level.enum';
import { LogTypeEnum } from '@/boilerplate/common/enums/log-type.enum';
import { ConfigService } from '@nestjs/config';
import { Params } from 'nestjs-pino';
import { v4 as uuidv4 } from 'uuid';

/**
 * Configure logging by environment variables
 * @param logLevel {LogLevelEnum} Logging level
 * @param logFile {LogTypeEnum} Log file format configuration
 * @param logConsole {LogTypeEnum} Log console format configuration
 * @returns
 */
const configureLoggingTransport = (configService: ConfigService) => {
  const config = [];

  const logLevel = configService.get<string>('LOG_LEVEL', LogLevelEnum.INFO),
    logLevelConsole = configService.get<string>('LOG_LEVEL_CONSOLE', logLevel),
    logLevelFile = configService.get<string>('LOG_LEVEL_FILE', logLevel),
    logConsole = configService.get<string>('LOG_CONSOLE', LogTypeEnum.PRETTY),
    logFile = configService.get<string>('LOG_FILE', LogTypeEnum.NONE);

  switch (logFile) {
    case LogTypeEnum.PRETTY:
      config.push({
        level: logLevelFile,
        target: 'pino-pretty',
        options: {
          destination: './logs/root.log',
          colorize: false,
          sync: false,
          translateTime: 'yyyy-mm-dd HH:MM:ss.l', // Добавляем дату и время
          ignore: 'pid,hostname', // Игнорируем ненужные поля
        },
      });
      config.push({
        level: 'error',
        target: 'pino-pretty',
        options: {
          destination: './logs/error.log',
          colorize: false,
          sync: false,
          translateTime: 'yyyy-mm-dd HH:MM:ss.l', // Добавляем дату и время
          ignore: 'pid,hostname', // Игнорируем ненужные поля
        },
      });
      break;
    case LogTypeEnum.JSON:
      config.push(
        {
          level: logLevelFile,
          target: 'pino/file',
          options: { destination: './logs/root.log' },
        },
        {
          level: 'error',
          target: 'pino/file',
          options: { destination: './logs/error.log' },
        },
      );
      break;
    case LogTypeEnum.NONE:
      console.warn('Logging to file is disabled');
      break;
  }

  switch (logConsole) {
    case LogTypeEnum.PRETTY:
      config.push({
        level: logLevelConsole,
        target: 'pino-pretty',
        options: {
          colorize: true,
          colorizeObjects: true,
          singleLine: false,
          sync: false,
          translateTime: 'yyyy-mm-dd HH:MM:ss.l', // Добавляем дату и время
          ignore: 'pid,hostname', // Игнорируем ненужные поля
        },
      });
      break;
    case LogTypeEnum.JSON:
      config.push({
        level: logLevelConsole,
        target: 'pino/file',
        options: {
          destination: 1,
        },
      });
      break;
    case LogTypeEnum.NONE:
      console.warn('Logging to console is disabled');
      break;
  }
  return config;
};

export const configurePinoLoggerTargets = (
  configService: ConfigService,
): Params => {
  return {
    pinoHttp: {
      level: configService.get<string>('LOG_LEVEL', 'trace'),
      useLevel: 'trace',
      quietReqLogger: !configService.get<boolean>('LOG_HTTP_REQUESTS', false),
      quietResLogger: !configService.get<boolean>('LOG_HTTP_REQUESTS', false),
      autoLogging: configService.get<boolean>('LOG_HTTP_REQUESTS', false),
      genReqId: (request) => request.headers['x-correlation-id'] || uuidv4(),
      transport: {
        targets: configureLoggingTransport(configService),
      },
    },
  };
};
