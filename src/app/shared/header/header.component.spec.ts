import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import SpyObj = jasmine.SpyObj;
import { HeaderComponent } from './header.component';
import { AuthenticationService } from 'src/app/servises/authentication.service';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let authService: SpyObj<AuthenticationService>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [MatToolbarModule, MatIconModule],
      declarations: [HeaderComponent],
      providers: [AuthenticationService],
    });

    fixture = TestBed.createComponent(HeaderComponent);
    authService = TestBed.inject(
      AuthenticationService
    ) as SpyObj<AuthenticationService>;
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });

  describe('logout', () => {
    it('should call logout from auth service', () => {
      // spyOn(authService, 'logout');
      component.logout();

      expect(authService.logout).toHaveBeenCalledTimes(1);
    });
  });
});
