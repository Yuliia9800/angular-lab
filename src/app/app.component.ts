import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import { AppState } from 'store';
import { getAuthors } from 'store/courses/courses.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'angular_lab';

  constructor(private store: Store<AppState>) {}

  ngOnInit() {
    this.store.dispatch(getAuthors());
  }
}
