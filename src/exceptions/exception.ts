import { ErrorCodeEnum } from "./error-code.enum";

export abstract class AppException extends Error{
    constructor (message: string, public readonly code: ErrorCodeEnum) {
        super(message);
    }
}

export class ServerException extends AppException {
    constructor(message: string = 'Unknown server exception', code: ErrorCodeEnum = ErrorCodeEnum.ServerError) {
        super(message, code);
    }
}

export class ClientException extends AppException {
    constructor(message: string = 'Unknown client exception', code: ErrorCodeEnum = ErrorCodeEnum.ClientError) {
        super(message, code);
    }
}

export class NotFoundException extends AppException {
    constructor(message: string = 'Unknwn not found exception', code: ErrorCodeEnum = ErrorCodeEnum.NotFound) {
        super(message, code);
    }
}