import { Component, OnInit } from '@angular/core';
import { CourseItem, courses } from '../utils/public_api';
import { FilterPipe } from '../pipes/filter.pipe';
import { CoursesService } from '../servises/courses.service';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss'],
  providers: [FilterPipe, CoursesService],
})
export class CoursesComponent implements OnInit {
  constructor(private filter: FilterPipe, private service: CoursesService) {}

  search = '';
  filterBy = '';
  coursesData = [] as CourseItem[];

  ngOnInit(): void {
    this.coursesData = this.service.getList();
  }

  loadMore() {
    console.log('load more');
  }

  handleSearch() {
    console.log('Search value =', this.search);
    this.filterBy = this.search;
    this.coursesData = this.filter.transform(courses, this.search, 'title');
  }

  handleDelete(id: string) {
    if (confirm('Do you really want to delete this course? Yes/No ')) {
      this.service.removeItem(id);
    }
    console.log('Delete id =', id);
  }

  handleEdit(id: string) {
    console.log('Edit id =', id);
  }
}
