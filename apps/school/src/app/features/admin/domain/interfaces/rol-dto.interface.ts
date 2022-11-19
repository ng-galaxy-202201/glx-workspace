import { RolPermissionReponse } from './rol-permission-response.interface';

export type RolDTO = Omit<RolPermissionReponse, 'id'> & {
  permissions: number[]
};
