import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';

import { AddCourseComponent } from './add-course.component';

describe('AddCourseComponent', () => {
  const mockRouter = jasmine.createSpyObj<Router>(['navigate']);
  let component: AddCourseComponent;
  let fixture: ComponentFixture<AddCourseComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule, MatInputModule, ReactiveFormsModule],
      declarations: [AddCourseComponent],
      providers: [
        // RouterModule.forRoot([{ path: '', component: AddCourseComponent }]),

        { provide: Router, useValue: mockRouter },
      ],
    }).compileComponents();

    // RouterModule.forRoot([{ path: '', component: AddCourseComponent }]),
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddCourseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('submit', () => {
    it('should navigate to courses page', () => {
      component.submit();
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
