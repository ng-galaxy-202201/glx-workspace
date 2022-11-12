import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { AuthCommonHttp } from './http/auth.http';
import { AuthInterceptor } from './interceptors/auth.interceptor';

@NgModule({
  imports: [
    HttpClientModule
  ],
  providers: [
    AuthCommonHttp,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
  ]
})
export class AuthCommonModule { }
