import { Injectable } from '@angular/core';
import { CourseItem, courses } from '../utils/public_api';

@Injectable({
  providedIn: 'root',
})
export class CoursesService {
  courses = courses;

  getList() {
    return this.courses;
  }

  createCourse(course: CourseItem) {
    this.courses.push(course);
  }

  getItemById(id: string) {
    return this.courses.find((course) => course.id === id);
  }

  updateItem(course: CourseItem) {
    const index: number = this.courses.findIndex(({ id }) => id === course.id);

    this.courses[index] = course;
  }

  removeItem(id: string) {
    // this.courses = this.courses.filter((item) => item.id !== id); ?? why it doesn't work
    const index: number = this.courses.findIndex((course) => course.id === id);

    this.courses.splice(index, 1);
  }
}
