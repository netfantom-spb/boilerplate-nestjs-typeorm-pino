import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Request, Response } from 'express';
import {
  AppException,
  ClientException,
  NotFoundException,
  ServerException,
} from '../exceptions/exception';

@Catch(AppException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: AppException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    // const status = exception.getStatus();

    let status: HttpStatus = HttpStatus.INTERNAL_SERVER_ERROR;

    if (exception instanceof ServerException) {
      status = HttpStatus.INTERNAL_SERVER_ERROR;
    } else if (exception instanceof ClientException) {
      status = HttpStatus.BAD_REQUEST;
    } else if (exception instanceof NotFoundException) {
      status = HttpStatus.NOT_FOUND;
    }

    const { code, message } = exception;

    response.status(status).json({
      result: 'error',
      code,
      message,
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
    });
  }
}
