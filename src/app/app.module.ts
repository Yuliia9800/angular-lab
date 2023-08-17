import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BreadcrumbsComponent } from './shared/breadcrumbs/breadcrumbs.component';
import { HeaderComponent } from './shared/header/header.component';
import { FooterComponent } from './shared/footer/footer.component';
import { CoursesComponent } from './pages/courses/courses.component';
import { CourseItemComponent } from './pages/courses/course-item/course-item.component';
import { DurationPipe } from './pipes/duration.pipe';
import { OrderByPipe } from './pipes/order-by.pipe';
import { BorderColorDirective } from './directives/border-color.directive';
import { LoginComponent } from './pages/login/login.component';
import { AddCourseComponent } from './pages/courses/add-course/add-course.component';
import { PagenotfoundComponent } from './pages/pagenotfound/pagenotfound.component';
import { AuthInterceptorInterceptor } from './services/auth-interceptor.interceptor';
import { BaseUrlInterceptorInterceptor } from './services/base-url-interceptor.interceptor';
import { SpinnerComponent } from './shared/spinner/spinner.component';
import { SpinnerInterceptor } from './services/spinner.interceptor';

import { userReducer } from './store/user/user.reducer';
import * as userEffects from './store/user/user.effect';
import { coursesReducer } from './store/courses/courses.reducer';
import * as coursesEffects from './store/courses/courses.effect';

@NgModule({
  declarations: [
    AppComponent,
    BreadcrumbsComponent,
    HeaderComponent,
    FooterComponent,
    CoursesComponent,
    CourseItemComponent,
    DurationPipe,
    OrderByPipe,
    BorderColorDirective,
    LoginComponent,
    AddCourseComponent,
    PagenotfoundComponent,
    SpinnerComponent,
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatButtonModule,
    MatToolbarModule,
    MatInputModule,
    MatSelectModule,
    FormsModule,
    ReactiveFormsModule,
    StoreModule.forRoot(
      {
        courses: coursesReducer,
        user: userReducer,
      },
      {}
    ),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
    }),

    EffectsModule.forRoot([coursesEffects, userEffects]),
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: SpinnerInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: BaseUrlInterceptorInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
