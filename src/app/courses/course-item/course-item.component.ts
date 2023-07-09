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
  @Output() delete = new EventEmitter<string>();
  @Output() edit = new EventEmitter<string>();

  handleDelete(id: string) {
    this.delete.emit(id);
  }

  handleEdit(id: string) {
    this.edit.emit(id);
  }
}
