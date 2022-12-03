import { ClassroomSubjectResponse } from './classroom-subject-response.interface';

export interface ClassroomSubjectTeacherResponse {
  id: number;
  classroomSubject: ClassroomSubjectResponse;
  teacherId: number;
}
