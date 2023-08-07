import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CoursesComponent } from 'pages/courses/courses.component';
import { AddCourseComponent } from 'pages/courses/add-course/add-course.component';
import { PagenotfoundComponent } from 'pages/pagenotfound/pagenotfound.component';
import { LoginComponent } from 'pages/login/login.component';
import { authGuard } from 'services/auth.guard';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'courses',
    component: CoursesComponent,
    data: { breadcrumb: 'Courses' },
    canActivate: [authGuard],
  },
  {
    path: 'courses/new',
    component: AddCourseComponent,
    canActivate: [authGuard],
  },
  {
    path: 'courses/:id',
    component: AddCourseComponent,
    canActivate: [authGuard],
  },
  { path: '', redirectTo: '/courses', pathMatch: 'full' },
  { path: '**', pathMatch: 'full', component: PagenotfoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
