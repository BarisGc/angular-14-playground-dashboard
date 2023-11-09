import { CoursesService } from './../services/courses.service';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Lesson } from '../lessons/models/lesson';
import { Course } from '../model/course';
import { CoursesStore } from '../services/courses.store';
import { LoadingService } from 'src/app/shared/components/loading/loading.service';

@Component({
  selector: 'app-course-list',
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CourseListComponent implements OnInit {
  beginnerCourses$!: Observable<Course[]>;

  advancedCourses$!: Observable<Course[]>;

  constructor(
    private coursesStore: CoursesStore,
    private loadingService: LoadingService
  ) {}

  ngOnInit() {
    this.reloadCourses();
  }

  reloadCourses() {
    this.beginnerCourses$ = this.coursesStore.filterByCategory('BEGINNER');

    this.advancedCourses$ = this.coursesStore.filterByCategory('ADVANCED');
  }
}
