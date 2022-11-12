import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthToken } from '@school/common/auth/interfaces/auth-token.interface';
import { environment } from 'apps/school/src/environments/environment';
import { AuthDTO } from '../interfaces/auth-dto.interface';
import { AuthHttpModule } from './http.module';

@Injectable({
  providedIn: AuthHttpModule
})
export class AuthHttp {

  constructor(private http: HttpClient) { }

  signIn(body: AuthDTO) {
    return this.http.post<AuthToken>(`${environment.baseUrl}/auth/token`, body)
  }
}
