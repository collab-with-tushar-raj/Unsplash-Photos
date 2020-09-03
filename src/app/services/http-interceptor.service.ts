import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpResponse,
  HttpErrorResponse,
} from '@angular/common/http';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HttpInterceptorService {
  constructor() {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    request = request.clone({
      headers: request.headers.set(
        'Authorization',
        'Client-ID SuFSI-oMObmiz2SsDEhVEOt7Yp7mpLjT2qxWbVtrt2w'
      ),
    });

    return next.handle(request).pipe(
      map((event: HttpEvent<any>) => {
        if (event instanceof HttpResponse) {
          // we can handle each and every response from the API here
          console.log('event--->>>', event);
        }
        return event;
      }),
      catchError((error: HttpErrorResponse) => {
        this.handleErrors(error);
        return of(error);
      }) as any
    );
  }

  handleErrors(error: HttpErrorResponse): void {
    switch (error.status) {
      case 401:
        break;
    }
  }
}
