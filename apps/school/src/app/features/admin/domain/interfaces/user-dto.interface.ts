import { UserReponse } from './user-response.interface';

export type UserDTO = Omit<UserReponse, 'id'> & {
  permissions: number[],
  rols: number[]
};
