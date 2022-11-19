import { UserReponse, UserWithPermissionReponse } from '../interfaces/user-response.interface';
import { RolPermission } from './rol-permission.model';

export class User {
  id: number;
  dni: string;
  email: string;
  firstName: string;
  lastName: string;
  isSuperuser: boolean;

  get fullname() {
    return `${this.lastName}, ${this.firstName}`;
  }

  constructor(data: UserReponse) {
    this.id = data.id;
    this.dni = data.dni;
    this.email = data.email;
    this.firstName = data.firstName;
    this.lastName = data.lastName;
    this.isSuperuser = data.isSuperuser;
  }
}

export class UserWithPermissions extends User {
  permissions: RolPermission[];
  rols: RolPermission[];

  constructor(data: UserWithPermissionReponse) {
    super(data);
    this.permissions = data.permissions.map(permission => new RolPermission(permission));
    this.rols = data.rols.map(rol => new RolPermission(rol));
  }
}
