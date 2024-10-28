import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { catchError, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { LoggingService } from "../services/log.service";

export interface Response<T> {
  data: T;
}

@Injectable()
export class LoggingInterceptor<T> implements NestInterceptor<T, Response<T>> {
  private readonly log = new LoggingService();

  intercept(context: ExecutionContext, next: CallHandler): Observable<Response<T>> {
    const req = context.switchToHttp().getRequest();

    const correlationId = req.headers['x-correlation-id'];
    const requestStart = Date.now();

    if (correlationId) {
      LoggingService.correlationId = correlationId;
    }
    const {
      rawHeaders,
      httpVersion,
      method,
      body,
      socket,
      url
    } = req;
    const {
      remoteAddress,
      remoteFamily
    } = socket;

    return next.handle().pipe(
      map((response) => {

        const resp = context.switchToHttp().getResponse();
        const {
          statusCode,
          statusMessage,
          headers
        } = resp;

        const responseHeaders = resp.getHeaders();

        // const requestData = {
        //   incoming: {
        //     body: req.body,
        //     headers: req.headers,
        //     method: method,
        //     url: url
        //   },
        //   outgoing: {
        //     response,
        //     duration: `${Date.now() - now}ms`
        //   }
        // };

        const newRecord = {
          timestamp: requestStart,
          processingTime: Date.now() - requestStart,
          rawHeaders,
          body,
          errorMessage: null,
          httpVersion,
          method,
          remoteAddress,
          remoteFamily,
          url,
          response: {
            statusCode,
            statusMessage,
            headers: responseHeaders
          }
        };

        // this.log.info('HTTP', newRecord);

        return response;
      }),
      catchError((err) => {
        this.log.error('Incoming HTTP Response',
          {
            err,
            duration: `${Date.now() - requestStart}ms`
          });
        throw err;
      }),
    );
  }
}
