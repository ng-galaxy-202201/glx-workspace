import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'apps/school/src/environments/environment';
import { map } from 'rxjs';
import { UserDTO } from '../interfaces/user-dto.interface';
import { UserReponse, UserWithPermissionReponse } from '../interfaces/user-response.interface';
import { User } from '../models/user.model';
import { AdminHttpModule } from './http.module';

@Injectable({
  providedIn: AdminHttpModule
})
export class UsersHttp {
  private endpoint = `${environment.baseUrl}/users`;
  constructor(private http: HttpClient) { }

  getAll() {
    return this.http.get<UserReponse[]>(this.endpoint)
      .pipe(map(users => users.map(user => new User(user))))
  }

  create(body: UserDTO) {
    return this.http.post<UserWithPermissionReponse>(this.endpoint, body)
  }

  search(filters: Pick<User, 'email' | 'firstName'>) {
    // ...
  }
}
