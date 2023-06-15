import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatIconModule } from '@angular/material/icon';

import { CourseItemComponent } from './course-item.component';
import { CourseItem } from 'src/app/utils/public_api';
import { first } from 'rxjs';
import { DurationPipe } from 'src/app/pipes/duration.pipe';
import { BorderColorDirective } from 'src/app/directives/border-color.directive';

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

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [MatIconModule],
      declarations: [CourseItemComponent, DurationPipe, BorderColorDirective],
    });
    fixture = TestBed.createComponent(CourseItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
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

  // describe('appBorderColor', () => {
  //   it('should return greenBorder class', () => {
  //     component.course = course;
  //     expect(component.appBorderColor).toEqual({
  //       greenBorder: true,
  //       blueBorder: false,
  //       greyBorder: false,
  //     });
  //   });
  //   it('should return blueBorder class', () => {
  //     component.course = { ...course, creationDate: new Date('06/20/2023') };
  //     expect(component.appBorderColor).toEqual({
  //       greenBorder: false,
  //       blueBorder: true,
  //       greyBorder: false,
  //     });
  //   });
  //   it('should return greyBorder class', () => {
  //     component.course = {
  //       ...course,
  //       isTopRated: true,
  //       creationDate: new Date('04/20/2023'),
  //     };
  //     expect(component.appBorderColor).toEqual({
  //       greenBorder: false,
  //       blueBorder: false,
  //       greyBorder: true,
  //     });
  //   });
  // });
});
