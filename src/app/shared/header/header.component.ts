import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { AuthenticationService } from 'services/authentication.service';
import { AppState, selectUserName } from 'store';
import { getUserInfo, logout } from 'store/user/user.actions';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  userName$: Observable<string> = this.store.select(selectUserName);

  constructor(
    protected auth: AuthenticationService,
    private router: Router,
    private store: Store<AppState>
  ) {}

  ngOnInit(): void {
    if (this.auth.token$.value) {
      this.store.dispatch(getUserInfo());
    }
  }

  logout() {
    this.store.dispatch(logout());
    this.router.navigate(['/login']);
  }
}
