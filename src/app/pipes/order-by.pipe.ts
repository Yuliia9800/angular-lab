import { Pipe, PipeTransform } from '@angular/core';
import { CourseItem } from '../utils/global.modules';

@Pipe({
  name: 'orderBy',
})
export class OrderByPipe implements PipeTransform {
  transform(array: CourseItem[], field: keyof CourseItem): CourseItem[] {
    array.sort((a: CourseItem, b: CourseItem) => {
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
