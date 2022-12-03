import { StudentResponse } from '../interfaces/student-response.interface';

export class Student {
  id: number;
  dni: string;
  firstName: string;
  lastName: string;

  constructor(data: StudentResponse) {
    this.id = data.id;
    this.dni = data.dni;
    this.firstName = data.firstName;
    this.lastName = data.lastName;
  }

  toString() {
    return `${this.lastName}, ${this.firstName}`
  }
}
