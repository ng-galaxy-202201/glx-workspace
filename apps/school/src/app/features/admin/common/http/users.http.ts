import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'apps/school/src/environments/environment';
import { map } from 'rxjs';
import { UserDTO } from '../../domain/dto/user.dto';
import { UserReponse, UserWithPermissionReponse } from '../../domain/interfaces/user-response.interface';
import { User, UserWithPermissions } from '../../domain/models/user.model';
import { AdminHttpModule } from './http.module';

@Injectable({
  providedIn: AdminHttpModule
})
export class UsersHttp {
  private endpoint = 'users';
  constructor(private http: HttpClient) { }

  getAll() {
    return this.http.get<UserReponse[]>(this.endpoint)
      .pipe(map(users => users.map(user => new User(user))))
  }

  getOne(id: number) {
    return this.http.get<UserWithPermissionReponse>(`${this.endpoint}/${id}`)
      .pipe(map(user => new UserWithPermissions(user)))
  }

  create(body: UserDTO) {
    return this.http.post<UserWithPermissionReponse>(this.endpoint, body)
      .pipe(map(user => new UserWithPermissions(user)))
  }

  update(id: number, body: UserDTO) {
    return this.http.put<UserWithPermissionReponse>(`${this.endpoint}/${id}`, body)
      .pipe(map(user => new UserWithPermissions(user)))
  }

  delete(id: number) {
    return this.http.delete<UserReponse>(`${this.endpoint}/${id}`)
  }

  search(filters: Pick<User, 'email' | 'firstName'>) {
    // ...
  }
}
