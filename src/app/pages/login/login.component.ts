import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { FormGroup, FormControl, Validators } from '@angular/forms';

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
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
  });

  get email() {
    return this.profileForm.controls.email;
  }

  get password() {
    return this.profileForm.controls.password;
  }

  userLogin(): void {
    const email = this.profileForm.value.email as string;
    const password = this.profileForm.value.password as string;

    this.store.dispatch(login({ password, email }));
  }
}
