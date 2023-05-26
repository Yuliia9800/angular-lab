import { Component } from '@angular/core';
import { courses } from '../utils/public_api';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss'],
})
export class CoursesComponent {
  search = '';
  coursesData = courses;

  loadMore() {
    console.log('load more');
  }

  handleSearch() {
    console.log('Search value =', this.search);
  }

  handleDelete(id: string) {
    console.log('Delete id =', id);
  }

  handleEdit(id: string) {
    console.log('Edit id =', id);
  }
}
