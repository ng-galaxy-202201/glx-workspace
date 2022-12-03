import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AuthCommonModule } from '@school/common/auth/auth.module';
import { ErrorHttpHandlerModule } from '@school/common/error-http-handler/error-http-handler.module';
import { BaseUrlModule } from '@school/common/base-url/base-url.module';

@NgModule({
  imports: [
    HttpClientModule,
    AuthCommonModule,
    BaseUrlModule,
    ErrorHttpHandlerModule
  ]
})
export class AdminHttpModule { }
