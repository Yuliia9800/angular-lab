import { Pipe, PipeTransform } from '@angular/core';
import { CourseItem } from '../utils/global.modules';

@Pipe({
  name: 'filter',
})
export class FilterPipe implements PipeTransform {
  transform(
    value: CourseItem[],
    filterString: string,
    property: keyof Pick<CourseItem, 'name'>
  ): CourseItem[] {
    if (value.length === 0 || !filterString) {
      return value;
    }

    const filteredUsers: CourseItem[] = [];
    for (const course of value) {
      if (
        course[property]
          .toLocaleLowerCase()
          .includes(filterString.toLocaleLowerCase())
      ) {
        filteredUsers.push(course);
      }
    }
    return filteredUsers;
  }
}
