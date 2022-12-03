import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'apps/school/src/environments/environment';

@Injectable()
export class BaseUrlInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const baseUrl = environment.baseUrl;
    const url = request.url;
    if (url.includes(baseUrl)) return next.handle(request);

    const req = request.clone({
      url: `${environment.baseUrl}/${request.url}`
    })

    return next.handle(req);
  }
}
