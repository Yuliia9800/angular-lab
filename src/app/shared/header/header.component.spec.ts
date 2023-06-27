import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { HeaderComponent } from './header.component';
import { AuthenticationService } from 'src/app/servises/authentication.service';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let authService: AuthenticationService;

  beforeEach(() =>
    TestBed.configureTestingModule({
      imports: [MatToolbarModule, MatIconModule],
      declarations: [HeaderComponent],
      providers: [AuthenticationService],
    }).compileComponents()
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    authService = TestBed.inject(AuthenticationService);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('logout', () => {
    it('should call logout from auth service', () => {
      spyOn(authService, 'logout');

      component.logout();

      expect(authService.logout).toHaveBeenCalledTimes(1);
    });
  });
});
