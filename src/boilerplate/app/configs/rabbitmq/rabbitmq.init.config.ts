/**
 * @package boilerplate-nestjs-typeorm-pino
 * @summary EnvironmentVariablesAppDto class
 * @version 1.13
 * @description User defined RabbitMQ init configuration
 */

import { ConnectionInitOptions } from "@golevelup/nestjs-rabbitmq";

export const RabbitMQInitAppConfig: ConnectionInitOptions = {
  timeout: 15000,
  wait: true,
  skipConnectionFailedLogging: false,
  reject: true,
};