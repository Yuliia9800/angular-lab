import { Component, Input } from '@angular/core';
import {
  NG_VALUE_ACCESSOR,
  ControlValueAccessor,
  NG_VALIDATORS,
  FormControl,
} from '@angular/forms';

@Component({
  selector: 'app-multi-select',
  templateUrl: './multi-select.component.html',
  styleUrls: ['./multi-select.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: MultiSelectComponent,
      multi: true,
    },
    {
      provide: NG_VALIDATORS,
      useExisting: MultiSelectComponent,
      multi: true,
    },
  ],
})
export class MultiSelectComponent implements ControlValueAccessor {
  selected!: any[];

  @Input()
  hasError!: boolean;

  @Input()
  options!: [];

  onChange!: (value: any[]) => void;
  onTouched!: () => void;

  writeValue(value: any[]): void {
    this.selected = value;
  }

  registerOnChange(fn: (_: any[]) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  onBlur() {
    if (this.onTouched) {
      this.onTouched();
    }
  }

  validate(control: FormControl) {
    const value = control.value;

    if (value && value.length < 1) {
      return { minLength: true };
    }

    return null;
  }
}
