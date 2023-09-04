import { DatePipe } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription, tap } from 'rxjs';
import { AppState, selectAuthors, selectCourse } from 'store';
import {
  createCourse,
  getCourseById,
  resetCourseId,
  updateCourse,
} from 'store/courses/courses.actions';
import { Course } from 'utils/global.modules';

@Component({
  selector: 'app-add-course',
  templateUrl: './add-course.component.html',
  styleUrls: ['./add-course.component.scss'],
  providers: [DatePipe],
})
export class AddCourseComponent implements OnInit, OnDestroy {
  courseId!: number;
  subscription!: Subscription;
  course$ = this.store.select(selectCourse);
  authors$ = this.store.select(selectAuthors);

  constructor(
    private router: Router,
    private activateRoute: ActivatedRoute,
    private datePipe: DatePipe,
    private store: Store<AppState>
  ) {}

  newCourseForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.maxLength(50)]),
    description: new FormControl('', [
      (Validators.required, Validators.maxLength(500)),
    ]),
    duration: new FormControl<number | null>(null, [Validators.required]),
    date: new FormControl<string>('', [Validators.required]),
    authors: new FormControl<{ id: number; name: string }[]>([]),
  });

  get form() {
    return this.newCourseForm.controls;
  }

  ngOnInit() {
    if (this.router.url.includes('new')) return;

    this.courseId = this.activateRoute.snapshot.params['id'];

    this.subscription = this.course$
      .pipe(
        tap((course) => {
          if (course) {
            this.newCourseForm.setValue({
              name: course.name,
              description: course.description,
              duration: course.length,
              date: this.datePipe.transform(course.date, 'dd/MM/yyyy'),
              authors: course.authors,
            });
          } else {
            this.store.dispatch(getCourseById({ id: this.courseId }));
          }
        })
      )
      .subscribe();
  }

  ngOnDestroy() {
    this.subscription?.unsubscribe();
  }

  submit() {
    const { duration, date, ...rest } = this.newCourseForm.value;

    const course = {
      length: Number(duration),
      date: new Date(date as string).toISOString(),
      ...rest,
    } as Course;

    this.courseId
      ? this.store.dispatch(updateCourse({ id: this.courseId, course }))
      : this.store.dispatch(createCourse({ course }));
  }

  cancel() {
    this.store.dispatch(resetCourseId());
    this.router.navigate(['/courses']);
  }
}
