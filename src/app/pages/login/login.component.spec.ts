import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';

import { LoginComponent } from './login.component';
import { login } from 'store/user/user.actions';

describe('LoginComponent', () => {
  const mockRouter = jasmine.createSpyObj<Router>(['navigate']);
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let store: MockStore;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [FormsModule, ReactiveFormsModule, HttpClientTestingModule],
      providers: [
        { provide: Router, useValue: mockRouter },
        provideMockStore({}),
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    store = TestBed.inject(MockStore);

    spyOn(store, 'dispatch').and.callThrough();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('userLogin', () => {
    it('should call login and navigate to courses', () => {
      component.userLogin();

      expect(store.dispatch).toHaveBeenCalledOnceWith(
        login({
          email: '',
          password: '',
        })
      );
    });
  });
});
