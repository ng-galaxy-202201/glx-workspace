export interface AuthAccessTokenPayload {
  userId: number;
  fullname: string;
  isSuperuser: boolean;
  permissions: string[];
}
