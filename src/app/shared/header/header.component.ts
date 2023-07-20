import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  userName = '';
  constructor(protected auth: AuthenticationService, private router: Router) {}

  ngOnInit(): void {
    this.auth.getUserInfo().subscribe((val) => {
      this.userName = val.name.first;
    });
  }

  logout() {
    this.auth.logout();
    this.router.navigate(['/login']);
  }
}
