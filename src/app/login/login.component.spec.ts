import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';

import { LoginComponent } from './login.component';
import { AuthenticationService } from '../services/authentication.service';

describe('LoginComponent', () => {
  const mockRouter = jasmine.createSpyObj<Router>(['navigate']);
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let authService: AuthenticationService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [FormsModule, ReactiveFormsModule],
      providers: [
        AuthenticationService,
        { provide: Router, useValue: mockRouter },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    authService = TestBed.inject(AuthenticationService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('userLogin', () => {
    it('should call login and navigate to courses', () => {
      spyOn(authService, 'login');

      component.userLogin();
      expect(authService.login).toHaveBeenCalledOnceWith({
        email: '',
        password: '',
      });
      expect(mockRouter.navigate).toHaveBeenCalledWith(['/courses']);
    });
  });
});
