import {
  CallHandler,
  ExecutionContext,
  HttpException,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, catchError, map, throwError, timestamp } from 'rxjs';
import { QueryFailedError } from 'typeorm';
import { DatabaseError } from 'pg-protocol';

export interface IResponse {
  success: boolean;
  status: number;
  data: any;
  message: string;
}

@Injectable()
export class ResponseInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((data) => this.responseHandler(data, context)),
      catchError((error: HttpException) => {
        // console.log(`CATCH ${error.constructor.name}: ${error}`);
        return throwError(() => this.errorHandler(error, context));
      }),
    );
  }

  responseHandler(data: any, ctx: ExecutionContext) {
    const context = ctx.switchToHttp();
    const request = context.getRequest();
    const response = context.getResponse();
    const success: boolean =
      response.statusCode >= 200 && response.statusCode <= 299;

    return {
      success,
      status: response.statusCode,
      data,
      message: null,
    };
  }

  errorHandler(error: any, ctx: ExecutionContext) {
    const errorType = error.constructor.name;
    const context = ctx.switchToHttp();
    const response = context.getResponse();

    let message = 'Internal server error';
    let status = 500;

    console.error(`Interceptor catch error: ${error.message}`, {
      url: context.getRequest().url,
      error: error,
    });

    switch (errorType) {
      case 'HttpException':
        status = error.getStatus();
        message = error.message;
        break;

      case 'QueryFailedError':
        const mappedError = getTypeORMMappedError(error);
        status = mappedError.status;
        message = mappedError.message;
        break;
      default:
        break;
    }

    response.status(status).json({
      success: false,
      status,
      data: null,
      message,
    });
  }
}

function getTypeORMMappedError(error: QueryFailedError): {
  status: number;
  message: string;
} {
  const err = error.driverError as DatabaseError;
  switch (err.code) {
    case '23505':
      return {
        status: 409,
        message: 'User already exists',
      };
    default:
      return {
        status: 500,
        message: 'Internal server error',
      };
  }
}
