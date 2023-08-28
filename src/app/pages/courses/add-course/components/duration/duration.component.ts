import { Component, Input } from '@angular/core';
import {
  ControlValueAccessor,
  FormControl,
  NG_VALIDATORS,
  NG_VALUE_ACCESSOR,
  Validator,
} from '@angular/forms';

@Component({
  selector: 'app-duration',
  templateUrl: './duration.component.html',
  styleUrls: ['./duration.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: DurationComponent,
    },
    {
      provide: NG_VALIDATORS,
      multi: true,
      useExisting: DurationComponent,
    },
  ],
})
export class DurationComponent implements ControlValueAccessor, Validator {
  @Input()
  hasError!: boolean;

  value = 0;

  onChange!: (value: number) => void;
  onTouched!: () => void;

  writeValue(duration: number) {
    this.value = duration;
  }

  registerOnChange(onChange: (_: number) => void) {
    this.onChange = onChange;
  }

  registerOnTouched(onTouched: () => void) {
    this.onTouched = onTouched;
  }

  validate(control: FormControl) {
    const value = control.value;

    if (value && !/^[0-9]+$/.test(value)) {
      return {
        onlyNumber: true,
      };
    }

    return null;
  }
}
