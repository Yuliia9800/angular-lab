import { Component, OnInit } from '@angular/core';
import { CourseItem, courses } from '../utils/public_api';
import { FilterPipe } from '../pipes/filter.pipe';
import { CoursesService } from '../services/courses.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss'],
  providers: [FilterPipe],
})
export class CoursesComponent implements OnInit {
  constructor(
    private filter: FilterPipe,
    private service: CoursesService,
    private router: Router
  ) {}

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
  }

  handleEdit(id: string) {
    this.router.navigate([`/courses`, id]);
  }
}
