import { Component, Input } from '@angular/core';
import {
  NG_VALUE_ACCESSOR,
  NG_VALIDATORS,
  FormControl,
  Validators,
  ControlValueAccessor,
} from '@angular/forms';

@Component({
  selector: 'app-date-picker',
  templateUrl: './date-picker.component.html',
  styleUrls: ['./date-picker.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: DatePickerComponent,
      multi: true,
    },
    {
      provide: NG_VALIDATORS,
      useExisting: DatePickerComponent,
      multi: true,
    },
  ],
})
export class DatePickerComponent implements ControlValueAccessor {
  @Input()
  hasError!: boolean;

  value!: string;

  onChange!: (value: string) => void;
  onTouched!: () => void;

  writeValue(value: string): void {
    this.value = value;
  }

  registerOnChange(fn: (_: string) => void): void {
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
    if (!Validators.required(control) && !/^\d{2}\/\d{2}\/\d{4}$/.test(value)) {
      return { invalidDateFormat: true };
    }
    return null;
  }
}
