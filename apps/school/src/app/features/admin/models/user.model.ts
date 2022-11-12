import { UserReponse } from '../interfaces/user-response.interface';

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
