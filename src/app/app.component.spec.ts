import { TestBed } from '@angular/core/testing';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSelectModule } from '@angular/material/select';
import { MatToolbarModule } from '@angular/material/toolbar';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { provideMockStore } from '@ngrx/store/testing';
import { NgSelectModule } from '@ng-select/ng-select';

import { AppComponent } from './app.component';
import { CourseItemComponent } from './pages/courses/course-item/course-item.component';
import { CoursesComponent } from './pages/courses/courses.component';
import { LoginComponent } from './pages/login/login.component';
import { AddCourseComponent } from './pages/courses/add-course/add-course.component';
import { PagenotfoundComponent } from './pages/pagenotfound/pagenotfound.component';
import { HeaderComponent } from './shared/header/header.component';
import { BreadcrumbsComponent } from './shared/breadcrumbs/breadcrumbs.component';
import { FooterComponent } from './shared/footer/footer.component';
import { AppRoutingModule } from './app-routing.module';
import { DurationPipe } from './pipes/duration.pipe';
import { OrderByPipe } from './pipes/order-by.pipe';
import { BorderColorDirective } from './directives/border-color.directive';
import { SpinnerComponent } from './shared/spinner/spinner.component';
import { DatePickerComponent } from 'pages/courses/add-course/components/date-picker/date-picker.component';
import { DurationComponent } from 'pages/courses/add-course/components/duration/duration.component';
import { MultiSelectComponent } from 'pages/courses/add-course/components/multi-select/multi-select.component';

describe('AppComponent', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      imports: [
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
        HttpClientModule,
        NgSelectModule,
      ],
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
      providers: [provideMockStore({})],
    }).compileComponents()
  );

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'angular_lab'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('angular_lab');
  });
});
