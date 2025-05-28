import axios, { AxiosInstance, CreateAxiosDefaults } from 'axios';
import axiosRetry, { IAxiosRetryConfig } from 'axios-retry';
import { PinoLogger } from 'nestjs-pino';

export const axiosWithRetryHelper = (
  logger?: PinoLogger,
  axiosRetryConfig?: IAxiosRetryConfig,
  axiosDefaultConfig?: CreateAxiosDefaults,
): AxiosInstance => {
  const axiosWithRetry = axios.create(axiosDefaultConfig);
  axiosRetry(axiosWithRetry, {
    retries: 3,
    retryDelay: axiosRetry.exponentialDelay,
    onRetry: logger ? (retryCount, error, requestConfig) => {
      logger.warn(
        `AXIOS retry #${retryCount} for url ${requestConfig.url} on error code [${error.code}] [${error.message || error.cause.message || error.name || error.cause.name}] and timeout [${requestConfig.timeout}]`,
      );
    } : undefined,
    ...axiosRetryConfig,
  });
  return axiosWithRetry;
};
