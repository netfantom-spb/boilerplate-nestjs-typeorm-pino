/**
 * @package boilerplate-nestjs-typeorm-pino
 * @summary EnvironmentVariablesAppDto class
 * @version 1.13
 * @description User defined RabbitMQ exchanges configuration
 */

import { RabbitMQExchangeConfig } from "@golevelup/nestjs-rabbitmq";

export const RabbitMQExchangesAppConfig: RabbitMQExchangeConfig[] = [{
  name: 'example-exchange',
  createExchangeIfNotExists: false,
  type: 'fanout',
  options: {
    durable: true,
    alternateExchange: 'example-alternate-exchange',
    arguments: {
      
    }
  }
}];