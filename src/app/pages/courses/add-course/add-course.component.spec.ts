import { ComponentFixture, TestBed } from '@angular/core/testing';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';

import { AddCourseComponent } from './add-course.component';
import { resetCourseId } from 'store/courses/courses.actions';

describe('AddCourseComponent', () => {
  let store: MockStore;

  const mockRouter = {
    url: [],
    navigate: jasmine.createSpy('navigate'),
  };

  const mockActivateRoute = {
    snapshot: {
      params: { id: null },
    },
  };

  let component: AddCourseComponent;
  let fixture: ComponentFixture<AddCourseComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule,
        MatInputModule,
        ReactiveFormsModule,
        HttpClientTestingModule,
      ],
      declarations: [AddCourseComponent],
      providers: [
        { provide: Router, useValue: mockRouter },
        { provide: ActivatedRoute, useValue: mockActivateRoute },
        provideMockStore({
          initialState: {
            courses: {
              courses: [],
            },
          },
        }),
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddCourseComponent);
    component = fixture.componentInstance;
    component.newCourseForm = new FormGroup({
      name: new FormControl(''),
      description: new FormControl(''),
      duration: new FormControl<number | null>(null),
      date: new FormControl<string>('10/10/2023'),
      authors: new FormControl<{ id: number; name: string }[]>([]),
    });
    store = TestBed.inject(MockStore);

    spyOn(store, 'dispatch').and.callThrough();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  describe('submit', () => {
    it('should dispatch createCourse ', () => {
      component.submit();

      expect(store.dispatch).toHaveBeenCalled();
    });
  });

  describe('cancel', () => {
    it('should navigate to courses page', () => {
      component.cancel();

      expect(store.dispatch).toHaveBeenCalledWith(resetCourseId());

      expect(mockRouter.navigate).toHaveBeenCalledWith(['/courses']);
    });
  });
});
