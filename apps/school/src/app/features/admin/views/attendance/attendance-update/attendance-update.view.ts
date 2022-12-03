import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthSession } from '@school/common/auth/services/auth-session.service';
import { AttendanceHttp } from '../../../common/http/attendance.http';
import { AttendanceDTO } from '../../../domain/dto/attendance.dto';
import { Attendance, AttendanceWidthDetails } from '../../../domain/models/attendance.model';

@Component({
  templateUrl: './attendance-update.view.html',
  styleUrls: ['./attendance-update.view.scss']
})
export class AttendanceUpdateView implements OnInit {
  id: number;
  attendance?: AttendanceWidthDetails;

  constructor(
    private attendanceHttp: AttendanceHttp,
    private router: Router,
    private route: ActivatedRoute,
    protected authSession: AuthSession
  ) {
    this.id = +this.route.snapshot.paramMap.get('id')!;
  }

  ngOnInit(): void {
    this.load();
  }

  load() {
    this.attendanceHttp.getOne(this.id)
      .subscribe(attendance => this.attendance = attendance)
  }

  save(formValue: AttendanceDTO) {
    this.attendanceHttp.update(this.id, formValue)
      .subscribe(() => {
        this.router.navigate(['../../'], { relativeTo: this.route })
      })
  }
}
