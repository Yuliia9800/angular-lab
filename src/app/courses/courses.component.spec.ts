import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { CoursesComponent } from './courses.component';
import { CourseItemComponent } from './course-item/course-item.component';
import { FilterPipe } from '../pipes/filter.pipe';
import { OrderByPipe } from '../pipes/order-by.pipe';
import { DurationPipe } from '../pipes/duration.pipe';
import { BorderColorDirective } from '../directives/border-color.directive';

describe('CoursesComponent', () => {
  let component: CoursesComponent;
  let fixture: ComponentFixture<CoursesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule,
        MatInputModule,
        MatIconModule,
        BrowserAnimationsModule,
      ],
      declarations: [
        CoursesComponent,
        CourseItemComponent,
        OrderByPipe,
        FilterPipe,
        DurationPipe,
        BorderColorDirective,
      ],
    });
    fixture = TestBed.createComponent(CoursesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('loadMore', () => {
    it('console log should have been called', () => {
      spyOn(console, 'log');

      component.loadMore();

      expect(console.log).toHaveBeenCalledWith('load more');
    });
  });

  describe('handleSearch', () => {
    it('console log should have been called', () => {
      spyOn(console, 'log');
      component.search = 'test';

      component.handleSearch();

      expect(console.log).toHaveBeenCalledWith('Search value =', 'test');
    });
    it('should rewrite filterBy value to search value', () => {
      component.search = 'test';

      component.handleSearch();

      expect(component.filterBy).toBe(component.search);
    });
  });

  describe('handleDelete', () => {
    it('console log should have been called', () => {
      spyOn(console, 'log');

      component.handleDelete('1');

      expect(console.log).toHaveBeenCalledWith('Delete id =', '1');
    });
  });

  describe('handleEdit', () => {
    it('console log should have been called', () => {
      spyOn(console, 'log');

      component.handleEdit('2');

      expect(console.log).toHaveBeenCalledWith('Edit id =', '2');
    });
  });
});
