import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';

import { CourseItem } from 'utils/global.modules';
import { CoursesService } from './courses.service';

describe('CoursesService', () => {
  let service: CoursesService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(CoursesService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getList', () => {
    it('should return list of courses', () => {
      const mockResponse: any[] = [];

      service.getList().subscribe((res) => expect(res).toEqual(mockResponse));

      const req = httpTestingController.expectOne({
        method: 'Get',
        url: `courses?start=0&count=10&sort=date&textFragment=`,
      });

      req.flush(mockResponse);
    });
  });

  describe('createCourse', () => {
    it('should add new course', () => {
      const mockCourse = { id: 2 } as CourseItem;
      const mockResponse: any = [mockCourse];

      service.createCourse(mockCourse).subscribe((res) => {
        expect(res).toEqual(mockResponse);
      });

      const req = httpTestingController.expectOne({
        method: 'Post',
        url: `courses`,
      });

      expect(req.request.body).toEqual(mockCourse);

      req.flush(mockResponse);
    });
  });

  describe('getItemById', () => {
    it('should find course by id', () => {
      const mockResponse: any = { id: 2 };

      service.getItemById(2).subscribe((res) => {
        expect(res).toEqual(mockResponse);
      });

      const req = httpTestingController.expectOne({
        method: 'Get',
        url: 'courses/2',
      });

      req.flush(mockResponse);
    });
  });

  describe('removeItem', () => {
    it('should remove course by id', () => {
      const mockResponse: any = {};

      service.removeItem(2).subscribe((res) => {
        expect(res).toEqual(mockResponse);
      });

      const req = httpTestingController.expectOne({
        method: 'Delete',
        url: 'courses/2',
      });

      req.flush(mockResponse);
    });
  });
});
