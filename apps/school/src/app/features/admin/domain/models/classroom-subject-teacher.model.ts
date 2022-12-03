import { ClassroomSubjectTeacherResponse } from '../interfaces/classroom-subject-teacher-response.interface';
import { ClassroomSubject } from './classroom-subject.model';

export class ClassroomSubjectTeacher {
  id: number;
  classroomSubject: ClassroomSubject;
  teacherId: number;

  constructor(data: ClassroomSubjectTeacherResponse) {
    this.id = data.id;
    this.classroomSubject = new ClassroomSubject(data.classroomSubject);
    this.teacherId = data.teacherId;
  }
}
