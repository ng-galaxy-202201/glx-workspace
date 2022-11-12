import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { SignInView } from './views/sign-in/sign-in.view';

import { ReactiveFormsModule } from '@angular/forms';
import { AuthMaterialModule } from './material/material.module';
import { HttpClientModule } from '@angular/common/http';
import { AuthHttpModule } from './http/http.module';

@NgModule({
  declarations: [
    SignInView
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    AuthMaterialModule,
    AuthHttpModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
})
export class AuthModule { }
