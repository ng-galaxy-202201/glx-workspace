import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotHavePermissionsView } from './views/not-have-permissions/not-have-permissions.view';
import { NotFoundView } from './views/not-found/not-found.view';

@NgModule({
  declarations: [
    NotHavePermissionsView,
    NotFoundView
  ],
  imports: [
    CommonModule
  ]
})
export class AppCoreModule { }
