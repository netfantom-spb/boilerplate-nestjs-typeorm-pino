declare global {
  namespace NodeJS {
    interface ProcessEnv {
      readonly PG_HOST: string;
      readonly PG_PORT: number;
      readonly PG_USER: string;
      readonly PG_PASSWORD: string;
      readonly PG_DBNAME: string;
    }
  }
}
