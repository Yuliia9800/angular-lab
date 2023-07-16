import { Router } from '@angular/router';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { HeaderComponent } from './header.component';
import { AuthenticationService } from 'src/app/services/authentication.service';

describe('HeaderComponent', () => {
  const mockRouter = jasmine.createSpyObj<Router>(['navigate']);
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let authService: AuthenticationService;

  beforeEach(() =>
    TestBed.configureTestingModule({
      imports: [MatToolbarModule, MatIconModule, HttpClientTestingModule],
      declarations: [HeaderComponent],
      providers: [
        AuthenticationService,
        { provide: Router, useValue: mockRouter },
      ],
    }).compileComponents()
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    authService = TestBed.inject(AuthenticationService);

    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  describe('logout', () => {
    it('should call logout from auth service', () => {
      spyOn(authService, 'logout');

      component.logout();

      expect(authService.logout).toHaveBeenCalledTimes(1);
      expect(mockRouter.navigate).toHaveBeenCalledWith(['/login']);
    });
  });
});
