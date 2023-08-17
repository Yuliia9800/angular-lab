import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';

import { AppState, selectCourses } from 'store';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styleUrls: ['./breadcrumbs.component.scss'],
})
export class BreadcrumbsComponent implements OnInit {
  breadcrumbList: Array<{ name: string; path: string }> = [];
  $courses = this.store.select(selectCourses);

  constructor(private router: Router, private store: Store<AppState>) {}

  ngOnInit() {
    this.listenRouting();
  }

  listenRouting() {
    let routerUrl: string, routerList: Array<string>;

    this.router.events.subscribe((router: any) => {
      routerUrl = router.urlAfterRedirects;

      if (routerUrl && typeof routerUrl === 'string') {
        this.breadcrumbList.length = 0;
        routerList = routerUrl.slice(1).split('/');

        if (routerList[0] === 'login') return;

        routerList.forEach((router, index) => {
          let name = '';
          let path = '';

          if (index === 0) {
            name = 'Courses';
            path = router;
          } else if (router === 'new') {
            name = '/ New';
          } else {
            this.$courses.subscribe((courses) => {
              const course = courses.find(
                (course) => course.id === Number(router)
              );

              name = '/ ' + course?.name;
            });
          }

          this.breadcrumbList.push({ name, path });
        });
      }
    });
  }
}
