import { AttendanceResponse } from '../interfaces/attendance-response.interface';
import { ClassroomResponse, ClassroomSubjectResponse, SubjectResponse } from '../interfaces/classroom-subject-response.interface';

const LevelMap: Map<number, string> = new Map([
  [0, 'inicial'],
  [1, 'primaria'],
  [2, 'secundaria'],
])

export class Classroom {
  id: number;
  grade: string;
  level: number;

  get displayLevel() {
    return LevelMap.get(this.level);
  }

  constructor(data: ClassroomResponse) {
    this.id = data.id;
    this.grade = data.grade;
    this.level = data.level;
  }

  getDisplayLevel() {
    return LevelMap.get(this.level);
  }

  toString() {
    return `${this.grade} - ${this.displayLevel}`;
  }
}

export class Subject {
  id: number;
  name: string;

  constructor(data: SubjectResponse) {
    this.id = data.id;
    this.name = data.name;
  }

  toString() {
    return this.name;
  }
}

export class ClassroomSubject {
  id: number;
  classroom: Classroom;
  subject: Subject;

  constructor(data: ClassroomSubjectResponse) {
    this.id = data.id;
    this.classroom = new Classroom(data.classroom);
    this.subject = new Subject(data.subject);
  }

  toString() {
    return `${this.classroom} / ${this.subject}`
  }
}

