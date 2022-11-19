import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ErrorHttpHandlerInterceptor } from './error-http-handler.interceptor';
import { MatSnackBarModule } from '@angular/material/snack-bar';

@NgModule({
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorHttpHandlerInterceptor,
      multi: true
    }
  ],
  imports: [
    MatSnackBarModule
  ]
})
export class ErrorHttpHandlerModule {}
