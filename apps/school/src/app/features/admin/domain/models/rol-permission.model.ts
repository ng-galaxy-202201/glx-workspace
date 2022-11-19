import { RolPermissionReponse, RolWithPermissionReponse } from '../interfaces/rol-permission-response.interface';

export class RolPermission {
  id: number;
  name: string;

  constructor(data: RolPermissionReponse) {
    this.id = data.id;
    this.name = data.name;
  }
}

export class RolWithPermission extends RolPermission {
  permissions: RolPermission[];

  constructor(data: RolWithPermissionReponse) {
    super(data);
    this.permissions = data.permissions.map(permission => new RolPermission(permission))
  }
}
