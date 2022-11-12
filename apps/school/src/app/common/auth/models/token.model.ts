import { JwtHelperService } from '@auth0/angular-jwt';

const helper = new JwtHelperService();

export class Token {
  constructor(public token: string | null) {}

  isValid(): boolean {
    if (!this.token) return false;
    try {
      return !!helper.decodeToken(this.token);
    } catch {
      return false;
    }
  }

  isExpired(): boolean {
    if (!this.isValid()) return true;
    return helper.isTokenExpired(this.token!);
  }
}
