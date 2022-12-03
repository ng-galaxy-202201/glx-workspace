import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { AttendanceDTO } from '../../domain/dto/attendance.dto';
import { AttendanceResponse, AttendanceWidthDatilsReponse } from '../../domain/interfaces/attendance-response.interface';
import { Attendance, AttendanceWidthDetails } from '../../domain/models/attendance.model';
import { AdminHttpModule } from './http.module';

@Injectable({
  providedIn: AdminHttpModule
})
export class AttendanceHttp {
  private endpoint = 'attendance';

  constructor(private http: HttpClient) { }

  getAll() {
    return this.http.get<AttendanceResponse[]>(this.endpoint)
      .pipe(map(items => items.map(item => new Attendance(item))))
  }

  getOne(id: number) {
    return this.http.get<AttendanceWidthDatilsReponse>(`${this.endpoint}/${id}`)
      .pipe(map(item => new AttendanceWidthDetails(item)))
  }

  create(body: AttendanceDTO) {
    return this.http.post<any>(this.endpoint, body)
  }

  update(id: number, body: AttendanceDTO) {
    return this.http.put<any>(`${this.endpoint}/${id}`, body)
  }

  delete(id: number) {
    return this.http.delete<any>(`${this.endpoint}/${id}`)
  }
}
