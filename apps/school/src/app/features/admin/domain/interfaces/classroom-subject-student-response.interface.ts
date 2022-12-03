import { ClassroomSubjectResponse } from './classroom-subject-response.interface';
import { StudentResponse } from './student-response.interface';

export interface ClassroomSubjectStudentResponse {
  id: number;
  classroomSubject: ClassroomSubjectResponse;
  student: StudentResponse
}
