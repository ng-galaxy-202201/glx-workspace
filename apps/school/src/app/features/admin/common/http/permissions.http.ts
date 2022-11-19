import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'apps/school/src/environments/environment';
import { map } from 'rxjs';
import { RolPermissionReponse } from '../../domain/interfaces/rol-permission-response.interface';
import { RolPermission } from '../../domain/models/rol-permission.model';
import { AdminHttpModule } from './http.module';

@Injectable({
  providedIn: AdminHttpModule
})
export class PermissionsHttp {

  constructor(private http: HttpClient) { }

  getAll() {
    return this.http.get<RolPermissionReponse[]>(`${environment.baseUrl}/permissions`)
      .pipe(map(users => users.map(user => new RolPermission(user))))
  }
}
