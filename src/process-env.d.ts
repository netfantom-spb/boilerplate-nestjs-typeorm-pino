declare global {
  namespace NodeJS {
    interface ProcessEnv {
      readonly NODE_ENV: string;
      readonly PORT: string;

      readonly PG_HOST: string;
      readonly PG_PORT: number;
      readonly PG_USER: string;
      readonly PG_PASSWORD: string;
      readonly PG_DBNAME: string;

      readonly LOG_LEVEL: string;
      readonly LOG_CONSOLE: string;
      readonly LOG_DB_QUERIES: string;
    }
  }
}
