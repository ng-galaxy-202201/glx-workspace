import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AdminMaterialModule } from '../material/material.module';
import { UserFormComponent } from './user-form/user-form.component';
import { RolFormComponent } from './rol-form/rol-form.component';

@NgModule({
  declarations: [
    UserFormComponent,
    RolFormComponent
  ],
  exports: [
    UserFormComponent,
    RolFormComponent
  ],
  imports: [
    CommonModule,
    AdminMaterialModule,
    ReactiveFormsModule,
    RouterModule
  ]
})
export class AdminComponentsModule {}
