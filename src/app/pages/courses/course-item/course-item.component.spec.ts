import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatIconModule } from '@angular/material/icon';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { first } from 'rxjs';

import { Course } from 'utils/public_api';
import { DurationPipe } from 'pipes/duration.pipe';
import { BorderColorDirective } from 'directives/border-color.directive';
import { CourseItemComponent } from './course-item.component';

describe('CourseItemComponent', () => {
  const course: Course = {
    id: 1,
    name: 'test',
    description: 'test2',
    length: 10,
    date: '06/11/2023',
    isTopRated: false,
    authors: [],
  };

  let component: CourseItemComponent;
  let fixture: ComponentFixture<CourseItemComponent>;
  let element: DebugElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [MatIconModule],
      declarations: [CourseItemComponent, DurationPipe, BorderColorDirective],
    });
    fixture = TestBed.createComponent(CourseItemComponent);
    component = fixture.componentInstance;
    element = fixture.debugElement.query(By.directive(BorderColorDirective));
  });

  it('should create', () => {
    component.course = course;

    expect(component).toBeTruthy();
  });

  describe('handleDelete', () => {
    it('should call delete emit', () => {
      component.course = course;
      component.delete.pipe(first()).subscribe((id) => {
        expect(id).toBe(course.id);
      });

      component.handleDelete(course.id);
    });
  });

  describe('handleEdit', () => {
    it('should call edit emit', () => {
      component.course = course;
      component.edit.pipe(first()).subscribe((id) => {
        expect(id).toBe(course.id);
      });

      component.handleEdit(course.id);
    });
  });

  describe('appBorderColor', () => {
    it('should set the border color to green if the creation date is within the last 14 days', () => {
      component.course.date = new Date(Date.now() - 1000).toString();
      fixture.detectChanges();

      expect(element.nativeElement.style.borderColor).toBe('rgb(44, 206, 44)');
    });

    it('should set the border color to blue if the creation date is in the future', () => {
      component.course.date = new Date(Date.now() + 86400000).toString();
      fixture.detectChanges();
      expect(element.nativeElement.style.borderColor).toBe('rgb(0, 183, 255)');
    });

    it('should set the border color to gray if isTopRated is true', () => {
      component.course.isTopRated = true;
      fixture.detectChanges();

      expect(element.nativeElement.style.borderColor).toBe(
        'rgb(196, 193, 193)'
      );
    });
  });
});
