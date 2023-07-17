import { Injectable } from '@angular/core';
import { CourseItem } from '../utils/public_api';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, map, throwError } from 'rxjs';

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

    return this.http.get<CourseItem[]>(url).pipe(
      catchError((err) => {
        console.error(err);
        return throwError(() => new Error(err));
      })
    );
  }

  createCourse(course: CourseItem) {
    return this.http.post<CourseItem>('courses', course).pipe(
      catchError((err) => {
        console.error(err);
        return throwError(() => new Error(err));
      })
    );
  }

  getItemById(id: number) {
    return this.http.get<CourseItem>(`courses/${id}`).pipe(
      map((data) => {
        this.course = data;

        return data;
      }),
      catchError((err) => {
        console.error(err);
        return throwError(() => new Error(err));
      })
    );
  }

  updateItem(course: CourseItem) {
    const index: number = this.courses.findIndex(({ id }) => id === course.id);

    this.courses[index] = course;
  }

  removeItem(id: number) {
    return this.http.delete(`courses/${id}`).pipe(
      catchError((err) => {
        console.error(err);
        return throwError(() => new Error(err));
      })
    );
  }
}
