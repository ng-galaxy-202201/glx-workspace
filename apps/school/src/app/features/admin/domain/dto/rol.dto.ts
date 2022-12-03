import { RolPermissionReponse } from '../interfaces/rol-permission-response.interface';

export type RolDTO = Omit<RolPermissionReponse, 'id'> & {
  permissions: number[]
};
