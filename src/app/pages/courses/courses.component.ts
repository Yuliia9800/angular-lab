import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';

import { BehaviorSubject, Observable, debounceTime } from 'rxjs';
import { CourseItem } from 'utils/public_api';
import { CoursesService } from 'services/courses.service';
import { loadCourses } from 'store/courses/courses.actions';
import { AppState, selectCourses } from 'store';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss'],
})
export class CoursesComponent implements OnInit {
  count = 10;
  search$ = new BehaviorSubject<string>('');
  courses$: Observable<CourseItem[]> = this.store.select(selectCourses);

  constructor(
    private coursesService: CoursesService,
    private router: Router,
    private store: Store<AppState>
  ) {}

  searchCall() {
    this.store.dispatch(
      loadCourses({ count: this.count, textFragment: this.search$.value })
    );
  }

  ngOnInit() {
    this.search$.pipe(debounceTime(300)).subscribe((value: any) => {
      if (value.length >= 3 || !value.length) {
        this.searchCall();
      }
    });
  }

  loadMore() {
    this.count += 10;

    this.searchCall();
  }

  handleSearch(event: any) {
    this.search$.next(event.target.value);
  }

  handleDelete(id: number) {
    if (confirm('Do you really want to delete this course? Yes/No ')) {
      this.coursesService.removeItem(id).subscribe(() => {
        this.searchCall();
      });
    }
  }

  handleEdit(id: number) {
    this.router.navigate([`/courses`, id]);
  }
}
