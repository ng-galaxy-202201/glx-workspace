import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'apps/school/src/environments/environment';
import { map } from 'rxjs';
import { RolPermissionReponse } from '../interfaces/rol-permission-response.interface';
import { RolPermission } from '../models/rol-permission.model';
import { AdminHttpModule } from './http.module';

@Injectable({
  providedIn: AdminHttpModule
})
export class RolsHttp {

  constructor(private http: HttpClient) { }

  getAll() {
    return this.http.get<RolPermissionReponse[]>(`${environment.baseUrl}/rols`)
      .pipe(map(users => users.map(user => new RolPermission(user))))
  }
}
