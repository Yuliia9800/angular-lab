import { Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';
import { User } from './../utils/global.modules';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  user!: User;

  constructor(private auth: AuthenticationService, private router: Router) {}

  profileForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
  });

  userLogin(): void {
    const { password, email } = this.profileForm.value;
    this.auth.login({ email, password }).subscribe(() => {
      this.router.navigate(['/courses']);
    });
  }
}
