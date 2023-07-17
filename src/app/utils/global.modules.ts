export interface CourseItem {
  id: number;
  name: string;
  date: string;
  length: number;
  description: string;
  authors: {
    id: number;
    name: string;
  }[];
  isTopRated: boolean;
}

export interface User {
  id: number;
  firstName: string;
  lastName: string;
}

export interface UserResponse {
  id: number;
  token: string;
  name: {
    first: string;
    last: string;
  };
  login: string;
  password: string;
}

export interface LoginResponse {
  token: string;
}
