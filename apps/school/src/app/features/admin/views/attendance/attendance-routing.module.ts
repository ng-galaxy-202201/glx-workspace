import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PERMISSIONS } from '@school/common/auth/constants/permissions';
import { HasPermissionsGuard } from '@school/common/auth/guards/has-permissions.guard';
import { AttendanceCreateView } from './attendance-create/attendance-create.view';
import { AttendanceListView } from './attendance-list/attendance-list.view';
import { AttendanceUpdateView } from './attendance-update/attendance-update.view';

const routes: Routes = [
  {
    path: '',
    component: AttendanceListView,
    canActivate: [HasPermissionsGuard],
    data: {
      permissions: PERMISSIONS.ATTENDANCE_UPDATE
    }
  },
  {
    path: 'create',
    component: AttendanceCreateView,
    canActivate: [HasPermissionsGuard],
    data: {
      permissions: PERMISSIONS.ATTENDANCE_CREATE
    }
  },
  {
    path: ':id/update',
    component: AttendanceUpdateView,
    canActivate: [HasPermissionsGuard],
    data: {
      permissions: PERMISSIONS.ATTENDANCE_UPDATE
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AttendanceRoutingModule { }
