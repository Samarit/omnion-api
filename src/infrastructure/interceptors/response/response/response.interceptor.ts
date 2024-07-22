import {
  CallHandler,
  ExecutionContext,
  HttpException,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, catchError, map, throwError } from 'rxjs';

@Injectable()
export class ResponseInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((data) => this.responseHandler(data, context)),
      catchError((error: HttpException) =>
        throwError(() => this.errorHandler(error, context)),
      ),
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
    };
  }

  errorHandler(error: any, ctx: ExecutionContext) {
    const context = ctx.switchToHttp();
    const response = context.getResponse();
    return {
      success: false,
      status: response.statusCode,
      error,
    };
  }
}
