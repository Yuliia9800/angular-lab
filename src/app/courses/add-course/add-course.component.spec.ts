import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';
import { AddCourseComponent } from './add-course.component';
import { CoursesService } from 'src/app/services/courses.service';

describe('AddCourseComponent', () => {
  const mockRouter = {
    url: [],
    navigate: jasmine.createSpy('navigate'),
  };

  const mockActivateRoute = {
    snapshot: {
      params: { id: null },
    },
  };

  const mockCoursesServiceService = {
    getItemById: jasmine.createSpy('getItemById').and.returnValue(of({})),
    createCourse: jasmine.createSpy('createCourse').and.returnValue(of({})),
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
        { provide: CoursesService, useValue: mockCoursesServiceService },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddCourseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  describe('submit', () => {
    it('should navigate to courses page', () => {
      component.submit();

      expect(mockCoursesServiceService.createCourse).toHaveBeenCalled();
      expect(mockRouter.navigate).toHaveBeenCalledWith(['/courses']);
    });
  });

  describe('cancel', () => {
    it('should navigate to courses page', () => {
      component.cancel();

      expect(mockRouter.navigate).toHaveBeenCalledWith(['/courses']);
    });
  });
});
