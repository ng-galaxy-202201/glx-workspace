export interface GenericResponse<DataType> {
  total: number;
  next: number;
  previous: number;
  data: DataType[]
}

interface User {
  id: number;
}

const UserReponse: GenericResponse<User> = {
  total: 1,
  next: 1,
  previous: 1,
  data: [
    { id: 1 }
  ]
}
