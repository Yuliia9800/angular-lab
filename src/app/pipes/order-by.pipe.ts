import { Pipe, PipeTransform } from '@angular/core';
import { Course } from 'utils/global.modules';

@Pipe({
  name: 'orderBy',
})
export class OrderByPipe implements PipeTransform {
  transform(array: Course[], field: keyof Course): Course[] {
    array.sort((a: Course, b: Course) => {
      if (a[field] < b[field]) {
        return -1;
      } else if (a[field] > b[field]) {
        return 1;
      } else {
        return 0;
      }
    });
    return array;
  }
}
