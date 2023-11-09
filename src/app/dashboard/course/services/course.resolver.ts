import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';
import { Course } from '../model/course';
import { first, Observable } from 'rxjs';
import { CoursesService } from './courses.service';

/**
 * @keywords resolver
 *
 * @implements {Resolve<Course>}
 */
@Injectable()
export class CourseResolver implements Resolve<Course> {
  constructor(private coursesService: CoursesService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<Course> {
    // route.paramMap.get('id');
    console.log('CourseResolver.resolve() called');
    return this.coursesService
      .findCourseById(route.params['courseId'])
      .pipe(first());
    // The RxJS first() operator waits until the first value is emitted from an observable and then automatically unsubscribes, so there is no need to explicitly unsubscribe from the subscription.
  }
}
