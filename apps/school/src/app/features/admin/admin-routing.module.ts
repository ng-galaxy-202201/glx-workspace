import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PERMISSIONS } from '@school/common/auth/constants/permissions';
import { HasPermissionsGuard } from '@school/common/auth/guards/has-permissions.guard';
import { AdminComponent } from './admin.component';
import { RolCreateView } from './views/rol-create/rol-create.view';
import { RolUpdateView } from './views/rol-update/rol-update.view';
import { RolsView } from './views/rols/rols.view';
import { UserCreateView } from './views/user-create/user-create.view';
import { UserUpdateView } from './views/user-update/user-update.view';
import { UsersView } from './views/users/users.view';

const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
      {
        path: 'users',
        component: UsersView,
        canActivate: [HasPermissionsGuard],
        data: {
          permissions: PERMISSIONS.USER_READ
        }
      },
      {
        path: 'users/create',
        component: UserCreateView,
        canActivate: [HasPermissionsGuard],
        data: {
          permissions: PERMISSIONS.USER_CREATE
        }
      },
      {
        path: 'users/:id/update',
        component: UserUpdateView,
        canActivate: [HasPermissionsGuard],
        data: {
          permissions: PERMISSIONS.USER_UPDATE
        }
      },
      {
        path: 'rols',
        component: RolsView,
        canActivate: [HasPermissionsGuard],
        data: {
          permissions: PERMISSIONS.ROL_READ
        }
      },
      {
        path: 'rols/create',
        component: RolCreateView,
        canActivate: [HasPermissionsGuard],
        data: {
          permissions: PERMISSIONS.ROL_CREATE
        }
      },
      {
        path: 'rols/:id/update',
        component: RolUpdateView,
        canActivate: [HasPermissionsGuard],
        data: {
          permissions: PERMISSIONS.ROL_UPDATE
        }
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
