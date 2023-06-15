import { TestBed, ComponentFixture } from '@angular/core/testing';
import { Component, DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { BorderColorDirective } from './border-color.directive';

@Component({
  template: `<div
    appBorderColor
    [creationDate]="creationDate"
    [isTopRated]="isTopRated"
  ></div>`,
})
class TestComponent {
  creationDate = null as unknown as Date;
  isTopRated = false;
}

describe('BorderColorDirective', () => {
  let component: TestComponent;
  let fixture: ComponentFixture<TestComponent>;
  let directive: BorderColorDirective;
  let element: DebugElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BorderColorDirective, TestComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TestComponent);
    component = fixture.componentInstance;
    element = fixture.debugElement.query(By.directive(BorderColorDirective));
    directive = element.injector.get(BorderColorDirective);
    fixture.detectChanges();
  });

  it('should set the border color to green if the creation date is within the last 14 days', () => {
    component.creationDate = new Date();
    fixture.detectChanges();

    expect(element.nativeElement.style.borderColor).toBe('#2cce2c');
  });

  it('should set the border color to blue if the creation date is in the future', () => {
    component.creationDate = new Date(Date.now() + 86400000);
    fixture.detectChanges();
    expect(element.nativeElement.style.borderColor).toBe('#00b7ff');
  });

  it('should set the border color to gray if isTopRated is true', () => {
    component.isTopRated = true;
    fixture.detectChanges();
    expect(element.nativeElement.style.borderColor).toBe('#c4c1c1');
  });
});
