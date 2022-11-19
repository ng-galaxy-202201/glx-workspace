import { AuthAccessTokenPayload } from '../interfaces/auth-access-token-payload.interface';

export class AuthUser {
  id: number;
  fullname: string;
  isSuperuser: boolean;
  permissions: string[];

  constructor(payload: AuthAccessTokenPayload) {
    this.id = payload.userId;
    this.fullname = payload.fullname;
    this.isSuperuser = payload.isSuperuser;
    this.permissions = payload.permissions;
  }

  hasPermissions(permissions: string | string[]) {
    if (this.isSuperuser) return true;

    if (Array.isArray(permissions)) {
      return permissions.some(permission => this.permissions.includes(permission));
    }

    return this.permissions.includes(permissions);
  }
}
