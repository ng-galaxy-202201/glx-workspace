import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { ClassroomSubjectStudentResponse } from '../../domain/interfaces/classroom-subject-student-response.interface';
import { ClassroomSubjectTeacherResponse } from '../../domain/interfaces/classroom-subject-teacher-response.interface';
import { ClassroomSubjectStudent } from '../../domain/models/classroom-subject-student.model';
import { ClassroomSubjectTeacher } from '../../domain/models/classroom-subject-teacher.model';
import { AdminHttpModule } from './http.module';

@Injectable({
  providedIn: AdminHttpModule
})
export class ClassroomSubjectStudentHttp {
  private endpoint = 'classrooms/subjects/students';

  constructor(private http: HttpClient) { }

  getAll(classroomSubjectId: number) {
    let params = new HttpParams()
    params = params.append('classroomSubjectId', classroomSubjectId);

    return this.http.get<ClassroomSubjectStudentResponse[]>(this.endpoint, { params })
      .pipe(map(items => items.map(item => new ClassroomSubjectStudent(item))))
  }
}
