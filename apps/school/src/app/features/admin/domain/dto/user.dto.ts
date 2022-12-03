import { UserReponse } from '../interfaces/user-response.interface';

export type UserDTO = Omit<UserReponse, 'id'> & {
  permissions: number[],
  rols: number[]
};
