import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { CourseItem } from '../utils/public_api';

@Injectable({
  providedIn: 'root',
})
export class CoursesService {
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
    return this.http.get<CourseItem>(`courses/${id}`);
  }

  updateItem(id: number, course: CourseItem) {
    return this.http.patch<CourseItem>(`courses/${id}`, course);
  }

  removeItem(id: number) {
    return this.http.delete(`courses/${id}`);
  }
}
