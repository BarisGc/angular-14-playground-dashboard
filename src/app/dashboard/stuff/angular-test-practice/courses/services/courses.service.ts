import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { Course } from 'src/app/dashboard/course/model/course';
import { Lesson } from 'src/app/dashboard/course/lessons/models/lesson';

interface Courses {
  payload: Course[];
}
@Injectable({
  providedIn: 'root',
})
export class CoursesService {
  constructor(private http: HttpClient) {}

  findCourseById(courseId: number): Observable<Course> {
    return this.http
      .get<Course>(`/api/courses/${courseId}`)
      .pipe(shareReplay(1));
  }

  findAllCourses(): Observable<Course[]> {
    return this.http.get<Courses>('/api/courses').pipe(
      map((res) => res['payload']),
      shareReplay(1)
    );
  }

  saveCourse(courseId: string, changes: Partial<Course>): Observable<any> {
    return this.http
      .put(`/api/courses/${courseId}`, changes)
      .pipe(shareReplay(1));
  }

  findLessons(
    courseId: number,
    filter = '',
    sortOrder = 'asc',
    pageNumber = 0,
    pageSize = 3
  ): Observable<Lesson[]> {
    return this.http
      .get<any>('/api/lessons', {
        params: new HttpParams()
          .set('courseId', courseId.toString())
          .set('filter', filter)
          .set('sortOrder', sortOrder)
          .set('pageNumber', pageNumber.toString())
          .set('pageSize', pageSize.toString()),
      })
      .pipe(
        map((res) => res['payload'] as Lesson[]),
        shareReplay(1)
      );
  }
}
