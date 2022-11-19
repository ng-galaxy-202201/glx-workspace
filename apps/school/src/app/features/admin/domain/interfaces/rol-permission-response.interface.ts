export interface RolPermissionReponse {
  id: number;
  name: string;
}

export type RolWithPermissionReponse = RolPermissionReponse & {
  permissions: RolPermissionReponse[];
}
