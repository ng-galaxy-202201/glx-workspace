import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { ClassroomSubjectTeacherResponse } from '../../domain/interfaces/classroom-subject-teacher-response.interface';
import { ClassroomSubjectTeacher } from '../../domain/models/classroom-subject-teacher.model';
import { AdminHttpModule } from './http.module';

@Injectable({
  providedIn: AdminHttpModule
})
export class ClassroomSubjectTeacherHttp {
  private endpoint = 'classrooms/subjects/teachers';

  constructor(private http: HttpClient) { }

  getAll(teacherId: number) {
    let params = new HttpParams()
    params = params.append('teacherId', teacherId);

    return this.http.get<ClassroomSubjectTeacherResponse[]>(this.endpoint, { params })
      .pipe(map(items => items.map(item => new ClassroomSubjectTeacher(item))))
  }
}
