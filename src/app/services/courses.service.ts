import { Injectable } from '@angular/core';
import { CourseItem } from '../utils/public_api';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CoursesService {
  courses!: CourseItem[];
  course!: CourseItem;

  constructor(private http: HttpClient) {}

  getList({ count = 10, sort = 'date', textFragment = '' } = {}): Observable<
    CourseItem[]
  > {
    const url = `courses?start=0&count=${count}&sort=${sort}&textFragment=${textFragment}`;

    return this.http.get<CourseItem[]>(url);
  }

  createCourse(course: CourseItem) {
    return this.http.post<CourseItem>('courses', course);
  }

  getItemById(id: number) {
    return this.http.get<CourseItem>(`courses/${id}`).pipe(
      map((data) => {
        this.course = data;

        return data;
      })
    );
  }

  updateItem(course: CourseItem) {
    const index: number = this.courses.findIndex(({ id }) => id === course.id);

    this.courses[index] = course;
  }

  removeItem(id: number) {
    return this.http.delete(`courses/${id}`);
  }
}
