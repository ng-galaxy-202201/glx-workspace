import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'apps/school/src/environments/environment';
import { AuthToken } from '../interfaces/auth-token.interface';

@Injectable()
export class AuthCommonHttp {
  constructor(private http: HttpClient) {}

  refreshToken(refresh: string) {
    return this.http.post<Pick<AuthToken, 'access'>>(`${environment.baseUrl}/auth/token/refresh`, { refresh })
  }
}
