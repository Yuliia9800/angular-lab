import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { courses } from '../../utils/public_api';

@Component({
  selector: 'app-add-course',
  templateUrl: './add-course.component.html',
  styleUrls: ['./add-course.component.scss'],
})
export class AddCourseComponent implements OnInit {
  constructor(private router: Router, private activateRoute: ActivatedRoute) {}

  newCourseForm = new FormGroup({
    title: new FormControl(''),
    description: new FormControl(''),
    duration: new FormControl<number | null>(null),
    date: new FormControl<Date | null>(null),
    authors: new FormControl(''),
  });

  ngOnInit(): void {
    if (this.router.url.includes('new')) return;

    const id = this.activateRoute.snapshot.params['id'];
    const course = courses.find((course) => course.id === id);

    if (!course) return;

    this.newCourseForm.setValue({
      title: course.title,
      description: course.description,
      duration: course.duration,
      date: course.creationDate,
      authors: '',
    });
  }

  submit() {
    this.router.navigate(['/courses']);
  }

  cancel() {
    this.router.navigate(['/courses']);
  }
}
