import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { FormGroup, FormControl } from '@angular/forms';

import { login } from 'store/user/user.actions';
import { User } from 'utils/global.modules';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  user!: User;

  constructor(private store: Store) {}

  profileForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
  });

  userLogin(): void {
    const email = this.profileForm.value.email as string;
    const password = this.profileForm.value.password as string;

    this.store.dispatch(login({ password, email }));
  }
}
