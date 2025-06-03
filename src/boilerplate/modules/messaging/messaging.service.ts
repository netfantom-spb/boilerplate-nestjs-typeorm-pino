/**
 * @version 1.13.0
 */
import { AmqpConnection, MessageOptions } from '@golevelup/nestjs-rabbitmq';
import { Injectable, OnModuleInit } from '@nestjs/common';
import { Options } from 'amqplib';
import { validateOrReject, ValidatorOptions } from 'class-validator';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';

@Injectable()
export class MessagingService {
  constructor(
    @InjectPinoLogger(MessagingService.name)
    private readonly logger: PinoLogger,
    private readonly ampqConnection: AmqpConnection,
  ) {}

  async publishMessage<T extends object>({
    exchange,
    routingKey,
    message,
    options,
    validate = false,
    validatorOptions = {},
  }: {
    exchange: string;
    routingKey: string;
    message: T;
    options?: Options.Publish;
    validate?: boolean;
    validatorOptions?: ValidatorOptions;
  }) {
    if (validate) {
      validateOrReject(message, {
        skipMissingProperties: false,
        skipNullProperties: false,
        skipUndefinedProperties: false,
        whitelist: true,
        forbidNonWhitelisted: true,
        forbidUnknownValues: true,
        always: false,
        ...validatorOptions,
      }).catch((errors) => {
        this.logger.error(errors);
        throw new Error('Message validation failed');
      });
    }
    return this.ampqConnection.publish(exchange, routingKey, message, options);
  }
}
