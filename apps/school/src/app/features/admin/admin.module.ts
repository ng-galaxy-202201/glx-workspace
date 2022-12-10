import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { UsersView } from './views/users/users.view';
import { AdminMaterialModule } from './common/material/material.module';
import { AdminHttpModule } from './common/http/http.module';
import { UserCreateView } from './views/user-create/user-create.view';
import { UserUpdateView } from './views/user-update/user-update.view';
import { AdminComponentsModule } from './common/components/components.module';
import { AuthCommonModule } from '@school/common/auth/auth.module';
import { RolsView } from './views/rols/rols.view';
import { RolCreateView } from './views/rol-create/rol-create.view';
import { RolUpdateView } from './views/rol-update/rol-update.view';
import { AdminStoreModule } from './common/store/store.module';
@NgModule({
  declarations: [
    AdminComponent,
    UsersView,
    UserCreateView,
    UserUpdateView,
    RolsView,
    RolCreateView,
    RolUpdateView,
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    AdminMaterialModule,
    AdminHttpModule,
    AdminComponentsModule,
    AuthCommonModule,
    AdminStoreModule
  ]
})
export class AdminModule { }
