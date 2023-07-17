import { CoursesService } from 'src/app/services/courses.service';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Router } from '@angular/router';

import { CoursesComponent } from './courses.component';
import { CourseItemComponent } from './course-item/course-item.component';
import { OrderByPipe } from '../pipes/order-by.pipe';
import { DurationPipe } from '../pipes/duration.pipe';
import { BorderColorDirective } from '../directives/border-color.directive';
import { of } from 'rxjs';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('CoursesComponent', () => {
  const mockRouter = jasmine.createSpyObj<Router>(['navigate']);

  let component: CoursesComponent;
  let fixture: ComponentFixture<CoursesComponent>;
  let coursesService: CoursesService;

  const coursesServiceServiceMock = {
    getList: jasmine.createSpy('getList').and.returnValue(of({})),
    removeItem: jasmine.createSpy('removeItem').and.returnValue(of({})),
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule,
        MatInputModule,
        MatIconModule,
        BrowserAnimationsModule,
        HttpClientTestingModule,
      ],
      declarations: [
        CoursesComponent,
        CourseItemComponent,
        OrderByPipe,
        DurationPipe,
        BorderColorDirective,
      ],
      providers: [
        { provide: CoursesService, useValue: coursesServiceServiceMock },
        { provide: Router, useValue: mockRouter },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CoursesComponent);
    component = fixture.componentInstance;
    coursesService = TestBed.inject(CoursesService);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('loadMore', () => {
    it('console log should have been called', () => {
      component.loadMore();
      expect(component.count).toBe(20);

      expect(coursesService.getList).toHaveBeenCalledWith({
        count: 20,
        textFragment: '',
      });
    });
  });

  describe('handleSearch', () => {
    it('console log should have been called', () => {
      component.search = 'test';

      component.handleSearch();

      expect(coursesService.getList).toHaveBeenCalledWith({
        count: 10,
        textFragment: 'test',
      });
    });
  });

  describe('handleDelete', () => {
    beforeEach(() => coursesServiceServiceMock.removeItem.calls.reset());

    it('handleDelete should call removeItem when user confirms', () => {
      spyOn(window, 'confirm').and.returnValue(true);
      component.handleDelete(1);

      expect(coursesService.removeItem).toHaveBeenCalledOnceWith(1);
      expect(coursesService.getList).toHaveBeenCalled();
    });

    it('shouldn`t call removeItem when user declines', () => {
      spyOn(window, 'confirm').and.returnValue(false);

      component.handleDelete(1);

      expect(coursesService.removeItem).not.toHaveBeenCalled();
    });
  });

  describe('handleEdit', () => {
    it('should navigate to course page', () => {
      component.handleEdit(2);

      expect(mockRouter.navigate).toHaveBeenCalledWith(['/courses', 2]);
    });
  });
});
