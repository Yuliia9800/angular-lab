import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CoursesService } from 'src/app/services/courses.service';

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
    private service: CoursesService,
    private datePipe: DatePipe
  ) {}

  newCourseForm = new FormGroup({
    name: new FormControl(''),
    description: new FormControl(''),
    length: new FormControl<number | null>(null),
    date: new FormControl<string>(''),
    authors: new FormControl<{ id: number; name: string }[]>([]),
  });

  ngOnInit() {
    if (this.router.url.includes('new')) return;

    const id = this.activateRoute.snapshot.params['id'];

    this.service.getItemById(id).subscribe((data) => {
      this.newCourseForm.setValue({
        name: data.name,
        description: data.description,
        length: data.length,
        date: this.datePipe.transform(data.date, 'yyyy-MM-dd'),
        authors: data.authors,
      });
    });
  }

  submit() {
    this.service.createCourse(this.newCourseForm.value as any).subscribe(() => {
      this.router.navigate(['/courses']);
    });
  }

  cancel() {
    this.router.navigate(['/courses']);
  }
}
