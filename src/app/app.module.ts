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
import { NgSelectModule } from '@ng-select/ng-select';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BreadcrumbsComponent } from './shared/breadcrumbs/breadcrumbs.component';
import { HeaderComponent } from './shared/header/header.component';
import { FooterComponent } from './shared/footer/footer.component';
import { SpinnerComponent } from './shared/spinner/spinner.component';

import { DurationPipe } from './pipes/duration.pipe';
import { OrderByPipe } from './pipes/order-by.pipe';
import { BorderColorDirective } from './directives/border-color.directive';

import { CoursesComponent } from './pages/courses/courses.component';
import { CourseItemComponent } from './pages/courses/course-item/course-item.component';
import { LoginComponent } from './pages/login/login.component';
import { AddCourseComponent } from './pages/courses/add-course/add-course.component';
import { PagenotfoundComponent } from './pages/pagenotfound/pagenotfound.component';
import { DatePickerComponent } from './pages/courses/add-course/components/date-picker/date-picker.component';
import { MultiSelectComponent } from './pages/courses/add-course/components/multi-select/multi-select.component';
import { DurationComponent } from './pages/courses/add-course/components/duration/duration.component';

import { AuthInterceptorInterceptor } from './services/auth-interceptor.interceptor';
import { BaseUrlInterceptorInterceptor } from './services/base-url-interceptor.interceptor';
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
    DurationComponent,
    DatePickerComponent,
    MultiSelectComponent,
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
    NgSelectModule,
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
