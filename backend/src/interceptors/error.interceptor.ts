import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  RequestTimeoutException,
} from '@nestjs/common';
import { Observable, throwError, TimeoutError } from 'rxjs';
import { catchError, timeout } from 'rxjs/operators';

@Injectable()
export class ErrorInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    console.log('3.b interceptors | error | before ---');
    return next.handle().pipe(
      timeout(6000),
      catchError((error) => {
        console.log(
          '3.b interceptors | error | after | error.response:',
          error.response,
        );
        if (error instanceof TimeoutError) {
          return throwError(new RequestTimeoutException());
        }
        return throwError(error);
      }),
    );
  }
}
