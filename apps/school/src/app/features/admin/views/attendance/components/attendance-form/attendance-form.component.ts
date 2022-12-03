import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { AppValidator } from '@school/common/forms/validator';
import { filter, Observable, switchMap, tap } from 'rxjs';
import { ClassroomSubjectStudentHttp } from '../../../../common/http/classroom-subject-student.http';
import { ClassroomSubjectTeacherHttp } from '../../../../common/http/classroom-subject-teacher.http';
import { AttendanceDTO } from '../../../../domain/dto/attendance.dto';
import { Attendance, AttendanceWidthDetails } from '../../../../domain/models/attendance.model';
import { ClassroomSubjectStudent } from '../../../../domain/models/classroom-subject-student.model';
import { ClassroomSubjectTeacher } from '../../../../domain/models/classroom-subject-teacher.model';
import { ClassroomSubject } from '../../../../domain/models/classroom-subject.model';

@Component({
  selector: 'app-attendance-form',
  templateUrl: './attendance-form.component.html',
  styleUrls: ['./attendance-form.component.scss'],
})
export class AttendanceFormComponent implements OnInit, OnChanges {
  form: FormGroup;
  classroomSubjectTeacherList$!: Observable<ClassroomSubjectTeacher[]>;
  classroomSubjectStudentList: ClassroomSubjectStudent[] = [];

  @Input() teacherId!: number;
  @Input() attendance?: AttendanceWidthDetails;
  @Input() backPath = '../';
  @Output() save: EventEmitter<AttendanceDTO> = new EventEmitter();

  get classroomSubjectIdControl() {
    return this.form.get('classroomSubjectId') as FormControl;
  }

  get datailsArray() {
    return this.form.get('details') as FormArray;
  }

  constructor(
    private fb: FormBuilder,
    private classroomSubjectTeacherHttp: ClassroomSubjectTeacherHttp,
    private classroomSubjectStudentHttp: ClassroomSubjectStudentHttp
  ) {
    this.form = fb.group({
      date: ['', Validators.required],
      classroomSubjectId: [null, Validators.required],
      teacherId: [null, Validators.required],
      details: fb.array([], { validators: AppValidator.atLeast(1) }),
    });

    this.classroomSubjectIdControl.valueChanges
      .pipe(
        switchMap((id: number) => this.classroomSubjectStudentHttp.getAll(id)),
        tap((items) => this.populateDetails(items))
      )
      .subscribe();
  }

  populateDetails(items: ClassroomSubjectStudent[]) {
    this.classroomSubjectStudentList = items;
    this.datailsArray.clear();
    items.forEach((item) => {
      this.datailsArray.push(
        this.fb.group({
          studentId: item.student.id,
          status: ['A', Validators.required],
        })
      );
    });

    if (this.attendance) {
      this.patchDetails(this.attendance);
    }
  }

  ngOnInit(): void {
    this.classroomSubjectTeacherList$ = this.classroomSubjectTeacherHttp.getAll(
      this.teacherId
    );
    this.form.patchValue({
      date: new Date(),
      teacherId: this.teacherId,
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['attendance']?.currentValue) {
      this.patchForm(changes['attendance'].currentValue);
    }
  }

  patchForm(attendance: AttendanceWidthDetails) {
    this.classroomSubjectIdControl.disable();
    this.form.patchValue({
      date: attendance.date,
      classroomSubjectId: attendance.classroomSubject.id,
      teacherId: this.teacherId,
    })
  }

  patchDetails(attendance: AttendanceWidthDetails) {
    this.datailsArray.patchValue(attendance.details.map(detail => ({
      studentId: detail.student.id,
      status: detail.status
    })));
  }

  submitForm() {
    if (this.form.invalid) return;
    this.save.emit(this.form.getRawValue());
  }
}
