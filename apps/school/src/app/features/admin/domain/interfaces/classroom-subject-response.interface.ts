export interface ClassroomResponse {
  id: number;
  grade: string;
  level: number;
};

export interface SubjectResponse {
  id: number;
  name: string;
};

export interface ClassroomSubjectResponse {
  id: number;
  classroom: ClassroomResponse;
  subject: SubjectResponse;
};
