import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AuthCommonModule } from '@school/common/auth/auth.module';

@NgModule({
  imports: [
    HttpClientModule,
    AuthCommonModule
  ]
})
export class AdminHttpModule { }
