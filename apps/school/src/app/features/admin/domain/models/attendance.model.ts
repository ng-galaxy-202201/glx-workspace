import { AttendanceDetailResponse, AttendanceResponse, AttendanceWidthDatilsReponse } from '../interfaces/attendance-response.interface';
import { ClassroomSubject } from './classroom-subject.model';
import { Student } from './student.model';

export class Attendance {
  id: number;
  date: Date;
  classroomSubject: ClassroomSubject;

  constructor(data: AttendanceResponse) {
    this.id = data.id;
    this.date = new Date(data.date);
    this.classroomSubject = new ClassroomSubject(data.classroomSubject);
  }
}

const StatusMap = new Map([
  ['P', 'presente'],
  ['A', 'ausente'],
  ['L', 'tarde'],
])

export class AttendanceDetail {
  id: number;
  status: string;
  student: Student;

  get displayStatus() {
    return StatusMap.get(this.status);
  }

  constructor(data: AttendanceDetailResponse) {
    this.id = data.id;
    this.status = data.status;
    this.student = new Student(data.student);
  }
}

export class AttendanceWidthDetails extends Attendance {
  details: AttendanceDetail[];
  constructor(data: AttendanceWidthDatilsReponse) {
    super(data);
    this.details = data.attendanceDetail.map(item => new AttendanceDetail(item));
  }
}
