/**
 * @summary EnvironmentVariablesDto class
 * @version 1.6
 * @description Environment Variables DTO from boilerplate. 
 * Do not change this class, add your own properties to EnvironmentVariableAppDto instead.
 */

import { IsBoolean, IsEnum, IsNumber, IsString, Max, Min } from "class-validator";
import { LogLevelEnum } from "../enums/log-level.enum";
import { NodeEnvEnum } from "../enums/node-env.enum";
import { LogTypeEnum } from "../enums/log-type.enum";
import { ToBoolean } from "@/decorators/to-boolean";
import { Expose } from "class-transformer";

export class EnvironmentVariablesDto {
    @Expose()
    @IsEnum(NodeEnvEnum)
    NODE_ENV: NodeEnvEnum;

    @Expose()
    @IsNumber()
    @Min(0)
    @Max(65535)
    PORT: number;

    @Expose()
    @IsNumber()
    @Min(0)
    @Max(65535)
    PG_PORT: number;

    @Expose()
    @IsString()
    PG_HOST: string;

    @Expose()
    @IsString()
    PG_USER: string;

    @Expose()
    @IsString()
    PG_PASSWORD: string;

    @Expose()
    @IsString()
    PG_DBNAME: string;

    @Expose()
    @IsEnum(LogLevelEnum)
    LOG_LEVEL: LogLevelEnum;

    @Expose()
    @IsEnum(LogTypeEnum)
    LOG_CONSOLE: LogTypeEnum;

    @Expose()
    @IsEnum(LogTypeEnum)
    LOG_FILE: LogTypeEnum;

    @Expose()
    @IsBoolean()
    @ToBoolean()
    LOG_DB_QUERIES: boolean;
}