import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { UserCreateView } from './views/user-create/user-create.view';
import { UsersView } from './views/users/users.view';

const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
      { path: 'users', component: UsersView },
      { path: 'users/create', component: UserCreateView },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
