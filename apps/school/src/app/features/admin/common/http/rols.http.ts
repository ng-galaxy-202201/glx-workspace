import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'apps/school/src/environments/environment';
import { map } from 'rxjs';
import { RolDTO } from '../../domain/dto/rol.dto';
import { RolPermissionReponse, RolWithPermissionReponse } from '../../domain/interfaces/rol-permission-response.interface';
import { RolPermission, RolWithPermission } from '../../domain/models/rol-permission.model';
import { AdminHttpModule } from './http.module';

@Injectable({
  providedIn: AdminHttpModule
})
export class RolsHttp {
  private endpoint = 'rols';

  constructor(private http: HttpClient) { }

  getAll() {
    return this.http.get<RolPermissionReponse[]>(this.endpoint)
      .pipe(map(users => users.map(user => new RolPermission(user))))
  }

  getOne(id: number) {
    return this.http.get<RolWithPermissionReponse>(`${this.endpoint}/${id}`)
      .pipe(map(rol => new RolWithPermission(rol)))
  }

  create(body: RolDTO) {
    return this.http.post<RolWithPermissionReponse[]>(this.endpoint, body)
  }

  update(id: number, body: RolDTO) {
    return this.http.put<RolWithPermissionReponse[]>(`${this.endpoint}/${id}`, body)
  }

  delete(id: number) {
    return this.http.delete<RolPermissionReponse>(`${this.endpoint}/${id}`)
  }
}
