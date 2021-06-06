import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Student } from './student.entity';
import { CreateStudentInput } from './student.input';
import { v4 as uuid } from 'uuid';

@Injectable()
export class StudentService {
  constructor(
    @InjectRepository(Student)
    private studentsRepository: Repository<Student>,
  ) {}

  createStudent(createStudentInput: CreateStudentInput): Promise<Student> {
    const { firstName, lastName } = createStudentInput;

    const student = this.studentsRepository.create({
      id: uuid(),
      firstName,
      lastName,
    });

    return this.studentsRepository.save(student);
  }

  getStudents(): Promise<Student[]> {
    return this.studentsRepository.find();
  }

  getStudent(id: string): Promise<Student> {
    return this.studentsRepository.findOne({ id });
  }

  async getStudentsById(studentIds: string[]): Promise<Student[]> {
    return this.studentsRepository.find({
      where: {
        id: {
          $in: studentIds,
        },
      },
    });
  }
}
