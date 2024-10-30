import { ErrorCodeEnum } from "@/exceptions/error-code.enum";
import { ServerException } from "@/exceptions/exception";

export class TestServerException extends ServerException {
    constructor(id: number) {
        super(`Test server error for ID ${id}`, ErrorCodeEnum.CunstomServerError);
    }
}