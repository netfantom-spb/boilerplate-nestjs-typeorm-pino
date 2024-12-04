/**
 * @package boilerplate-nestjs-typeorm-pino
 * @summary configureLoggingTransport function
 * @version 1.6
 * @summary Returns Pino transport configuration based on environment va
 */
import { LogLevelEnum } from "@/types/enums/log-level.enum";
import { LogTypeEnum } from "@/types/enums/log-type.enum";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { LoggerModule, Params } from "nestjs-pino";
import { v4 as uuidv4 } from 'uuid';

/**
 * Configure logging by environment variables
 * @param logLevel {LogLevelEnum} Logging level
 * @param logFile {LogTypeEnum} Log file format configuration
 * @param logConsole {LogTypeEnum} Log console format configuration
 * @returns 
 */
const configureLoggingTransport = (logLevel: LogLevelEnum, logFile: LogTypeEnum, logConsole: LogTypeEnum) => {
  const config = [];

  switch (logFile) {
    case LogTypeEnum.PRETTY:
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
    case LogTypeEnum.JSON:
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
    case LogTypeEnum.NONE:
      console.warn('Logging in file is disabled');
      break;
  }

  switch (logConsole) {
    case LogTypeEnum.PRETTY:
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
    case LogTypeEnum.JSON:
      config.push({
        level: logLevel,
        target: 'pino/file',
        options: {
          destination: 1,
        },
      },)
      break;
    case LogTypeEnum.NONE:
      console.warn('Logging in console is disabled');
      break;
  }
  return config;
}

export const configurePinoLoggerTargets = (configService: ConfigService): Params => {
  return {
    pinoHttp: {
      level: 'trace',
      useLevel: 'trace',
      autoLogging: true,
      genReqId: (request) =>
        request.headers['x-correlation-id'] || uuidv4(),
      transport: {
        targets: configureLoggingTransport(configService.get('LOG_LEVEL'), configService.get('LOG_FILE'), configService.get('LOG_CONSOLE'))
      },
    },
  };
}