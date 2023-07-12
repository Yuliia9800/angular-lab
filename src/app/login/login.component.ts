import { User } from './../utils/global.modules';
import { Component } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  constructor(private service: AuthenticationService, private router: Router) {}

  user = {} as User;

  profileForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
  });

  userLogin(): void {
    const { password, email } = this.profileForm.value;
    this.service.login({ email, password });
    console.log('logged in successfully');
    this.router.navigate(['/courses']);
  }
}
