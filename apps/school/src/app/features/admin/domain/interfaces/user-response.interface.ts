import { RolPermissionReponse } from './rol-permission-response.interface';

export interface UserReponse {
  id: number;
  dni: string;
  email: string;
  firstName: string;
  lastName: string;
  isSuperuser: boolean;
}

export interface UserRolPermissionReponse {
  permissions: RolPermissionReponse[];
  rols: RolPermissionReponse[];
}

export type UserWithPermissionReponse = UserReponse & UserRolPermissionReponse;
