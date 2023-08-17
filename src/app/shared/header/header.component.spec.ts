import { Router } from '@angular/router';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { HeaderComponent } from './header.component';
import { AuthenticationService } from 'services/authentication.service';
import { logout } from 'store/user/user.actions';

describe('HeaderComponent', () => {
  const mockRouter = jasmine.createSpyObj<Router>(['navigate']);
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let store: MockStore;

  beforeEach(() =>
    TestBed.configureTestingModule({
      imports: [MatToolbarModule, MatIconModule, HttpClientTestingModule],
      declarations: [HeaderComponent],
      providers: [
        { provide: Router, useValue: mockRouter },
        provideMockStore({}),
      ],
    }).compileComponents()
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(MockStore);

    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  describe('logout', () => {
    it('should call logout from auth service', () => {
      spyOn(store, 'dispatch').and.callThrough();
      component.logout();

      expect(store.dispatch).toHaveBeenCalledWith(logout());

      expect(mockRouter.navigate).toHaveBeenCalledWith(['/login']);
    });
  });
});
