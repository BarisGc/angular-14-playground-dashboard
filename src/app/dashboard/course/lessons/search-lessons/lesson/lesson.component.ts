import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { Lesson } from '../../models/lesson';

@Component({
  selector: 'app-lesson',
  templateUrl: './lesson.component.html',
  styleUrls: ['./lesson.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LessonComponent implements OnInit {
  @Input()
  lesson!: Lesson | null;
  constructor() {}

  ngOnInit(): void {
    console.log("LessonComponent")
  }
}
