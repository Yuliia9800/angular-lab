import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatIconModule } from '@angular/material/icon';

import { CourseItemComponent } from './course-item.component';
import { CourseItem } from 'src/app/utils/public_api';
import { first } from 'rxjs';
import { DurationPipe } from 'src/app/pipes/duration.pipe';
import { BorderColorDirective } from 'src/app/directives/border-color.directive';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

describe('CourseItemComponent', () => {
  const course: CourseItem = {
    id: '1',
    title: 'test',
    description: 'test2',
    duration: 10,
    creationDate: new Date('06/11/2023'),
    isTopRated: false,
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
      component.course.creationDate = new Date(Date.now() - 1000);
      fixture.detectChanges();

      expect(element.nativeElement.style.borderColor).toBe('rgb(44, 206, 44)');
    });

    it('should set the border color to blue if the creation date is in the future', () => {
      component.course.creationDate = new Date(Date.now() + 86400000);
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
