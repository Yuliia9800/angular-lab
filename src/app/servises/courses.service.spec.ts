import { CourseItem } from './../utils/global.modules';
import { TestBed } from '@angular/core/testing';

import { CoursesService } from './courses.service';

describe('CoursesService', () => {
  let service: CoursesService;
  const courses = [{ id: '1', title: '1' }] as CourseItem[];

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CoursesService);
    service.courses = [...courses];
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  describe('getList', () => {
    it('should return list of courses', () => {
      expect(service.getList()).toEqual(courses);
    });
  });

  describe('createCourse', () => {
    it('should add new course', () => {
      const mockCourse = { id: '2' } as CourseItem;
      service.createCourse(mockCourse);
      expect(service.courses.length).toBe(2);
    });
  });

  describe('getItemById', () => {
    it('should find course by id', () => {
      expect(service.getItemById('1')).toEqual(courses[0]);
    });
  });

  describe('updateItem', () => {
    it('should update existing course by id', () => {
      const mockCourse = { id: '1', title: '3' } as CourseItem;
      service.updateItem(mockCourse);
      expect(service.courses).toEqual([mockCourse]);
    });
  });

  describe('removeItem', () => {
    it('should remove course by id', () => {
      service.removeItem('1');
      expect(service.courses.length).toBe(0);
    });
  });
});
