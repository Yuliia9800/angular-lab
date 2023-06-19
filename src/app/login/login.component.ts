import { User } from './../utils/global.modules';
import { Component } from '@angular/core';
import { AuthenticationService } from '../servises/authentication.service';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [AuthenticationService],
})
export class LoginComponent {
  constructor(private service: AuthenticationService) {}

  user = {} as User;

  profileForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
  });

  userLogin(): void {
    const { password, email } = this.profileForm.value;
    this.service.login({ email, password });
    console.log('logged in successfully');
  }
}
