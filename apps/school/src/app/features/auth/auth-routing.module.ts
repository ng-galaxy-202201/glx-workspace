import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignInView } from './views/sign-in/sign-in.view';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'sign-in',
    pathMatch: 'full'
  },
  {
    path: 'sign-in',
    component: SignInView
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
