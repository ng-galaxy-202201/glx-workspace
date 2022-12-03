export interface AttendanceDTO {
  date: string;
  classroomSubjectId: number;
  teacherId: number;
  details: {
    studentId: number;
    status: string;
  }[];
}
