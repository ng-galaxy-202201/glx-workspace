import { ClassroomSubjectResponse } from './classroom-subject-response.interface';
import { StudentResponse } from './student-response.interface';

export interface AttendanceDetailResponse {
  id: number;
  status: string;
  student: StudentResponse;
}

export interface AttendanceResponse {
  id: number;
  date: string;
  classroomSubject: ClassroomSubjectResponse;
}

export interface AttendanceWidthDatilsReponse extends AttendanceResponse {
  attendanceDetail: AttendanceDetailResponse[];
}
