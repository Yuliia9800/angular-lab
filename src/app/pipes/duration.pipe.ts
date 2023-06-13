import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'duration',
})
export class DurationPipe implements PipeTransform {
  transform(value: number): string {
    const hours = Math.floor(value / 60);
    const minutes = value % 60;

    const hoursMessage = hours ? hours + 'h' : '';
    const minutesMessage = minutes ? minutes + 'min' : '';

    return `${hoursMessage} ${minutesMessage}`;
  }
}
