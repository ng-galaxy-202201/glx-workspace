import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { UsersView } from './views/users/users.view';
import { AdminMaterialModule } from './material/material.module';
import { AdminHttpModule } from './http/http.module';
import { UserCreateView } from './views/user-create/user-create.view';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AdminComponent,
    UsersView,
    UserCreateView
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    AdminMaterialModule,
    AdminHttpModule,
    ReactiveFormsModule
  ]
})
export class AdminModule { }
