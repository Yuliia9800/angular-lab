export interface CourseItem {
  id: string;
  title: string;
  creationDate: Date;
  duration: number;
  description: string;
  isTopRated: boolean;
}

export interface User {
  id: string;
  firstName: string;
  lastName: string;
}
