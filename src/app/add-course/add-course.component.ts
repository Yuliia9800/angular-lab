import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-add-course',
  templateUrl: './add-course.component.html',
  styleUrls: ['./add-course.component.scss'],
})
export class AddCourseComponent {
  newCourseForm = new FormGroup({
    title: new FormControl(''),
    description: new FormControl(''),
    duration: new FormControl(null),
    date: new FormControl(''),
    authors: new FormControl(''),
  });

  submit() {
    console.log(this.newCourseForm);
  }
}
