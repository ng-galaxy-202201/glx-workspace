import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AuthCommonModule } from '@school/common/auth/auth.module';
import { ErrorHttpHandlerModule } from '@school/common/error-http-handler/error-http-handler.module';

@NgModule({
  imports: [
    HttpClientModule,
    AuthCommonModule,
    ErrorHttpHandlerModule
  ]
})
export class AdminHttpModule { }
