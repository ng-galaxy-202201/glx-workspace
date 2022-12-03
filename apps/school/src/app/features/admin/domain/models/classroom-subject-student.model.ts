import { ClassroomSubjectStudentResponse } from '../interfaces/classroom-subject-student-response.interface';
import { ClassroomSubject } from './classroom-subject.model';
import { Student } from './student.model';

export class ClassroomSubjectStudent {
  id: number;
  classroomSubject: ClassroomSubject;
  student: Student;

  constructor(data: ClassroomSubjectStudentResponse) {
    this.id = data.id;
    this.classroomSubject = new ClassroomSubject(data.classroomSubject);
    this.student = new Student(data.student);
  }
}
