import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState, selectCourse } from 'src/app/store';
import {
  createCourse,
  getCourseById,
  updateCourse,
} from 'src/app/store/courses/courses.actions';
import { CourseItem } from 'src/app/utils/global.modules';

@Component({
  selector: 'app-add-course',
  templateUrl: './add-course.component.html',
  styleUrls: ['./add-course.component.scss'],
  providers: [DatePipe],
})
export class AddCourseComponent implements OnInit {
  constructor(
    private router: Router,
    private activateRoute: ActivatedRoute,
    private datePipe: DatePipe,
    private store: Store<AppState>
  ) {}

  courseId!: number;

  newCourseForm = new FormGroup({
    name: new FormControl(''),
    description: new FormControl(''),
    length: new FormControl<number | null>(null),
    date: new FormControl<string>(''),
    authors: new FormControl<{ id: number; name: string }[]>([]),
  });

  ngOnInit() {
    if (this.router.url.includes('new')) return;

    this.courseId = this.activateRoute.snapshot.params['id'];

    this.store.select(selectCourse).subscribe((course) => {
      if (course)
        this.newCourseForm.setValue({
          name: course.name,
          description: course.description,
          length: course.length,
          date: this.datePipe.transform(course.date, 'yyyy-MM-dd'),
          authors: course.authors,
        });
    });

    this.store.dispatch(getCourseById({ id: this.courseId }));
  }

  submit() {
    const course = this.newCourseForm.value as CourseItem;

    if (this.courseId) {
      this.store.dispatch(updateCourse({ id: this.courseId, course }));

      return;
    }

    this.store.dispatch(createCourse({ course }));
  }

  cancel() {
    this.router.navigate(['/courses']);
  }
}
