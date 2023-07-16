import { AfterViewInit, Directive, ElementRef, Input } from '@angular/core';

@Directive({
  selector: '[appBorderColor]',
})
export class BorderColorDirective implements AfterViewInit {
  @Input() creationDate!: string;
  @Input() isTopRated = false;

  constructor(private elementRef: ElementRef) {}

  subDays(number: number): Date {
    const date = new Date();

    date.setDate(date.getDate() - number);

    return date;
  }

  ngAfterViewInit(): void {
    const date = new Date(this.creationDate);

    if (
      date?.getTime() < new Date().getTime() &&
      date?.getTime() >= this.subDays(14).getTime()
    ) {
      this.elementRef.nativeElement.style.borderColor = '#2cce2c';
    }

    if (date?.getTime() > new Date().getTime()) {
      this.elementRef.nativeElement.style.borderColor = '#00b7ff';
    }

    if (this.isTopRated) {
      this.elementRef.nativeElement.style.borderColor = '#c4c1c1';
    }
  }
}
