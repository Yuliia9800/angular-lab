import { Component, OnInit } from '@angular/core';
import { CourseItem } from '../utils/public_api';
import { CoursesService } from '../services/courses.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss'],
})
export class CoursesComponent implements OnInit {
  count = 10;
  search = '';
  coursesData: CourseItem[] = [];

  constructor(private coursesService: CoursesService, private router: Router) {}

  searchCall() {
    this.coursesService
      .getList({ count: this.count, textFragment: this.search })
      .subscribe((data) => {
        this.coursesData = data;
      });
  }

  ngOnInit() {
    this.searchCall();
  }

  loadMore() {
    this.count += 10;
    this.searchCall();
  }

  handleSearch() {
    this.searchCall();
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
