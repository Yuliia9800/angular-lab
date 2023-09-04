import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Author, Course } from 'utils/public_api';

@Injectable({
  providedIn: 'root',
})
export class CoursesService {
  constructor(private http: HttpClient) {}

  getList({ count = 10, sort = 'date', textFragment = '' } = {}): Observable<
    Course[]
  > {
    const url = `courses?start=0&count=${count}&sort=${sort}&textFragment=${textFragment}`;

    return this.http.get<Course[]>(url);
  }

  createCourse(course: Course) {
    return this.http.post<Course>('courses', course);
  }

  getItemById(id: number) {
    return this.http.get<Course>(`courses/${id}`);
  }

  updateItem(id: number, course: Course) {
    return this.http.patch<Course>(`courses/${id}`, course);
  }

  removeItem(id: number) {
    return this.http.delete(`courses/${id}`);
  }

  getAuthors() {
    return this.http.get<Author[]>('authors');
  }
}
