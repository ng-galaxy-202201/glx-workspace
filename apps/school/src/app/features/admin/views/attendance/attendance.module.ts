import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AttendanceRoutingModule } from './attendance-routing.module';
import { AttendanceListView } from './attendance-list/attendance-list.view';
import { AdminMaterialModule } from '../../common/material/material.module';
import { AdminHttpModule } from '../../common/http/http.module';
import { AuthCommonModule } from '@school/common/auth/auth.module';
import { ConfirmDialogModule } from '@school/common/components/confirm-dialog/confirm-dialog.module';
import { AttendanceCreateView } from './attendance-create/attendance-create.view';
import { AttendanceFormComponent } from './components/attendance-form/attendance-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AttendanceUpdateView } from './attendance-update/attendance-update.view';

@NgModule({
  declarations: [
    AttendanceListView,
    AttendanceCreateView,
    AttendanceFormComponent,
    AttendanceUpdateView
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AttendanceRoutingModule,
    AdminMaterialModule,
    AdminHttpModule,
    AuthCommonModule,
    ConfirmDialogModule
  ]
})
export class AttendanceModule { }
