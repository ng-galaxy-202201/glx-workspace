import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

export const errorFromStatus: Map<number, string> = new Map([
  [500, 'Estamos trabajando en mejorar tu servicio, por favor intentelo mas tarde'],
])


export const customFromError: Map<string, string> = new Map([
  ['ERR_USR_0001', 'El correo ya esta en uso'],
])


@Injectable()
export class ErrorHttpHandlerInterceptor implements HttpInterceptor {

  constructor(private snackBar: MatSnackBar) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request)
      .pipe(catchError((error: HttpErrorResponse) => {
        let message = errorFromStatus.get(error.status);

        if (error.status === 400) {
          message = customFromError.get(error.error.message);
        }

        if (message) {
          this.snackBar.open(message, 'Ok', { duration: 3000 });
        }
        return throwError(() => error)
      }));
  }
}
