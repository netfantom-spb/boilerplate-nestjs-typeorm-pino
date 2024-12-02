import { Expose } from "class-transformer";
import { IsDate, IsString } from "class-validator";

export class HelloMessageDto {
    @Expose()
    @IsString()
    message: string;

    @Expose()
    @IsDate()
    createdAt: Date;
}