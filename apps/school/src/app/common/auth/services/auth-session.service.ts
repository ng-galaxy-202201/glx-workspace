import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AuthAccessTokenPayload } from '../interfaces/auth-access-token-payload.interface';
import { AuthToken } from '../interfaces/auth-token.interface';
import { AuthUser } from '../models/auth-user.model';
import { Token } from '../models/token.model';
import { PERMISSIONS } from '../constants/permissions';
import { LocalStorage } from '@school/common/services/local-storage.service';

const ACCESS_KEY = 'access';
const REFRESH_KEY = 'refresh';

@Injectable({
  providedIn: 'root'
})
export class AuthSession {
  access: Token;
  refresh: Token;
  permissions = PERMISSIONS;

  constructor(
    private localStorage: LocalStorage
  ) {
    this.access = new Token(this.localStorage.getItem(ACCESS_KEY))
    this.refresh = new Token(this.localStorage.getItem(REFRESH_KEY))
  }

  private setToken(key: string, token: string) {
    this.localStorage.setItem(key, token);
    return new Token(token);
  }

  private removeToken(key: string) {
    this.localStorage.removeItem(key);
    return new Token(null);
  }

  isAuthenticated() {
    const isValid = this.access.isValid() && !this.refresh.isExpired();
    if (!isValid) {
      this.destroy();
    }
    return isValid;
  }

  getUser() {
    const payload = this.access.decode<AuthAccessTokenPayload>();
    return new AuthUser(payload);
  }

  update(access: string) {
    this.access = this.setToken(ACCESS_KEY, access);
  }

  create(token: AuthToken) {
    this.access = this.setToken(ACCESS_KEY, token.access);
    this.refresh = this.setToken(REFRESH_KEY, token.refresh);
  }

  destroy() {
    this.access = this.removeToken(ACCESS_KEY);
    this.refresh = this.removeToken(REFRESH_KEY);
  }
}
