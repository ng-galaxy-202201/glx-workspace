import { RolPermissionReponse } from '../interfaces/rol-permission-response.interface';

export class RolPermission {
  id: number;
  name: string;

  constructor(data: RolPermissionReponse) {
    this.id = data.id;
    this.name = data.name;
  }
}
