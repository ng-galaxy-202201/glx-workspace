import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
} from '@angular/common/http';
import { catchError, Observable, switchMap, throwError } from 'rxjs';
import { AuthSession } from '../services/auth-session.service';
import { AuthCommonHttp } from '../http/auth.http';
import { Router } from '@angular/router';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  refreshing = false;

  constructor(
    private authSession: AuthSession,
    private authHttp: AuthCommonHttp,
    private router: Router
  ) {}

  private getRequest(request: HttpRequest<unknown>) {
    return request.clone({
      setHeaders: {
        Authorization: `Bearer ${this.authSession.access.token}`,
      },
    });
  }

  private destroySession(err: HttpErrorResponse) {
    if (err.status === 401) {
      this.authSession.destroy();
      this.router.navigateByUrl('/auth');
    }
    return throwError(() => err);
  }

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    const accessIsExpired = this.authSession.access.isExpired();
    const refreshIsExpired = this.authSession.refresh.isExpired();
    const refreshToken = this.authSession.refresh.token!;

    if (!this.refreshing && accessIsExpired && !refreshIsExpired) {
      this.refreshing = true;
      return this.authHttp.refreshToken(refreshToken).pipe(
        switchMap((token) => {
          this.authSession.update(token.access);
          this.refreshing = false;
          return next.handle(this.getRequest(request));
        }),
        catchError(this.destroySession)
      );
    }

    return next.handle(this.getRequest(request)).pipe(
      catchError(this.destroySession)
    );
  }
}
