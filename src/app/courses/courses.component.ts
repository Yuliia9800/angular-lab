import { Component } from '@angular/core';
import { courses } from '../utils/public_api';
import { FilterPipe } from '../pipes/filter.pipe';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss'],
  providers: [FilterPipe],
})
export class CoursesComponent {
  constructor(private filter: FilterPipe) {}

  search = '';
  filterBy = '';
  coursesData = courses;

  loadMore() {
    console.log('load more');
  }

  handleSearch() {
    console.log('Search value =', this.search);
    this.filterBy = this.search;
    this.coursesData = this.filter.transform(courses, this.search, 'title');
  }

  handleDelete(id: string) {
    console.log('Delete id =', id);
  }

  handleEdit(id: string) {
    console.log('Edit id =', id);
  }
}
