import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CourseItem } from 'src/app/utils/public_api';

@Component({
  selector: 'app-course-item',
  templateUrl: './course-item.component.html',
  styleUrls: ['./course-item.component.scss'],
})
export class CourseItemComponent {
  @Input() course = {} as CourseItem;
  @Output() delete = new EventEmitter<string>();
  @Output() edit = new EventEmitter<string>();

  handleDelete(id: string) {
    this.delete.emit(id);
  }

  handleEdit(id: string) {
    this.edit.emit(id);
  }

  subDays(number: number): Date {
    const date = new Date();

    date.setDate(date.getDate() - number);

    return date;
  }

  addClass() {
    return {
      greenBorder:
        this.course?.creationDate?.getTime() < new Date().getTime() &&
        this.course?.creationDate?.getTime() >= this.subDays(14).getTime(),
      blueBorder: this.course?.creationDate?.getTime() > new Date().getTime(),
      greyBorder: this.course?.isTopRated,
    };
  }
}
