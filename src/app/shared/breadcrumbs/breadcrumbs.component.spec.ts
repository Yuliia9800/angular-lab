import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BreadcrumbsComponent } from './breadcrumbs.component';
import { provideMockStore } from '@ngrx/store/testing';

describe('BreadcrumbsComponent', () => {
  let component: BreadcrumbsComponent;
  let fixture: ComponentFixture<BreadcrumbsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BreadcrumbsComponent],
      providers: [provideMockStore({})],
    });
    fixture = TestBed.createComponent(BreadcrumbsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
