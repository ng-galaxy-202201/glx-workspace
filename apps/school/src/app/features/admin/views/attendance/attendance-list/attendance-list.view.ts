import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AuthSession } from '@school/common/auth/services/auth-session.service';
import { ConfirmDialogComponent } from '@school/common/components/confirm-dialog/confirm-dialog.component';
import { filter, tap } from 'rxjs';
import { AttendanceHttp } from '../../../common/http/attendance.http';
import { Attendance } from '../../../domain/models/attendance.model';

@Component({
  templateUrl: './attendance-list.view.html',
  styleUrls: ['./attendance-list.view.scss']
})
export class AttendanceListView implements OnInit {
  displayedColumns: string[] = [
    'date',
    'classroom',
    'subject',
    'actions',
  ];
  dataSource: Attendance[] = [];

  constructor(
    private attendanceHttp: AttendanceHttp,
    private dialog: MatDialog,
    protected authSession: AuthSession,
  ) {}

  ngOnInit(): void {
    this.attendanceHttp.getAll().subscribe((res) => (this.dataSource = res));
  }

  confirmDelete(item: Attendance) {
    const modal = this.dialog.open(ConfirmDialogComponent, {
      data: {
        text: `Desea eliminar la asistencia del curso ${item.classroomSubject.subject}`,
      },
    });

    modal.afterClosed()
      .pipe(
        filter(res => !!res),
        tap(() => this.remove(item.id))
      )
      .subscribe()
  }

  remove(id: number) {
    this.attendanceHttp.delete(id)
      .subscribe(() => {
        this.dialog.closeAll();
        this.dataSource = this.dataSource.filter(item => item.id != id);
      })
  }
}
