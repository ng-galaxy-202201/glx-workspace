import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IsAuthenticatedGuard } from '@school/common/auth/guards/is-authenticated.guard';
import { NotFoundView } from './core/views/not-found/not-found.view';
import { NotHavePermissionsView } from './core/views/not-have-permissions/not-have-permissions.view';

const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () =>
      import('./features/auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: 'admin',
    canActivate: [IsAuthenticatedGuard],
    loadChildren: () =>
      import('./features/admin/admin.module').then((m) => m.AdminModule),
  },
  {
    path: 'not-have-permissions',
    component: NotHavePermissionsView
  },
  {
    path: '**',
    component: NotFoundView
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
