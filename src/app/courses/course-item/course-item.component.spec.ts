import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatIconModule } from '@angular/material/icon';

import { CourseItemComponent } from './course-item.component';
import { CourseItem } from 'src/app/utils/public_api';
import { first } from 'rxjs';

describe('CourseItemComponent', () => {
  const course: CourseItem = {
    id: '1',
    title: 'test',
    description: 'test2',
    duration: 10,
    creationDate: new Date(),
  };

  let component: CourseItemComponent;
  let fixture: ComponentFixture<CourseItemComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [MatIconModule],
      declarations: [CourseItemComponent],
    });
    fixture = TestBed.createComponent(CourseItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
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
});
