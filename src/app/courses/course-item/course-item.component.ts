import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { CourseItem } from 'src/app/utils/public_api';

@Component({
  selector: 'app-course-item',
  templateUrl: './course-item.component.html',
  styleUrls: ['./course-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CourseItemComponent {
  @Input() course = {} as CourseItem;
  @Output() delete = new EventEmitter<number>();
  @Output() edit = new EventEmitter<number>();

  handleDelete(id: number) {
    this.delete.emit(id);
  }

  handleEdit(id: number) {
    this.edit.emit(id);
  }
}
