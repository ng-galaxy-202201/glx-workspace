import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AuthToken } from '../interfaces/auth-token.interface';
import { Token } from '../models/token.model';

const ACCESS_KEY = 'access';
const REFRESH_KEY = 'refresh';

@Injectable({
  providedIn: 'root'
})
export class AuthSession {
  access: Token;
  refresh: Token;

  constructor() {
    this.access = new Token(localStorage.getItem(ACCESS_KEY))
    this.refresh = new Token(localStorage.getItem(REFRESH_KEY))
  }

  private setToken(key: string, token: string) {
    localStorage.setItem(key, token);
    return new Token(token);
  }

  private removeToken(key: string) {
    localStorage.removeItem(key);
    return new Token(null);
  }

  isAuthenticated() {
    const isValid = this.access.isValid() && !this.refresh.isExpired();
    if (!isValid) {
      this.destroy();
    }
    return isValid;
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
