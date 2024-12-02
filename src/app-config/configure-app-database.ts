/**
 * @summary configureDatabase function
 * @version 1.6
 * @description DB configuration
 */
import { TypeOrmLoggerContainer } from "@/utils/type-orm-logger"
import { ConfigService } from "@nestjs/config"
import { TypeOrmModuleOptions } from "@nestjs/typeorm"

export const configureDatabase = (configService: ConfigService): TypeOrmModuleOptions => {
    return {
        type: 'postgres',
        host: configService.get<string>('PG_HOST'),
        port: configService.get<number>('PG_PORT'),
        username: configService.get<string>('PG_USER'),
        password: configService.get<string>('PG_PASSWORD'),
        database: configService.get<string>('PG_DBNAME'),
        autoLoadEntities: true,
        synchronize: false,
        logging: configService.get<boolean>('LOG_DB_QUERIES'),
        logger: TypeOrmLoggerContainer.ForConnection('responses db', configService.get('LOG_DB_QUERIES', false)),
        retryAttempts: 3,
    }
}