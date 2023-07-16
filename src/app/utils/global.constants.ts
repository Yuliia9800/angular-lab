import { CourseItem } from './global.modules';

export const courses: CourseItem[] = [
  {
    id: 1,
    name: 'Video Course 1. Name tag',
    length: 20,
    date: '2023-06-12T04:39:24+00:00',
    authors: [{ id: 1, name: 'test' }],
    isTopRated: true,
    description:
      "Learn about where you can find course descriptions, what information they include, how they work, and details about various components of a course description. Course descriptions report information about a university or college's classes. They're published both in course catalogs that outline degree requirements and in course schedules that contain descriptions for all courses offered during a particular semester.",
  },
  {
    id: 2,
    name: 'Video Course 2. Name tag',
    length: 143,
    date: '2023-06-11T04:39:24+00:00',
    authors: [{ id: 1, name: 'test' }],
    isTopRated: false,
    description:
      "Learn about where you can find course descriptions, what information they include, how they work, and details about various components of a course description. Course descriptions report information about a university or college's classes. They're published both in course catalogs that outline degree requirements and in course schedules that contain descriptions for all courses offered during a particular semester.",
  },
  {
    id: 3,
    name: 'Video Course 3. Name tag',
    length: 425,
    date: '2023-07-30T04:39:24+00:00',
    authors: [{ id: 1, name: 'test' }],
    isTopRated: false,
    description:
      "Learn about where you can find course descriptions, what information they include, how they work, and details about various components of a course description. Course descriptions report information about a university or college's classes. They're published both in course catalogs that outline degree requirements and in course schedules that contain descriptions for all courses offered during a particular semester.",
  },
];
