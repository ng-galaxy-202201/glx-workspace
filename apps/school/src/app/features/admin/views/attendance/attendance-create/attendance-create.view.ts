import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthSession } from '@school/common/auth/services/auth-session.service';
import { AttendanceHttp } from '../../../common/http/attendance.http';
import { AttendanceDTO } from '../../../domain/dto/attendance.dto';

@Component({
  templateUrl: './attendance-create.view.html',
  styleUrls: ['./attendance-create.view.scss']
})
export class AttendanceCreateView {
  constructor(
    private attendanceHttp: AttendanceHttp,
    private router: Router,
    private route: ActivatedRoute,
    protected authSession: AuthSession

  ) { }

  save(formValue: AttendanceDTO) {
    this.attendanceHttp.create(formValue)
    .subscribe(() => {
      this.router.navigate(['../'], { relativeTo: this.route })
    })
  }

}
