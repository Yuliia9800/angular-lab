import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/servises/authentication.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  providers: [AuthenticationService],
})
export class HeaderComponent implements OnInit {
  constructor(private auth: AuthenticationService) {}

  isAuthenticated = false;

  ngOnInit(): void {
    this.isAuthenticated = this.auth.isAuthenticated();
  }

  logout() {
    console.log('log 1');
    this.auth.logout();
  }
}
