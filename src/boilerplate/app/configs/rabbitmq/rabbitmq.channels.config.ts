/**
 * @package boilerplate-nestjs-typeorm-pino
 * @summary EnvironmentVariablesAppDto class
 * @version 1.13
 * @description User defined RabbitMQ channels configuration
 */

import { RabbitMQChannels } from "@golevelup/nestjs-rabbitmq";

export const RabbitMQChannelsAppConfig: RabbitMQChannels = {
  default: {
    prefetchCount: 1,
    default: true,
  }
};
